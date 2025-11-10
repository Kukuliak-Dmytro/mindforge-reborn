import { NextRequest, NextResponse } from "next/server";
import { envClient } from "@/config/env";

//constant
/**
 * Backend API URL for authentication.
 */
const BACKEND_API_URL = envClient.NEXT_PUBLIC_CLIENT_API_URL;

//function
/**
 * Proxies authentication requests to the backend API.
 * All /api/auth/* routes are forwarded to the backend.
 */
async function proxyAuthRequest(request: NextRequest, method: string) {
  try {
    // Get the full path from the request
    const url = new URL(request.url);
    const authPath = url.pathname.replace("/api/auth", "");
    const backendUrl = `${BACKEND_API_URL}/api/auth${authPath}${url.search}`;

    // Forward headers (especially cookies for session)
    const headers = new Headers();
    request.headers.forEach((value, key) => {
      if (
        key.toLowerCase() === "cookie" ||
        key.toLowerCase() === "content-type"
      ) {
        headers.set(key, value);
      }
    });

    // Get request body if present
    let body: BodyInit | undefined;
    if (method === "POST" || method === "PUT" || method === "PATCH") {
      try {
        body = await request.text();
        if (body) {
          headers.set(
            "Content-Type",
            request.headers.get("content-type") || "application/json",
          );
        }
      } catch {
        // No body
      }
    }

    // Forward request to backend
    const response = await fetch(backendUrl, {
      method,
      headers,
      body,
      credentials: "include",
    });

    // Get response body
    const responseBody = await response.text();

    // Forward response with same status and headers
    const nextResponse = new NextResponse(responseBody, {
      status: response.status,
      statusText: response.statusText,
    });

    // Forward cookies from backend
    response.headers.forEach((value, key) => {
      if (key.toLowerCase() === "set-cookie") {
        nextResponse.headers.append(key, value);
      } else {
        nextResponse.headers.set(key, value);
      }
    });

    return nextResponse;
  } catch (error) {
    console.error("Error proxying auth request to backend:", error);
    return NextResponse.json(
      { error: "Failed to proxy authentication request" },
      { status: 500 },
    );
  }
}

//function
/**
 * Handles all HTTP methods by proxying to backend.
 */
async function handleRequest(request: NextRequest) {
  return proxyAuthRequest(request, request.method);
}

//constant
/**
 * Authentication API route handlers - proxies to backend.
 * Better-auth primarily uses GET and POST, but we handle all methods for compatibility.
 */
export const GET = handleRequest;
export const POST = handleRequest;
export const PUT = handleRequest;
export const PATCH = handleRequest;
export const DELETE = handleRequest;
