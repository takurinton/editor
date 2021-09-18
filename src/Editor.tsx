import { ASTNode, DocumentNode, print } from "graphql"
import { useEffect, useState } from "preact/hooks"
import { NodeContextProvider, useNodeContext } from './context';

const ASTRender = (
  { 
    node, 
    onChange,
  }: { 
    node: ASTNode;
    onChange?: (ast: ASTNode) => void;
  }
): JSX.Element => {
  const context = useNodeContext();
  
  if (node.kind === 'Document') {
    return (
      <>
        {
          node.definitions.map((n, i) => (
            <ASTRender node={n} key={i} />
          ))
        }
      </>
    );
  };

  if (node.kind === 'OperationDefinition') {
    return (
      <>
        <ASTRender node={node.selectionSet} />
      </>
    )
  };

  if (node.kind === 'SelectionSet') {
    return (
      <>
        {node.selections.map((selection, i) => {
          return (
            <>
              <ASTRender node={selection}  />
            </>
          );
        })}
      </>
    )
  };

  if (node.kind === 'Field') {
    return (
      <>
        {node.alias && (
          <>
            <ASTRender node={node.alias} />
            {`: `}
          </>
        )}
        <ASTRender node={node.name} />
        {'('}
        {node.arguments && (
          <>
            {node.arguments.map((argument, i) => {
              return <ASTRender key={i} node={argument}  />;
            })}
          </>
        )}
        {')'}
        {node.directives?.map((directive, i) => {
          return <ASTRender key={i} node={directive}/>;
        })}
      </>
    )
  };

  if (node.kind === 'Argument') {
    if (node.value.kind === 'StringValue') {
      const handleChange = (e) => {
        const _node = context.getNode();
        _node.definitions.map(v => {
          v.selectionSet.selections.map(vv => {
            vv.arguments.map(vvv => {
              if (vvv.name.value === node.name.value) {
                vvv.value.value = e.target.value
              };
            });
          });
        });
        context.updateNode(node, _node);
      };

      return (
        <>
          <ASTRender node={node.name} /> { ':' } <input type="text" value={node.value.value} onInput={handleChange}></input>
        </>
      );
    }
    if (node.value.kind === 'IntValue') {
      const handleChange = (e) => {
        const _node = context.getNode();
        _node.definitions.map(v => {
          v.selectionSet.selections.map(vv => {
            vv.arguments.map(vvv => {
              if (vvv.name.value === node.name.value) {
                vvv.value.value = e.target.value
              };
            });
          });
        });
        context.updateNode(node, _node);
      };

      return (
        <>
          <ASTRender node={node.name} /> { ':' } <input type="number" value={node.value.value} onInput={handleChange}></input>
        </>
      );
    }
  };

  if (node.kind === 'Name') {
    return (
      <>
        <code>{node.value}</code>
      </>
    );
  };

  if (node.kind === 'ListValue') {
    return (
      <>
        {'['}
        {node.values.map((v, i) => {
          return (
            <>
              {`${i ? ', ' : ''}`}
              <ASTRender node={v} />
            </>
          );
        })}
        {']'}
      </>
    );
  }

  if (node.kind === 'ObjectValue') {
    return (
      <>
        {
          <>
            <code>{ '{ ' }</code><br/>
            {
              node.fields.map((v, i) => {
              return (
                <>
                  <code>{v.name.value}:</code><input type="text" value={v.name.value}></input>{ ', ' }<br />
                </>
                )
              })
            }
          <code>{ ' }' }</code>
          </>
        }
      </>
    );
  }

  // if (node.kind === 'StringValue') {
  //   const handleChange = (e) => {
  //     const _node = context.getNode();
  //     _node.definitions.map(v => {
  //       v.selectionSet.selections.map(vv => {
  //         vv.arguments.map(vvv => {
  //           console.log(vvv)
  //         })
  //       })
  //     })
  //     _node.definitions[0].selectionSet.selections[0].arguments[0].value.value = e.target.value;
  //     context.updateNode(node, _node);
  //   };

  //   return (
  //     <>
  //       <input type="text"  value={node.value} onInput={handleChange}></input>
  //     </>
  //   );
  // };
}

export const Editor = (
  { 
    query, 
    ast, 
    onChange
  }: { 
    query: string, 
    ast: ASTNode, 
    onChange: (query: string, ast: ASTNode) => void
}) => {

  const [q, setQ] = useState<string>(query);
  const [a, setA] = useState<ASTNode>(ast);

  useEffect(() => {
    onChange(q, ast);
  }, [a]);

  const onChangeAst = (_ast: DocumentNode) => {
    const _query = print(_ast);
    setA(_ast);
    setQ(_query);
    onChange(q, a);
  };

  return (
    <div style={
      {
        width: '100%', 
        background: 'gray', 
        textAlign: 'left',
        padding: '30px'
      }
    }>
      <NodeContextProvider 
        root={ast}
        onChangeNode={newDocument => {
          const astnode = newDocument as DocumentNode;
          onChangeAst(astnode);
        }}
      >
        <ASTRender node={a}/>
      </NodeContextProvider>
    </div>
  );
}