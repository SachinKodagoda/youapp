import { verifyToken } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export interface AuthenticatedRequest extends NextRequest {
  user?: {
    email: string;
    id: string;
    username: string;
  };
}

export function withAuth(handler: (req: AuthenticatedRequest) => Promise<NextResponse>) {
  return async (request: NextRequest): Promise<NextResponse> => {
    try {
      // Get token from Authorization header
      const authHeader = request.headers.get("authorization");

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return NextResponse.json({ message: "No token provided" }, { status: 401 });
      }

      const token = authHeader.substring(7); // Remove "Bearer " prefix

      // Verify token
      const decoded = verifyToken(token);

      if (!decoded) {
        return NextResponse.json({ message: "Invalid or expired token" }, { status: 401 });
      }

      // Add user info to request
      const authenticatedRequest = request as AuthenticatedRequest;
      authenticatedRequest.user = {
        email: decoded.email,
        id: decoded.id,
        username: decoded.username,
      };

      // Call the actual handler
      return handler(authenticatedRequest);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Auth middleware error:", error);

      return NextResponse.json({ message: "Authentication failed" }, { status: 401 });
    }
  };
}
