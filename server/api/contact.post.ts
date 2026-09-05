import {createTransport} from "nodemailer";
import type { ContactResponse } from "~~/types/ContactResponse";
import type { SmtpConfig } from "~~/types/SmtpConfig";
import { ContactSchema } from "~~/types/Form/ContactFormData.ts";

export default defineEventHandler(async (event): Promise<ContactResponse> => {
  const config = useRuntimeConfig(event)

  // -- Retrieve data
  const body = await readBody(event);
  const parsed = ContactSchema.safeParse(body);
  if (!parsed.success) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Invalid form data.',
      data: parsed.error.flatten(),
    });
  }

  const { name, email, subject, message, turnstileToken } = parsed.data;

  // -- Turnstile verification
  const verifyResponse = await verifyTurnstileToken(turnstileToken || body["cf-turnstile-response"]);
  if (!verifyResponse.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "CAPTCHA verification failed.",
    });
  }

  // -- SMTP
  const smtpConfig: SmtpConfig = {
    host: config.smtpHost as string,
    port: parseInt(config.smtpPort as unknown as string || "465"),
    secure: true,
    auth: {
      user: config.smtpUser as string,
      pass: config.smtpPwd as string
    },
  }

  const transporter = createTransport(smtpConfig);
  try {
    await transporter.verify();
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'SMTP configuration error.';
    throw createError({ statusCode: 500, statusMessage: message });
  }


  // -- Send email
  try {
    const mail = {
      from: `"Societe-Astronomique-Montpellier" <${config.smtpUser}>`,
      to: config.smtpTo,
      replyTo: email,
      subject: `Message de ${name} (${email}) - ${subject}`,
      text: message,
      html: `<p>${message}</p>`,
    }

    await transporter.sendMail(mail, (err, info) => console.log(err || info));
    return {
      success: true,
      message: "Votre message a bien été envoyé, nous vous répondrons dans les plus brefs délais.",
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
});
