'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Button from '@/components/button';
import { StatusIcon } from '@/components/status-icon';
import { validateContact, type ContactField, type ContactInput } from '@/lib/contact-schema';
import { sendContact } from '../actions/send-contact';

type SubmitStatus = 'idle' | 'sending' | 'sent' | 'error';

const emptyForm: ContactInput = {
    name: '',
    organization: '',
    email: '',
    subject: '',
    textDescription: '',
};

export default function FormContato() {
    const { t } = useTranslation("home");
    const [userForm, setUserForm] = useState<ContactInput>(emptyForm);
    const [honeypot, setHoneypot] = useState('');
    const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({});
    const [submitted, setSubmitted] = useState(false);
    const [status, setStatus] = useState<SubmitStatus>('idle');

    const validation = validateContact(userForm);
    const errors = validation.success ? {} : validation.errors;

    function errorFor(field: ContactField) {
        return touched[field] || submitted ? errors[field] : undefined;
    }

    function fieldProps(field: ContactField) {
        const error = errorFor(field);
        return {
            id: field,
            value: userForm[field],
            onChange: handleChange,
            onBlur: () => setTouched((prev) => ({ ...prev, [field]: true })),
            'aria-invalid': error ? true : undefined,
            'aria-describedby': error ? `${field}-error` : undefined,
        };
    }

    function renderError(field: ContactField) {
        const error = errorFor(field);
        if (!error) return null;
        return (
            <p id={`${field}-error`} className="error-contato">
                {t(error)}
            </p>
        );
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { id, value } = e.target;
        setUserForm((prev) => ({ ...prev, [id]: value }));
        // Any edit resets the button so the chevron comes back.
        setStatus((prev) => (prev === 'sending' ? prev : 'idle'));
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (status === 'sending') return;

        setSubmitted(true);
        if (!validation.success) {
            const firstInvalid = (Object.keys(emptyForm) as ContactField[]).find((f) => errors[f]);
            if (firstInvalid) document.getElementById(firstInvalid)?.focus();
            return;
        }

        setStatus('sending');
        try {
            const result = await sendContact(userForm, honeypot);
            if (result.ok) {
                setStatus('sent');
                setUserForm(emptyForm);
                setTouched({});
                setSubmitted(false);
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    }

    const buttonIcon =
        status === 'sending' ? <StatusIcon name="spinner" />
        : status === 'sent' ? <StatusIcon name="check" />
        : status === 'error' ? <StatusIcon name="error" />
        : undefined;

    const buttonLabel = status === 'idle' ? t("contact.submitButton") : t(`contact.submitStatus.${status}`);

    return (
        <form onSubmit={handleSubmit} noValidate className="form-contato">
            <div>
                <label htmlFor="name" className="label-contato">
                    {t("contact.fields.fullName.label")}
                </label>
                <input
                    type="text"
                    required
                    autoComplete="name"
                    className="input-contato"
                    placeholder={t("contact.fields.fullName.placeholder")}
                    {...fieldProps('name')}
                />
                {renderError('name')}
            </div>

            <div>
                <label htmlFor="organization" className="label-contato">
                    {t("contact.fields.organization.label")}
                </label>
                <input
                    type="text"
                    autoComplete="organization"
                    className="input-contato"
                    placeholder={t("contact.fields.organization.placeholder")}
                    {...fieldProps('organization')}
                />
                {renderError('organization')}
            </div>

            <div>
                <label htmlFor="email" className="label-contato">
                    {t("contact.fields.email.label")}
                </label>
                <input
                    type="email"
                    required
                    autoComplete="email"
                    className="input-contato"
                    placeholder={t("contact.fields.email.placeholder")}
                    {...fieldProps('email')}
                />
                {renderError('email')}
            </div>

            <div>
                <label htmlFor="subject" className="label-contato">
                    {t("contact.fields.subject.label")}
                </label>
                <input
                    type="text"
                    className="input-contato"
                    placeholder={t("contact.fields.subject.placeholder")}
                    {...fieldProps('subject')}
                />
                {renderError('subject')}
            </div>

            <div>
                <label htmlFor="textDescription" className="label-contato">
                    {t("contact.fields.message.label")}
                </label>
                <textarea
                    required
                    rows={6}
                    className="input-contato resize-y"
                    placeholder={t("contact.fields.message.placeholder")}
                    {...fieldProps('textDescription')}
                />
                {renderError('textDescription')}
            </div>

            {/* Honeypot: hidden from people, tempting to bots. */}
            <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                />
            </div>

            <div className='flex justify-center'>
                <Button
                    variant="outline-gold-to-purple-strong"
                    size="contact"
                    type="submit"
                    icon={buttonIcon}
                    className={status === 'error' ? '!border-[#d32f2f] !bg-[#d32f2f] !text-white hover:!bg-[#d32f2f]' : undefined}
                    disabled={status === 'sending' || status === 'sent'}
                >
                    {buttonLabel}
                </Button>
            </div>

            <p role="status" aria-live="polite" className="sr-only">
                {status === 'idle' ? '' : buttonLabel}
            </p>
        </form>
    );
}
