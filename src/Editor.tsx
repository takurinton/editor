import { ASTNode, DocumentNode } from "graphql"
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
    return (
      <>
        <ASTRender node={node.name} /> { ':' } <ASTRender node={node.value}  />
      </>
    );
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
              <ASTRender node={v}  />
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
                  <code>{v.name.value}:</code><input type="text" value={v.value.value}></input>{ ', ' }<br />
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

  if (node.kind === 'StringValue') {
    const handleChange = (e) => {
      const _node = context.getNode();
      console.log(_node)
    };

    return (
      <>
        <input type="text" value={node.value} onInput={handleChange}></input>
      </>
    );
  };
}

export const Editor = (
  { 
    query, 
    ast, 
    onChange
  }: { 
    query: string, 
    ast: DocumentNode, 
    onChange: (query: string, ast: ASTNode) => void
}) => {

  const [q, setQ] = useState<string>(query);
  const [a, setA] = useState<ASTNode>(ast);

  useEffect(() => {
    onChange(q, ast);
  }, [a]);

  const onUChangeAst = (_ast: DocumentNode) => {
    console.log(_ast)
    setA(_ast);
    onChange(q, a);
  };

  const onChangeQuery = (e) => {
    console.log(e.target.value);
    setQ(e.target.value);
  }

  // AST が変更されたらクエリを変更するようにもしたい
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
          console.log(a)
          const astnode = newDocument as DocumentNode;
          onUChangeAst(astnode);
        }}
      >
        <ASTRender node={a}/>
      </NodeContextProvider>
    </div>
  );
}