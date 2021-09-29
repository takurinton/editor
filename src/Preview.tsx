import { ASTNode, parse } from "graphql";
import { useState } from "preact/hooks";
import { NodeContextProvider } from "./context";

export const Preview = (
  { 
    query, 
    ast, 
    onChange
  }: { 
    query: string, 
    ast: ASTNode, 
    // onChange: (query: string, ast: ASTNode) => void
}) => {
  const [q, setQ] = useState<string>(query);
  const [a, setA] = useState<ASTNode>(ast)

  const onChangeQuery = ({ currentTarget }: JSX.TargetedEvent<HTMLInputElement, Event>) => {
    setQ(currentTarget.value);
    const _a = parse(q)
    setA(_a)
    onChange(q, _a);
  };

  return (
    <div style={
      {
        width: '100%', 
        textAlign: 'left', 
        paddingLeft: '50px'
      }
    }>
      {/* query から form をいじるやつやりたい */}
      <NodeContextProvider
      root={ast}
      onChangeNode={newDocument => {
        const astnode = newDocument as ASTNode;
      }}
      >
        <pre style={{ background: '#FFFFF0' }}>
          <textarea rows="30" value={q} onInput={onChangeQuery}>
              {query}
          </textarea>
        </pre>
      </NodeContextProvider>
    </div>
  );
}