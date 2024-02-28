import RegisterForm from "@/components/forms/registerForm";
import { Meteors } from "@/components/ui/meteors";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import Link from "next/link";

const page = ({}) => {
  return (
    <Card
      className="fixed w-72 md:w-96 z-20 mx-4 border border-content1/40 bg-background/70"
      radius="md"
      shadow="lg"
    >
      <CardHeader>
        <h1 className="text-2xl font-bold">Register</h1>
      </CardHeader>
      <CardBody>
        <RegisterForm></RegisterForm>
      </CardBody>
      <CardFooter className="flex justify-end gap-1">
        <span>Already have an account?</span>
        <Link
          href="/login"
          className="tracking-tight hover:underline"
        >
          login
        </Link>
      </CardFooter>
      <Meteors number={10}></Meteors>
    </Card>
  );
};

export default page;
