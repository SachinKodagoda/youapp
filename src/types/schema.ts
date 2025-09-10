import { loginSchema } from "@/utils/login-schema";
import { registerSchema } from "@/utils/register-schema";
import { z } from "zod";

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
