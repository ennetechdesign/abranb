import {defineArrayMember, defineField, defineType} from 'sanity'


// O tempo estimado de leitura e a data relativa ("há X dias") não são
// armazenados: são calculados dinamicamente no front-end a partir do
// conteúdo e da data de publicação (ver `src/lib/publication.ts`).
export const postType = defineType({
  name: 'post',
  title: 'Publicação',
  type: 'document',
  groups: [
    {
      name: 'publicacao',
      title: 'Publicação',
    },
    {
      name: 'conteudo',
      title: 'Conteúdo',
    },
    {
      name: 'autoria',
      title: 'Autoria',
    },
  ],
  orderings: [
    {
      title: 'Data de publicação (recentes primeiro)',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      group: 'publicacao',
      validation: (rule) => [
        rule.required(),
        rule.min(10).warning('Prefira títulos com pelo menos 10 caracteres.'),
        rule.max(140),
      ],
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtítulo',
      description: 'Resumo curto exibido abaixo do título.',
      type: 'text',
      rows: 2,
      group: 'publicacao',
      validation: (rule) => rule.max(300),
    }),
    defineField({
      name: 'publicationType',
      title: 'Tipo de publicação',
      type: 'string',
      group: 'publicacao',
      options: {
        list: [
          {title: 'Notícia', value: 'noticia'},
          {title: 'Artigo', value: 'artigo'},
        ],
        layout: 'radio',
      },
      initialValue: 'noticia',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Identificador (slug)',
      description: 'Usado no endereço da página. Gerado a partir do título.',
      type: 'slug',
      group: 'publicacao',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Data de publicação',
      type: 'datetime',
      group: 'publicacao',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => [
        rule.required(),
        rule
          .custom((value?: string) => {
            if (!value) return true
            if (Number.isNaN(Date.parse(value))) return 'Informe uma data válida.'
            if (new Date(value).getTime() > Date.now()) {
              return 'A data está no futuro. A publicação será exibida como agendada.'
            }
            return true
          })
          .warning(),
      ],
    }),
    defineField({
      name: 'image',
      title: 'Capa da publicação',
      description: 'Imagem de destaque. Informe o texto alternativo para acessibilidade.',
      type: 'image',
      group: 'conteudo',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto alternativo',
          description: 'Descreva a imagem para pessoas que usam leitores de tela.',
          type: 'string',
          validation: (rule) =>
            rule
              .custom((value?: string) => {
                if (!value) return 'Informe o texto alternativo da capa para acessibilidade.'
                return true
              })
              .warning(),
        }),
      ],
    }),
    defineField({
      name: 'body',
      title: 'Conteúdo da publicação',
      description:
        'Monte o conteúdo na ordem desejada: parágrafos, listas, citações e imagens.',
      type: 'array',
      group: 'conteudo',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Título 2', value: 'h2'},
            {title: 'Título 3', value: 'h3'},
            {title: 'Título 4', value: 'h4'},
            {title: 'Citação', value: 'blockquote'},
          ],
          lists: [
            {title: 'Marcadores', value: 'bullet'},
            {title: 'Numerada', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Negrito', value: 'strong'},
              {title: 'Itálico', value: 'em'},
              {title: 'Sublinhado', value: 'underline'},
              {title: 'Código', value: 'code'},
            ],
            annotations: [
              defineArrayMember({
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  defineField({
                    name: 'href',
                    title: 'Endereço',
                    type: 'url',
                    validation: (rule) =>
                      rule.required().uri({scheme: ['http', 'https', 'mailto', 'tel']}),
                  }),
                  defineField({
                    name: 'blank',
                    title: 'Abrir em nova guia',
                    type: 'boolean',
                    initialValue: true,
                  }),
                ],
              }),
            ],
          },
        }),
        defineArrayMember({
          name: 'bodyImage',
          title: 'Imagem',
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Texto alternativo',
              description: 'Descreva a imagem para pessoas que usam leitores de tela.',
              type: 'string',
              validation: (rule) =>
                rule
                  .custom((value?: string) => {
                    if (!value) return 'Informe o texto alternativo da imagem para acessibilidade.'
                    return true
                  })
                  .warning(),
            }),
            defineField({
              name: 'caption',
              title: 'Legenda',
              description: 'Exibida abaixo da imagem.',
              type: 'string',
              validation: (rule) => rule.max(200),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'authorName',
      title: 'Nome da pessoa autora',
      type: 'string',
      group: 'autoria',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'authorPhoto',
      title: 'Foto de perfil da pessoa autora',
      type: 'image',
      group: 'autoria',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto alternativo',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'authorLink',
      title: 'Link principal da pessoa autora',
      description: 'Portfólio, currículo ou perfil profissional (HTTP ou HTTPS).',
      type: 'url',
      group: 'autoria',
      validation: (rule) => rule.uri({scheme: ['http', 'https'], allowRelative: false}),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'image',
      publicationType: 'publicationType',
      publishedAt: 'publishedAt',
    },
    prepare({title, subtitle, media, publicationType, publishedAt}) {
      const tipo = publicationType === 'artigo' ? 'Artigo' : 'Notícia'
      const data = publishedAt ? new Date(publishedAt).toLocaleDateString('pt-BR') : ''
      return {
        title: title ?? 'Sem título',
        subtitle: [tipo, data].filter(Boolean).join(' · ') || subtitle,
        media,
      }
    },
  },
})
