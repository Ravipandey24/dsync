import { DetailedHTMLProps, FC, HTMLAttributes } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";

type ErrorCardProps = {
  heading: string;
  description: string;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const ErrorCard: FC<ErrorCardProps> = ({
  heading,
  description,
  children,
  className,
}) => {
  return (
    <Card className={cn(className)} isBlurred>
      <CardBody className="space-y-2">
        {children}
        <span className="text-2xl text-center">{heading}</span>
      </CardBody>
      <CardFooter>
        <span>{description}</span>
      </CardFooter>
    </Card>
  );
};

export default ErrorCard;
