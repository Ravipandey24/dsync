"use client";

import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
// import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import {
  SignInFormType,
  signInFormSchema,
} from "@/lib/validations/client-vals";
import { Spinner } from "@nextui-org/react";
import { cn } from "@/lib/utils";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { useSignIn } from "@clerk/nextjs";
import { toast } from "sonner";

const SignInForm = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [showPass, setShowPass] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormType>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const router = useRouter();

  async function onSubmit({ username, password }: SignInFormType) {
    try {
      const result = await signIn!.create({
        identifier: username,
        password,
      });

      if (result.status === "complete") {
        console.log(result);
        await setActive!({ session: result.createdSessionId });
        toast.success("Logged in successfully");
        router.push("/");
      } else {
        /*Investigate why the login hasn't completed */
        console.log(result.status);
      }
    } catch (error: any) {
      toast.error(error.errors[0].message);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        classNames={{
          input: "text-base",
        }}
        placeholder="username"
        type="text"
        className="text-lg"
        isInvalid={!!errors.username?.message}
        errorMessage={errors.username?.message}
        {...register("username")}
      />
      <div className="flex items-center">
        <Input
          placeholder="password"
          classNames={{
            input: "text-base",
          }}
          isInvalid={!!errors.password?.message}
          type={showPass ? "text" : "password"}
          {...register("password")}
          errorMessage={errors.password?.message}
        />
        <div
          className={cn(
            "absolute right-9 text-gray-500 hover:cursor-pointer text-sm",
            errors.password?.message && "mb-6"
          )}
          onClick={() => setShowPass((prev) => !prev)}
        >
          {showPass ? (
            <EyeClosedIcon className="h-5 w-5"></EyeClosedIcon>
          ) : (
            <EyeOpenIcon className="h-5 w-5"></EyeOpenIcon>
          )}
        </div>
      </div>

      <Button
        className="w-full gap-2 text-base"
        type="submit"
        disabled={!isLoaded}
      >
        <span>Submit</span>
        {!isLoaded && <Spinner size="sm" color="default"></Spinner>}
      </Button>
    </form>
  );
};

export default SignInForm;
