"use server";
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { cache } from "react";

// fun that generate a tooken
export async function generateSessionToken() {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  const token = encodeBase32LowerCaseNoPadding(bytes);
  return token;
}

// create new seesion , based on tooken and user id
export async function createSession(token, userId) {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const session = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
  };
  await prisma.session.create({
    data: session,
  });
  return session;
}

//when user recconect to site , we validate the token , if not expired then we re-new the token (add 30 days)
export async function validateSessionToken(token) {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const result = await prisma.session.findUnique({
    where: {
      id: sessionId,
    },
    include: {
      user: true,
    },
  });
  if (result === null) {
    return { session: null, user: null };
  }
  const { user, ...session } = result;
  if (Date.now() >= session.expiresAt.getTime()) {
    await prisma.session.delete({ where: { id: sessionId } });
    return { session: null, user: null };
  }
  if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
    session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
    await prisma.session.update({
      where: {
        id: session.id,
      },
      data: {
        expiresAt: session.expiresAt,
      },
    });
  }

  const safeUser = {
    ...user,
    passwordHash: undefined,
  };

  return { session, user: safeUser };
}

// remove session from db when user logout
export async function invalidateSession(sessionId) {
  await prisma.session.delete({ where: { id: sessionId } });
}

//cookies
export async function setSessionTokenCookie(token, expiresAt) {
  const cookieStore = await cookies();
  cookieStore.set("session", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    path: "/",
  });
}

export async function deleteSessionTokenCookie() {
  const cookieStore = await cookies();
  cookieStore.set("session", "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    path: "/",
  });
}

export const getCurrentSession = cache(async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value ?? null;
  if (token === null) {
    return { session: null, user: null };
  }
  const result = await validateSessionToken(token);
  return result;
});

// hash password
export const hashPassword = async (password) => {
  return encodeHexLowerCase(sha256(new TextEncoder().encode(password)));
};
// compare password in db with hash password
export const verifyPassword = async (password, hash) => {
  const passwordHash = await hashPassword(password);
  return passwordHash === hash;
};

// register user
export const registerUser = async (email, password) => {
  const passwordHash = await hashPassword(password);
  try {
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
      },
    });

    const safeUser = {
      ...user,
      passwordHash: undefined,
    };

    return {
      //safe user is user without the password hash
      user: safeUser,
      error: null,
    };
  } catch (e) {
    return {
      user: null,
      error: "Failed to register user",
    };
  }
};

// user login
export const loginUser = async (email, password) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    return {
      user: null,
      error: "User not found",
    };
  }

  const passwordValid = await verifyPassword(password, user.passwordHash);
  if (!passwordValid) {
    return {
      user: null,
      error: "Invalid password",
    };
  }

  const token = await generateSessionToken();
  const session = await createSession(token, user.id);
  await setSessionTokenCookie(token, session.expiresAt);

  const safeUser = {
    ...user,
    passwordHash: undefined,
  };

  return {
    user: safeUser,
    error: null,
  };
};

// user logout
export const logoutUser = async () => {
  const session = await getCurrentSession();
  if (session.session?.id) {
    await invalidateSession(session.session.id);
  }
  await deleteSessionTokenCookie();
};
