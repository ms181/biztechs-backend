export const schemaTypes = [
  {
    name: 'page',
    title: 'Page',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
        validation: (Rule: any) => Rule.required().min(1).max(255),
      },
      {
        name: 'image',
        title: 'Image',
        type: 'image',
      },
      {
        name: 'content',
        title: 'Content',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'title',
                title: 'Title',
                type: 'string',
                validation: (Rule: any) => Rule.min(1).max(255),
              },
              {
                name: 'image',
                title: 'Image',
                type: 'image',
              },
              {
                name: 'imagepos',
                title: 'Image Position',
                type: 'string',
                options: {
                  list: [
                    {title: 'Left', value: 'left'},
                    {title: 'Right', value: 'right'},
                  ],
                },
                validation: (Rule: any) =>
                  Rule.custom((value: any, context: any) => {
                    const imageField = context.parent.image

                    if (imageField && !value) {
                      return 'Image Position is required.'
                    }

                    return true
                  }),
              },
              {
                name: 'subtitle',
                title: 'Sub Title',
                type: 'string',
                validation: (Rule: any) => Rule.min(1).max(255),
              },
              {
                name: 'paragraph',
                title: 'Paragraph',
                type: 'text',
              },
              {
                name: 'list',
                title: 'List',
                type: 'array',
                of: [{type: 'string'}],
                options: {
                  layout: 'tags',
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'menu',
    title: 'Menu',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
        validation: (Rule: any) => Rule.required().min(1).max(255),
      },
      {
        name: 'page',
        title: 'Page (Optional)',
        type: 'reference',
        to: [{type: 'page'}],
        validation: (Rule: any) =>
          Rule.custom((page: any, context: any) => {
            const submenus = context.document.submenus
            if (submenus && submenus.length > 0 && page !== undefined) {
              return "Menu shouldn't have a page if there are submenus"
            }
            return true
          }),
      },

      {
        name: 'block',
        title: 'Block',
        type: 'object',
        fields: [
          {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule: any) => Rule.required().min(1).max(255),
          },
          {
            name: 'image',
            title: 'Image',
            type: 'image',
            validation: (Rule: any) => Rule.required(),
          },
          {
            name: 'paragraph',
            title: 'Paragraph',
            type: 'text',
            validation: (Rule: any) => Rule.required(),
          },
          {
            name: 'url',
            title: 'URL',
            type: 'string',
          },
        ],
      },
      {
        name: 'submenus',
        title: 'Submenus',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'title',
                title: 'Title',
                type: 'string',
                validation: (Rule: any) => Rule.required().min(1).max(255),
              },
              {
                name: 'submenus',
                title: 'Submenus',
                validation: (Rule: any) => Rule.required(),
                type: 'array',
                of: [
                  {
                    type: 'object',
                    fields: [
                      {
                        name: 'title',
                        title: 'Title',
                        type: 'string',
                        validation: (Rule: any) => Rule.required().min(1).max(255),
                      },
                      {
                        name: 'page',
                        title: 'Page (Optional)',
                        type: 'reference',
                        to: [{type: 'page'}],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'portfolio',
    title: 'Portfolio',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
        validation: (Rule: any) => Rule.required().min(1).max(255),
      },
      {
        name: 'grid',
        title: 'Grid',
        description: 'You can either add items to grid or to rows',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'title',
                title: 'Title',
                type: 'string',
                validation: (Rule: any) => Rule.min(1).max(255),
              },
              {
                name: 'image',
                title: 'Image',
                type: 'image',
                validation: (Rule: any) => Rule.required(),
              },
              {
                name: 'url',
                title: 'URL',
                type: 'url',
                validation: (Rule: any) => Rule.required(),
              },
            ],
          },
        ],
        validation: (Rule: any) =>
          Rule.custom((items: any, context: any) => {
            // Check if items exist in the 'grid' field
            if (items && items.length > 0) {
              const rows = context.document.rows
              // Ensure the 'rows' field is empty
              if (rows && rows.length > 0) {
                return 'Cannot add items to both "grid" and "rows". Please remove items from "rows" before adding to "grid".'
              }
            }
            return true
          }),
      },
      {
        name: 'rows',
        title: 'Rows',
        description: 'You can either add items to rows or to grid',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'image',
                title: 'Image',
                type: 'image',
                validation: (Rule: any) => Rule.required(),
              },
              {
                name: 'list',
                title: 'List',
                type: 'array',
                of: [{type: 'string'}],
                options: {
                  layout: 'tags',
                },
                validation: (Rule: any) => Rule.required(),
              },
            ],
          },
        ],
        validation: (Rule: any) =>
          Rule.custom((items: any, context: any) => {
            // Check if items exist in the 'rows' field
            if (items && items.length > 0) {
              const grid = context.document.grid
              // Ensure the 'grid' field is empty
              if (grid && grid.length > 0) {
                return 'Cannot add items to both "rows" and "grid". Please remove items from "grid" before adding to "rows".'
              }
            }
            return true
          }),
      },
    ],
  },
]
