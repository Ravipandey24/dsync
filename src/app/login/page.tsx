import SignInForm from "@/components/forms/SignInForm";
import { Card, CardBody, CardHeader } from "@nextui-org/card";

const page = ({}) => {
  return (
    <Card className="fixed w-72 md:w-96 z-20 mx-4" isBlurred radius="md" shadow='lg'>
      <CardHeader>
        <h1 className="text-2xl font-bold">Sign In</h1>
      </CardHeader>
      <CardBody>
        <SignInForm></SignInForm>
      </CardBody>
    </Card>
  );
};

export default page;
