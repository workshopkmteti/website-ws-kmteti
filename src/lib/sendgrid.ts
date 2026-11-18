import nodemailer from "nodemailer";
import sgMail from "@sendgrid/mail";

type EmailPayload = {
  to: string;
  subject: string;
  text: string;
  attachments?: Array<{
    content: string;
    filename: string;
    type: string;
  }>;
};

async function deliverEmail(payload: EmailPayload): Promise<void> {
  const smtpUser = process.env.SMTP_USER ?? process.env.GMAIL_USER;
  const smtpPass = process.env.SMTP_PASS ?? process.env.GMAIL_APP_PASSWORD;

  if (smtpUser && smtpPass) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST ?? "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT ?? 465),
      secure: (process.env.SMTP_PORT ?? "465") === "465",
      auth: { user: smtpUser, pass: smtpPass },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM ?? smtpUser,
      to: payload.to,
      subject: payload.subject,
      text: payload.text,
      attachments: payload.attachments?.map((att) => ({
        filename: att.filename,
        content: Buffer.from(att.content, "base64"),
        contentType: att.type,
      })),
    });
    return;
  }

  const apiKey = process.env.SENDGRID_API_KEY;
  const fromEmail = process.env.SENDGRID_FROM_EMAIL;
  if (!apiKey || !fromEmail) {
    throw new Error("Missing SMTP (GMAIL_USER/GMAIL_APP_PASSWORD) or SendGrid credentials");
  }

  sgMail.setApiKey(apiKey);
  await sgMail.send({
    to: payload.to,
    from: fromEmail,
    subject: payload.subject,
    text: payload.text,
    attachments: payload.attachments?.map((att) => ({
      content: att.content,
      filename: att.filename,
      type: att.type,
      disposition: "attachment",
    })),
  });
}

export async function sendRegistrationConfirmedEmail(params: {
  to: string;
  participantName: string;
  programTitle: string;
  whatsappGroupUrl: string;
}): Promise<{ ok: boolean }> {
  await deliverEmail({
    to: params.to,
    subject: `[Workshop KMTETI] Pendaftaran ${params.programTitle} Dikonfirmasi`,
    text: `Halo ${params.participantName},\n\nPendaftaran Anda untuk ${params.programTitle} telah dikonfirmasi.\nSilakan bergabung ke grup WhatsApp: ${params.whatsappGroupUrl}\n`,
  });

  return { ok: true };
}

export async function sendTrainingCompletedEmail(params: {
  to: string;
  participantName: string;
  programTitle: string;
  refundProofBase64: string;
  refundProofFilename: string;
  certificateUrl: string;
}): Promise<{ ok: boolean }> {
  await deliverEmail({
    to: params.to,
    subject: `[Workshop KMTETI] Refund Commitment Fee & Sertifikat ${params.programTitle}`,
    text: `Halo ${params.participantName},\n\nPelatihan ${params.programTitle} telah selesai dan Anda memenuhi syarat kelayakan.\nBukti refund commitment fee terlampir, dan sertifikat Anda dapat diunduh di: ${params.certificateUrl}\n`,
    attachments: [
      {
        content: params.refundProofBase64,
        filename: params.refundProofFilename,
        type: "image/png",
      },
    ],
  });

  return { ok: true };
}
