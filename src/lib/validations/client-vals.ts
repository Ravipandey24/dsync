import { z } from "zod";

export const registerFormSchema = z
  .object({
    username: z.string().min(3, {
      message: "Username must be at least 3 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address",
    }),
    profession: z.string().min(3, {
      message: "Profession must be at least 3 characters.",
    }),
    favouriteSeries: z.string().min(3, {
      message: "Favourite series must be at least 3 characters.",
    }),
    favouriteMusicArtist: z.string().min(3, {
      message: "Favourite music artist must be at least 3 characters.",
    }),
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

export type registerFormType = z.infer<typeof registerFormSchema>;
export type SignInFormType = z.infer<typeof signInFormSchema>;
