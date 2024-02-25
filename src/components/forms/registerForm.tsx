"use client";

import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
// import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import {
  registerFormSchema,
  registerFormType,
} from "@/lib/validations/client-vals";
import { Spinner } from "@nextui-org/react";
import { toast } from "sonner";
import { createRegisterationRequest } from "@/db/redis/api";

const RegisterForm = () => {
  const [isSendingRequest, setSendingRequest] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<registerFormType>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: "",
      email: "",
      profession: "",
      favouriteSeries: "",
      favouriteMusicArtist: "",
    },
  });
  const router = useRouter();

  async function onSubmit(formData: registerFormType) {
    setSendingRequest(true);
    const {success, message}  = await createRegisterationRequest(formData);
    if(success) {
      toast.success(message);
    }else {
      toast.error(message);
    }
    setSendingRequest(false);
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        classNames={{
          input: "text-base",
        }}
        label="Username"
        variant="bordered"
        type="text"
        className="text-lg"
        isInvalid={!!errors.username?.message}
        errorMessage={errors.username?.message}
        {...register("username")}
      />
      <Input
       label="Email"
       variant="bordered"
        type="email"
        isInvalid={!!errors.email?.message}
        errorMessage={errors.email?.message}
        {...register("email")}
      />
      <Input
        label="Profession"
        variant="bordered"
        type="text"
        isInvalid={!!errors.profession?.message}
        errorMessage={errors.profession?.message}
        {...register("profession")}
      />
      <Input
        label="Favourite Series"
        variant="bordered"
        type="text"
        isInvalid={!!errors.favouriteSeries?.message}
        errorMessage={errors.favouriteSeries?.message}
        {...register("favouriteSeries")}
      />
      <Input
        label="Favorite Music Artist"
        variant="bordered"
        type="text"
        isInvalid={!!errors.favouriteMusicArtist?.message}
        errorMessage={errors.favouriteMusicArtist?.message}
        {...register("favouriteMusicArtist")}
      />
      <Button
        className="w-full gap-2 text-base"
        type="submit"
        variant="shadow"
        disabled={isSendingRequest}
      >
        <span>Send Request</span>
        {isSendingRequest && <Spinner size="sm" color="white"></Spinner>}
      </Button>
    </form>
  );
};

export default RegisterForm;
