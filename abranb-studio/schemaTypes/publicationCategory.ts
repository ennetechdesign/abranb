import {defineField, defineType, getPublishedId} from 'sanity'

export const publicationCategoryType = defineType({
  name: 'publicationCategory',
  title: 'Categoria de publicação',
  type: 'document',
  orderings: [
    {
      title: 'Nome (A-Z)',
      name: 'titleAsc',
      by: [{field: 'title', direction: 'asc'}],
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Nome da categoria',
      type: 'string',
      validation: (rule) =>
        rule.required().custom(async (title, context) => {
          if (!title || !context.document) return true
          const client = context.getClient({apiVersion: '2026-10-01'})
          const published = getPublishedId(context.document._id)
          const existing = await client.fetch<{_id: string} | null>(
            `*[_type == "publicationCategory" && publicationType == $publicationType && title == $title && !sanity::versionOf($published)][0]._id`,
            {
              publicationType: context.document.publicationType,
              title,
              published,
            },
          )
          return existing
            ? 'Já existe uma categoria com este nome para este tipo de publicação.'
            : true
        }),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description: 'Usado no endereço da categoria. Gerado a partir do nome.',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (rule) =>
        rule.required().custom(async (value, context) => {
          const slug = value?.current
          if (!slug || !context.document) return true
          const client = context.getClient({apiVersion: '2026-10-01'})
          const published = getPublishedId(context.document._id)
          const existing = await client.fetch<{_id: string} | null>(
            `*[_type == "publicationCategory" && publicationType == $publicationType && slug.current == $slug && !sanity::versionOf($published)][0]._id`,
            {
              publicationType: context.document.publicationType,
              slug,
              published,
            },
          )
          return existing
            ? 'Já existe uma categoria com este slug para este tipo de publicação.'
            : true
        }),
    }),
    defineField({
      name: 'publicationType',
      title: 'Tipo de publicação',
      type: 'string',
      options: {
        list: [
          {title: 'Artigo', value: 'artigo'},
          {title: 'Notícia', value: 'noticia'},
        ],
        layout: 'radio',
      },
      initialValue: 'artigo',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descrição',
      type: 'text',
      rows: 3,
      description: 'Explique a finalidade desta categoria.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      publicationType: 'publicationType',
    },
    prepare({title, publicationType}) {
      const tipo = publicationType === 'noticia' ? 'Notícia' : 'Artigo'
      return {
        title: title ?? 'Sem título',
        subtitle: tipo,
      }
    },
  },
})
