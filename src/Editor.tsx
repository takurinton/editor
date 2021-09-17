import { ASTNode, DocumentNode } from "graphql"
import { useEffect, useState } from "preact/hooks"

const ASTRender = (
  { 
    node, 
    onChange 
  }: { 
    node: ASTNode;
    onChange?: (ast: ASTNode) => void
   }): JSX.Element => {
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
    console.log(node.kind);
    return (
      <>
        <ASTRender node={node.selectionSet} />
      </>
    )
  };

  if (node.kind === 'SelectionSet') {
    console.log(node.kind);
    return (
      <>
        {node.selections.map((selection, i) => {
          return (
            <>
              <ASTRender node={selection} />
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
              return <ASTRender key={i} node={argument} />;
            })}
          </>
        )}
        {')'}
        {node.directives?.map((directive, i) => {
          return <ASTRender key={i} node={directive} />;
        })}
      </>
    )
  };

  if (node.kind === 'Argument') {
    return (
      <>
        <ASTRender node={node.name} /> { ':' } <ASTRender node={node.value} />
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
                  <code>{v.name.value}: {v.value.value}</code>{ ', ' }<br />
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
    return (
      <>
        <code>{node.value}</code>
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
    onChange: (query: string, ast: DocumentNode) => void
}) => {

  const [q, setQ] = useState(query);
  const [a, setA] = useState(ast);

  useEffect(() => {
    console.log(query)
    onChange(q, ast);
  }, [q]);

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
      <ASTRender node={ast} onChange={onChangeQuery}/>
    </div>
  );
}