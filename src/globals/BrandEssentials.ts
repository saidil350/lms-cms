import type { GlobalConfig } from 'payload'
import {
  lexicalEditor,
  ParagraphFeature,
  UnorderedListFeature,
  OrderedListFeature,
} from '@payloadcms/richtext-lexical'
import { isAdminOrEditor } from '../access/isAdminOrEditor.ts'

export const BrandEssentials: GlobalConfig = {
  slug: 'brand-essentials',
  label: 'Brand Essentials',
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
      name: 'brandName',
      type: 'text',
      label: 'Brand Name',
    },
    {
      name: 'brandTagline',
      type: 'text',
      label: 'Brand Tagline',
    },
    {
      name: 'brandMissionItems',
      type: 'array',
      label: 'Brand Mission Items',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          label: 'Mission Item',
        },
      ],
    },
    {
      name: 'coreValues',
      type: 'array',
      label: 'Core Values',
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
      name: 'stpSegmentation',
      type: 'array',
      label: 'STP Segmentation',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          label: 'Segmentation Point',
        },
      ],
    },
    {
      name: 'stpTargeting',
      type: 'array',
      label: 'STP Targeting',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          label: 'Targeting Point',
        },
      ],
    },
    {
      name: 'stpPositioning',
      type: 'array',
      label: 'STP Positioning',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          label: 'Positioning Point',
        },
      ],
    },
    {
      name: 'positioningTargetMarket',
      type: 'textarea',
      label: 'Positioning Target Market',
    },
    {
      name: 'positioningBrandFor',
      type: 'textarea',
      label: 'Positioning Brand + Frame of Reference',
    },
    {
      name: 'positioningPod',
      type: 'textarea',
      label: 'Positioning Point of Difference',
    },
    {
      name: 'positioningRtb',
      type: 'array',
      label: 'Positioning Reasons to Believe',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          label: 'Reason',
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
  ],
}
