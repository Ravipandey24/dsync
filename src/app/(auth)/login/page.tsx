import SignInForm from "@/components/forms/SignInForm";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Link } from "@nextui-org/link";

const page = ({}) => {
  return (
    <Card className="fixed w-72 md:w-96 z-20 mx-4" isBlurred radius="md" shadow='lg'>
      <CardHeader>
        <h1 className="text-2xl font-bold">Sign In</h1>
      </CardHeader>
      <CardBody>
        <SignInForm></SignInForm>
      </CardBody>
      <CardFooter className="flex justify-end gap-1">
        <span>don't have an account?</span>
        <Link
          href="/register"
          className="tracking-tight hover:underline"
        >
          register
        </Link>
      </CardFooter>
    </Card>
  );
};

export default page;
