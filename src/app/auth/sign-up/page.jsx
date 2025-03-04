import { getCurrentSession, loginUser, registerUser } from "@/actions/auth";
import SignUp from "@/components/auth/SignUp";

import { redirect } from "next/navigation";
import React from "react";
import zod from "zod";

// validation schema
const SignUpSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(5),
});

const SignUpPage = async () => {
  const { user } = await getCurrentSession();

  if (user) {
    return redirect("/");
  }

  // server action for form submission ( next 15)
  const action = async (prevState, formData) => {
    "use server";
    const parsed = SignUpSchema.safeParse(Object.fromEntries(formData));
    if (!parsed.success) {
      return {
        message: "Invalid form data",
      };
    }

    const { email, password } = parsed.data;
    const { user, error } = await registerUser(email, password);
    if (error) {
      return { message: error };
    } else if (user) {
      await loginUser(email, password);
      return redirect("/");
    }
  };

  return <SignUp action={action} />;
};

export default SignUpPage;
