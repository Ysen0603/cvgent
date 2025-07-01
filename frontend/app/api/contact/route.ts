import { NextResponse } from "next/server";
import { Resend } from "resend";
import ContactEmail from "../../../components/emails/ContactEmail";

const resend = new Resend(process.env.RESEND_API_KEY);
const to_email = process.env.RESEND_TO_EMAIL as string;

export async function POST(request: Request) {
  const { name, email, message } = await request.json();

  try {
    const data = await resend.emails.send({
      from: "Contact Form <onbehalfof@resend.dev>",
      replyTo: email,
      to: to_email,
      subject: "New Contact Message",
      react: ContactEmail({ name, email, message }),
    });

    return NextResponse.json({ success: true, id: data.data?.id ?? null });
  } catch (error: any) {
    console.error("Failed to send email:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}