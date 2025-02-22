import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Function to check if the API key exists in cookies
function hasApiKey(request: NextRequest): boolean {
    const apiKey = request.cookies.get("apiKey"); // Retrieve the API key from cookies
    return !!apiKey && apiKey.value.trim() !== ""; // Check if the API key exists and is not empty
}

export function middleware(request: NextRequest) {
    // Define the paths to check
    const isHomePage = request.nextUrl.pathname === "/";
    const isHumanizePage = request.nextUrl.pathname === "/humanize";

    // If the user is on the home page and has an API key, redirect to /humanize
    if (isHomePage && hasApiKey(request)) {
        return NextResponse.redirect(new URL("/humanize", request.url));
    }

    // If the user is on the /humanize page and does not have an API key, redirect to /
    if (isHumanizePage && !hasApiKey(request)) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    // Allow all other requests to proceed as normal
    return NextResponse.next();
}