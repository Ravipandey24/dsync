import { z } from "zod";

export const signUpFormSchema = z
  .object({
    username: z.string().min(3, {
      message: "Username must be at least 3 characters.",
    }),
    password: z
      .string()
      .min(5, {
        message: "Password must be at least 5 characters long",
      })
      .max(100)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{5,})/, {
        message:
          "Password must contain at least 5 characters, one uppercase, one lowercase, one number and one special character",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export const signInFormSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  password: z
    .string()
    .min(5, {
      message: "Password must be at least 5 characters long",
    })
    .max(100),
});

export type SignUpFormType = z.infer<typeof signUpFormSchema>;
export type SignInFormType = z.infer<typeof signInFormSchema>;
