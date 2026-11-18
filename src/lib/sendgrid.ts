import sgMail from "@sendgrid/mail";

function getSendGridClient() {
  const apiKey = process.env.SENDGRID_API_KEY;
  const fromEmail = process.env.SENDGRID_FROM_EMAIL;
  if (!apiKey || !fromEmail) {
    throw new Error("Missing SENDGRID_API_KEY or SENDGRID_FROM_EMAIL");
  }
  sgMail.setApiKey(apiKey);
  return { client: sgMail, fromEmail };
}

export async function sendRegistrationConfirmedEmail(params: {
  to: string;
  participantName: string;
  programTitle: string;
  whatsappGroupUrl: string;
}): Promise<{ ok: boolean }> {
  const { client, fromEmail } = getSendGridClient();

  await client.send({
    to: params.to,
    from: fromEmail,
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
  const { client, fromEmail } = getSendGridClient();

  await client.send({
    to: params.to,
    from: fromEmail,
    subject: `[Workshop KMTETI] Refund Commitment Fee & Sertifikat ${params.programTitle}`,
    text: `Halo ${params.participantName},\n\nPelatihan ${params.programTitle} telah selesai dan Anda memenuhi syarat kelayakan.\nBukti refund commitment fee terlampir, dan sertifikat Anda dapat diunduh di: ${params.certificateUrl}\n`,
    attachments: [
      {
        content: params.refundProofBase64,
        filename: params.refundProofFilename,
        type: "image/png",
        disposition: "attachment",
      },
    ],
  });

  return { ok: true };
}
