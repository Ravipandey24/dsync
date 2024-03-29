"use server";

import { render } from "@react-email/render";
const nodemailer = require("nodemailer");
import { RegisterEmail } from "../../components/widgets/RegisterEmail";

export async function sendRegisterationEmail(
  email: string,
  username: string,
  password: string
) {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      auth: {
        user: process.env.BREVO_USER,
        pass: process.env.BREVO_PASS,
      },
    });
    const emailHtml = render(RegisterEmail({ username, password }));
    await transporter.sendMail({
      from: `Himanshu from DSync <${process.env.BREVO_USER}>`, // sender address
      to: email, // list of receivers
      subject: "Welcome to DSync", // Subject line
      html: emailHtml, // html body
    });
    return { success: true };
  } catch (e) {
    console.error(e);
    return { success: false };
  }
}
