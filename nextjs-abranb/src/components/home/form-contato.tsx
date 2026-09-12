'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';


type UserFormProps = {
    name: string;
    organization: string;
    email: string;
    subject: string;
    textDescription: string;
};

export default function FormContato() {
    const { t } = useTranslation("home");
    const [userForm, setUserForm] = useState<UserFormProps>({
        name: '',
        organization: '',
        email: '',
        subject: '',
        textDescription: '',
    });


    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { id, value } = e.target;
        setUserForm((prev) => ({ ...prev, [id]: value }));
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!userForm.name || !userForm.subject || !userForm.email || !userForm.textDescription) {
            alert('Por favor, preencha os campos obrigatórios.');
            return;
        }
        try {
            console.log('Formulário enviado:', userForm);
            alert('Email enviada com sucesso! 🎉');

            setUserForm({
                name: '',
                organization: '',
                email: '',
                subject: '',
                textDescription: '',
            });
        } catch (error) {
            alert('Erro ao enviar email. Tente novamente.');
            console.log(error)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="form-contato">
            <div>
                <label htmlFor="name" className="label-contato">
                    {t("contact.fields.fullName.label")}
                </label>
                <input
                    type="text"
                    id="name"
                    value={userForm.name}
                    onChange={handleChange}
                    required
                    className="input-contato"
                    placeholder={t("contact.fields.fullName.placeholder")}
                />
            </div>

            <div>
                <label htmlFor="organization" className="label-contato">
                    {t("contact.fields.organization.label")}
                </label>
                <input
                    type="text"
                    id="organization"
                    value={userForm.organization}
                    onChange={handleChange}
                    className="input-contato"
                    placeholder={t("contact.fields.organization.placeholder")}
                />
            </div>

            <div>
                <label htmlFor="email" className="label-contato">
                    {t("contact.fields.email.label")}
                </label>
                <input
                    type="email"
                    id="email"
                    value={userForm.email}
                    onChange={handleChange}
                    required
                    className="input-contato"
                    placeholder={t("contact.fields.email.placeholder")}
                />
            </div>

            <div>
                <label htmlFor="subject" className="label-contato">
                    {t("contact.fields.subject.label")}
                </label>
                <input
                    type="text"
                    id="subject"
                    value={userForm.subject}
                    onChange={handleChange}
                    className="input-contato"
                    placeholder={t("contact.fields.subject.placeholder")}
                />
            </div>

            <div>
                <label htmlFor="textDescription" className="label-contato">
                    {t("contact.fields.message.label")}
                </label>
                <textarea
                    id="textDescription"
                    value={userForm.textDescription}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="input-contato resize-y"
                    placeholder={t("contact.fields.message.placeholder")}
                />
            </div>
            <div className='flex justify-center'>

                <button type='submit' className='btn-contato-submit'>
                    {t("contact.submitButton")}
                </button>
            </div>

        </form>
    );
}