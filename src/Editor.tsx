import { ASTNode, DocumentNode } from "graphql"
import { useEffect, useState } from "preact/hooks"

const ASTRender = (
  { 
    node, 
    onChange,
  }: { 
    node: ASTNode;
    onChange?: (ast: ASTNode) => void;
  }
): JSX.Element => {
  if (node.kind === 'Document') {
    const [n, setN] = useState<ASTNode>(node);
    useEffect(() => {
      onChange ? onChange(n) : console.log('onChange is undefined');
    }, [n]);

    return (
      <>
        {
          node.definitions.map((n, i) => (
            <ASTRender node={n} key={i} onChange={n => setN(n)}/>
          ))
        }
      </>
    );
  };

  if (node.kind === 'OperationDefinition') {
    const [n, setN] = useState<ASTNode>(node);
    useEffect(() => {
      onChange ? onChange(n) : console.log('onChange is undefined');
    }, [n]);

    return (
      <>
        <ASTRender node={node.selectionSet} />
      </>
    )
  };

  if (node.kind === 'SelectionSet') {
    const [n, setN] = useState<ASTNode>(node);
    useEffect(() => {
      onChange ? onChange(n) : console.log('onChange is undefined');
    }, [n]);

    return (
      <>
        {node.selections.map((selection, i) => {
          return (
            <>
              <ASTRender node={selection} onChange={n => setN(n)} />
            </>
          );
        })}
      </>
    )
  };

  if (node.kind === 'Field') {
    const [n, setN] = useState<ASTNode>(node);
    useEffect(() => {
      onChange ? onChange(n) : console.log('onChange is undefined');
    }, [n]);

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
              return <ASTRender key={i} node={argument} onChange={n => setN(n)} />;
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
    const [n, setN] = useState<ASTNode>(node);
    useEffect(() => {
      onChange ? onChange(n) : console.log('onChange is undefined');
    }, [n]);

    return (
      <>
        <ASTRender node={node.name} /> { ':' } <ASTRender node={node.value} onChange={n => setN(n)} />
      </>
    );
  };

  if (node.kind === 'Name') {
    // const [n, setN] = useState<ASTNode>(node);
    // useEffect(() => {
    //   console.log(n)
    //   onChange ? onChange(n) : console.log('onChange is undefined');
    // }, [n]);

    return (
      <>
        <code>{node.value}</code>
      </>
    );
  };

  if (node.kind === 'ListValue') {
    const [n, setN] = useState<ASTNode>(node);
    useEffect(() => {
      onChange ? onChange(n) : console.log('onChange is undefined');
    }, [n]);

    return (
      <>
        {'['}
        {node.values.map((v, i) => {
          return (
            <>
              {`${i ? ', ' : ''}`}
              <ASTRender node={v} onChange={n => setN(n)} />
            </>
          );
        })}
        {']'}
      </>
    );
  }

  if (node.kind === 'ObjectValue') {
    const [n, setN] = useState<ASTNode>(node);
    useEffect(() => {
      onChange ? onChange(n) : console.log('onChange is undefined');
    }, [n]);

    return (
      <>
        {
          <>
            <code>{ '{ ' }</code><br/>
            {
              node.fields.map((v, i) => {
              return (
                <>
                  <code>{v.name.value}:</code><input type="text" value={v.value.value} onInput={e => setN(e.target.value)}></input>{ ', ' }<br />
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
    const [n, setN] = useState<ASTNode>(node);
    useEffect(() => {
      console.log(n)
      onChange ? onChange(n) : console.log('onChange is undefined');
    }, [n]);

    const handleChange = (e) => {
      const _n = JSON.stringify(n);
      JSON.parse(_n).value = e.target.value;
      setN(JSON.parse(_n));
    };

    return (
      <>
        <input type="text" value={n.value} onInput={handleChange}></input>
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

  const [q, setQ] = useState<string>(query);
  const [a, setA] = useState<ASTNode>(ast);

  useEffect(() => {
    console.log(query)
    onChange(q, ast);
  }, [a]);

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
      <ASTRender node={ast} onChange={(a => setA(a))}/>
    </div>
  );
}