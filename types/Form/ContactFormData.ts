import * as zod from 'zod'

export const ContactSchema = zod.object({
    name: zod.string().min(3, 'Le nom doit contenir au moins 3 caractères'),
    email: zod.string().email('Adresse e-mail invalide'),
    subject: zod.string().min(1, 'Le sujet est requis'),
    message: zod.string().min(10, 'Le message doit contenir au moins 10 caractères'),
    turnstileToken: zod.string().min(1, 'Merci de valider le captcha'),
})

export type ContactFormData = zod.infer<typeof ContactSchema>