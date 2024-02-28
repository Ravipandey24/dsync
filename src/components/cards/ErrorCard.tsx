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
    <Card className={cn("border border-content1 bg-background/80", className)}>
      <CardBody className="space-y-2">
        {children}
        <span className="text-2xl text-center">{heading}</span>
      </CardBody>
      <CardFooter className="flex justify-center">
        <span>{description}</span>
      </CardFooter>
    </Card>
  );
};

export default ErrorCard;
