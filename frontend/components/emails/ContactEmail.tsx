import { Html, Head, Preview, Body, Container, Text, Section, Hr } from "@react-email/components";

interface ContactEmailProps {
  name: string;
  email: string;
  message: string;
}

export default function ContactEmail({ name, email, message }: ContactEmailProps) {
  const main = {
    backgroundColor: "#ffffff",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
  };

  const container = {
    border: "1px solid #eaeaea",
    borderRadius: "5px",
    margin: "40px auto",
    padding: "20px",
    width: "580px",
  };

  const heading = {
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "center" as const,
    color: "#333",
  };

  const paragraph = {
    fontSize: "16px",
    lineHeight: "1.5",
    color: "#555",
  };

  const label = {
    fontWeight: "bold",
    color: "#333",
  };

  const footer = {
    fontSize: "12px",
    color: "#999",
    textAlign: "center" as const,
    marginTop: "20px",
  };

  return (
    <Html>
      <Head />
      <Preview>New contact message from {name}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section>
            <Text style={heading}>New Contact Message</Text>
            <Hr />
            <Text style={paragraph}><span style={label}>Name:</span> {name}</Text>
            <Text style={paragraph}><span style={label}>Email:</span> {email}</Text>
            <Text style={paragraph}><span style={label}>Message:</span></Text>
            <Text style={{ ...paragraph, padding: "10px", border: "1px solid #eee", borderRadius: "5px", backgroundColor: "#f9f9f9" }}>{message}</Text>
            <Hr />
            <Text style={footer}>This message was sent via your website's contact form.</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}