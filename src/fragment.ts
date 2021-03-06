import type { FieldNode } from 'graphql';

export const fragment = (): FieldNode => {
    return {
      kind: 'Field',
      alias: {
        kind: 'Name',
        value: 'data',
      },
      name: {
        kind: 'Name',
        value: 'hoge',
      },
      arguments: [
        {
          kind: 'Argument',
          name: {
            kind: 'Name',
            value: 'name',
          },
          value: {
            kind: 'StringValue',
            value: 'takurinton',
          },
        },
        {
          kind: 'Argument',
          name: {
            kind: 'Name',
            value: 'age',
          },
          value: {
            kind: 'IntValue',
            value: '21',
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: {
              kind: 'Name',
              value: 'name',
            },
          },
          {
            kind: 'Field',
            name: {
              kind: 'Name',
              value: 'age',
            },
          },
          {
            kind: 'Field',
            name: {
              kind: 'Name',
              value: 'genre',
            },
          },
        ],
      },
    };
  }