import { NextResponse } from "next/server";

export async function middleware(request) {
    if (request.method === "GET") {
       return NextResponse.next();
    }

    /* CSRF Protection */
	
    const originHeader = request.headers.get("Origin");
    // NOTE: You may need to use `X-Forwarded-Host` instead
    const hostHeader = request.headers.get("Host");
    if (originHeader === null || hostHeader === null) {
        return new NextResponse(null, {
            status: 403
        });
    }
    let origin;
    try {
        origin = new URL(originHeader);
    } catch {
        return new NextResponse(null, {
            status: 403
        });
    }
    if (origin.host !== hostHeader) {
        return new NextResponse(null, {
            status: 403
        });
    }
    return NextResponse.next();
}