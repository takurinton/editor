import type { FieldNode, ValueNode } from 'graphql';

export function Fragment(): FieldNode {
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
            value: 'q',
          },
          value: {
            kind: 'ObjectValue',
            fields: [
              {
                kind: 'ObjectField',
                name: {
                  kind: 'Name',
                  value: 'key',
                },
                value: {
                  kind: 'StringValue',
                  value: 'value',
                },
              },
            ],
          },
        },
        {
          kind: 'Argument',
          name: {
            kind: 'Name',
            value: 'args',
          },
          value: {
            kind: 'ListValue',
            values: [
              {
                kind: 'StringValue', 
                value: 'list1' 
              },
              {
                kind: 'StringValue', 
                value: 'list2' 
              },
            ],
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
              value: 'hoge',
            },
          },
        ],
      },
    };
  }