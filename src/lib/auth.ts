import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("Please define the JWT_SECRET environment variable inside .env.local");
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
}

// Verify password
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  /* eslint-disable-next-line no-console */
  console.log("hashedPassword: =-->", hashedPassword, password);
  return await bcrypt.compare(password, hashedPassword);
}

// Generate JWT token
export function generateToken(user: { _id?: string; email: string; username: string }): string {
  const payload = {
    email: user.email,
    id: user._id,
    username: user.username,
  };

  return jwt.sign(payload, JWT_SECRET as string, {
    expiresIn: "7d", // Token expires in 7 days
  });
}

// Verify JWT token
export function verifyToken(token: string): jwt.JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET as string) as jwt.JwtPayload;
  } catch {
    return null;
  }
}
