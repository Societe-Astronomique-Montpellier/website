import nodemailer from "nodemailer";

interface ResponseData {
  success: boolean;
  message?: string;
  result?: object;
}

export default defineEventHandler(async (event): Promise<ResponseData> => {
  const config = useRuntimeConfig(event);
  const body = await readBody(event);
  const { name, email, subject, message, turnstileToken } = body;

  if (!turnstileToken) {
    throw createError({
      statusCode: 422,
      statusMessage: "Token not provided.",
    });
  }

  const verifyResponse = await verifyTurnstileToken(
    turnstileToken || body["cf-turnstile-response"],
  );
  if (!verifyResponse.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "CAPTCHA verification failed.",
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: config.smtpHost,
      port: config.smtpPort,
      secure: true,
      auth: {
        user: config.smtpUser,
        pass: config.smtpPwd,
      },
    });

    transporter.verify((err): void => {
      if (err) {
        throw new Error(err.message);
      }
    });

    const result = transporter.sendMail({
      from: `"Societe-Astronomique-Montpellier" <${config.smtpUser}>`,
      to: "contact@societe-astronomique-montpellier.fr",
      replyTo: email,
      subject: `Message de ${name} (${email}) - ${subject}`,
      text: message,
      html: `<p>${message}</p>`,
    });

    return {
      success: true,
      message:
        "Le message a bien été envoyé, nous vous répondrons au plus vite.",
      result,
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
});
