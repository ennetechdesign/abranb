'use server';

import { Resend } from 'resend';

import { validateContact, type ContactFieldErrors } from '@/lib/contact-schema';

const CONTACT_RECIPIENT = 'abranb.associacao@gmail.com';

export type SendContactResult =
    | { ok: true }
    | { ok: false; code: 'invalid'; fieldErrors: ContactFieldErrors }
    | { ok: false; code: 'send_failed' };

function escapeHtml(value: string) {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

export async function sendContact(input: unknown, honeypot?: string): Promise<SendContactResult> {
    // Bots fill hidden fields; pretend success so they get no signal.
    if (honeypot) return { ok: true };

    const validated = validateContact(input);
    if (!validated.success) {
        return { ok: false, code: 'invalid', fieldErrors: validated.errors };
    }

    const apiKey = process.env.RESEND_API_KEY;
    const domain = process.env.RESEND_EMAIL_DOMAIN;
    if (!apiKey || !domain) {
        console.error('sendContact: RESEND_API_KEY or RESEND_EMAIL_DOMAIN is not set');
        return { ok: false, code: 'send_failed' };
    }

    const { name, organization, email, subject, textDescription } = validated.data;

    const text = [
        `Nome: ${name}`,
        `Organização: ${organization || '—'}`,
        `Email: ${email}`,
        '',
        textDescription,
    ].join('\n');

    const html = `
        <p><strong>Nome:</strong> ${escapeHtml(name)}</p>
        <p><strong>Organização:</strong> ${escapeHtml(organization || '—')}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p style="white-space:pre-wrap">${escapeHtml(textDescription)}</p>
    `;

    try {
        const { error } = await new Resend(apiKey).emails.send({
            from: `Site ABRANB <contato@${domain}>`,
            to: CONTACT_RECIPIENT,
            replyTo: email,
            subject: `[Site ABRANB] ${subject || 'Novo contato'}`,
            text,
            html,
        });
        if (error) {
            console.error('sendContact: Resend error', error);
            return { ok: false, code: 'send_failed' };
        }
        return { ok: true };
    } catch (error) {
        console.error('sendContact: unexpected error', error);
        return { ok: false, code: 'send_failed' };
    }
}
