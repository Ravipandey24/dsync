import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";
import * as React from "react";

interface RegisterEmailProps {
  username?: string;
  password?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const RegisterEmail = ({ username, password }: RegisterEmailProps) => {
  const previewText = `Welcome to DSync!`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Section className="mt-[32px] h-24 bg-black">
              <Heading className="text-white text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                Welcome to <strong>DSync</strong>
              </Heading>
            </Section>

            <Text className="text-black text-[14px] leading-[24px]">
              Hello {username},
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Your account has been created successfully. Here are your login
              details:
            </Text>
            <Section>
              <Row className="gap-2">
                <Text>Username: {username}</Text>
                <Text>Password: {password}</Text>
              </Row>
            </Section>
            <Text className="text-black text-[14px] leading-[24px]">
              This is a generated password. Please change it after logging in.
            </Text>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              If you have any questions, please feel free to contact me
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default RegisterEmail;
