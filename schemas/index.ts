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
      },
      {
        name: 'image',
        title: 'Image',
        type: 'image',
      },
      {
        name: 'content',
        title: 'Content',
        type: 'object',
        fields: [
          {
            name: 'title1',
            title: 'Title 1',
            type: 'string',
          },
          {
            name: 'para',
            title: 'Paragraph',
            type: 'text',
          },
          {
            name: 'title2',
            title: 'Title 2',
            type: 'string',
          },
          {
            name: 'para2',
            title: 'Paragraph 2',
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
  {
    name: 'menu',
    title: 'Menu',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
      },
      {
        name: 'page',
        title: 'Page (Optional)',
        type: 'reference',
        to: [{type: 'page'}],
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
]
