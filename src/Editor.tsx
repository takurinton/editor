import { ASTNode, DocumentNode, DefinitionNode, print, ArgumentNode, SelectionNode } from "graphql"
import { useEffect, useState } from "preact/hooks"
import { NodeContextProvider, useNodeContext } from './context';

const onChangeArgments = ({
  _node,
  node,
  currentTarget, 
}: {
  _node: DocumentNode;
  node: ArgumentNode;
  currentTarget: HTMLInputElement
}) => {
  _node.definitions.map(v => {
    if (v.kind === 'OperationDefinition') {
      v.selectionSet.selections.map(vv => {
        // @ts-ignore
        vv.arguments.map(vvv => {
          if (vvv.name.value === node.name.value) {
            vvv.value.value = currentTarget.value;
          };
        });
      });
    }
  });
}

const onChangeSelections = (selections: SelectionNode[]) => {

}

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
    console.log(node)
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
    const [selections, setSelections] = useState(node.selectionSet?.selections);

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
        {node.selectionSet?.selections.map(v => {
          return <p>{v.name.value}</p>
        })}
        <form onSubmit={e => {
          e.preventDefault();
          // ここ selectionSet の Field 入れないとダメだ、文字列でもいいんだけどどこかで組み立てる必要がある
          setSelections([...selections, ])
        }}>
          <input type="text" onInput={e => console.log(e.currentTarget.value)} value={''} />
          <button type="submit">add field</button>
        </form>
      </>
    )
  };

  if (node.kind === 'Argument') {
    if (node.value.kind === 'StringValue') {
      const handleChange = ({ currentTarget }: JSX.TargetedEvent<HTMLInputElement, Event>) => {
        const _node = context.getNode() as DocumentNode;
        onChangeArgments({ _node, node, currentTarget });
        context.updateNode(node, _node);
      };

      return (
        <>
          <ASTRender node={node.name} /> { ':' } <input type="text" value={node.value.value} onInput={handleChange}></input> { ', ' } <br />
        </>
      );
    }
    
    if (node.value.kind === 'IntValue') {
      const handleChange = ({ currentTarget }: JSX.TargetedEvent<HTMLInputElement, Event>) => {
        const _node = context.getNode() as DocumentNode;
        onChangeArgments({ _node, node, currentTarget });
        context.updateNode(node, _node);
      };

      return (
        <>
          <ASTRender node={node.name} /> { ':' } <input type="number" value={node.value.value} onInput={handleChange}></input> { ', ' } <br />
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

  return (
    <h1>知らんプロパティ</h1>
  );
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