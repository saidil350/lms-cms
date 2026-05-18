import type { GlobalConfig } from 'payload'
import {
  lexicalEditor,
  ParagraphFeature,
  UnorderedListFeature,
  OrderedListFeature,
} from '@payloadcms/richtext-lexical'
import { isAdminOrEditor } from '../access/isAdminOrEditor.ts'

export const DifferentiatingExecution: GlobalConfig = {
  slug: 'differentiating-execution',
  label: 'Differentiating Execution',
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
      name: 'subheadline',
      type: 'textarea',
      label: 'Subheadline',
    },
    {
      name: 'standarTitle',
      type: 'text',
      label: 'Standar Title',
    },
    {
      name: 'standars',
      type: 'array',
      label: 'Standar Halgreen Items',
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
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Description',
        },
      ],
    },
    {
      name: 'mopTitle',
      type: 'text',
      label: 'MOP Title',
    },
    {
      name: 'mopItems',
      type: 'array',
      label: 'MOP Items',
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
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Description',
        },
      ],
    },
    {
      name: 'closingTitle',
      type: 'text',
      label: 'Closing Title',
    },
    {
      name: 'closingText',
      type: 'textarea',
      label: 'Closing Text',
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
