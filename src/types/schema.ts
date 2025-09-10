import { registerSchema } from "@/utils/register-schema";
import { z } from "zod";

export type RegisterFormData = z.infer<typeof registerSchema>;
