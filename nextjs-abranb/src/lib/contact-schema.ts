import { z } from 'zod';

/** Messages are i18n keys (namespace "home"); the form translates them. */
export const contactSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, 'contact.errors.required')
        .min(2, 'contact.errors.nameTooShort')
        .max(100, 'contact.errors.tooLong'),
    organization: z.string().trim().max(100, 'contact.errors.tooLong'),
    email: z
        .string()
        .trim()
        .min(1, 'contact.errors.required')
        .max(254, 'contact.errors.tooLong')
        .pipe(z.email('contact.errors.emailInvalid')),
    subject: z.string().trim().max(150, 'contact.errors.tooLong'),
    textDescription: z
        .string()
        .trim()
        .min(1, 'contact.errors.required')
        .min(10, 'contact.errors.messageTooShort')
        .max(5000, 'contact.errors.tooLong'),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactField = keyof ContactInput;
export type ContactFieldErrors = Partial<Record<ContactField, string>>;

export function validateContact(input: unknown):
    | { success: true; data: ContactInput }
    | { success: false; errors: ContactFieldErrors } {
    const result = contactSchema.safeParse(input);
    if (result.success) return { success: true, data: result.data };

    const errors: ContactFieldErrors = {};
    for (const issue of result.error.issues) {
        const field = issue.path[0] as ContactField;
        if (!errors[field]) errors[field] = issue.message;
    }
    return { success: false, errors };
}
