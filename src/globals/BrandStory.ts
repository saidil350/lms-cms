import type { GlobalConfig } from 'payload'
import {
  lexicalEditor,
  ParagraphFeature,
  UnorderedListFeature,
  OrderedListFeature,
} from '@payloadcms/richtext-lexical'
import { isAdminOrEditor } from '../access/isAdminOrEditor.ts'

export const BrandStory: GlobalConfig = {
  slug: 'brand-story',
  label: 'Brand Story',
  admin: {
    group: 'Brand',
  },
  access: {
    read: () => true,
    update: isAdminOrEditor,
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow Text',
    },
    {
      name: 'headline',
      type: 'text',
      required: true,
      label: 'Headline',
    },
    {
      name: 'kenapaMRS',
      type: 'textarea',
      label: 'Kenapa MRS',
    },
    {
      name: 'uvpPoints',
      type: 'array',
      label: 'UVP Points',
      fields: [
        {
          name: 'icon',
          type: 'text',
          required: true,
          label: 'Icon',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Title',
        },
      ],
    },
    {
      name: 'brandStoryParagraphs',
      type: 'array',
      label: 'Brand Story Paragraphs',
      fields: [
        {
          name: 'text',
          type: 'textarea',
          required: true,
          label: 'Paragraph',
        },
      ],
    },
    {
      name: 'ctaLabel',
      type: 'text',
      label: 'CTA Label',
    },
    {
      name: 'ctaHref',
      type: 'text',
      label: 'CTA Link',
    },
    {
      name: 'footerLine',
      type: 'text',
      label: 'Footer Line',
    },
  ],
}
