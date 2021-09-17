import { DocumentNode } from "graphql"
import { useEffect, useState } from "preact/hooks"

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

  useEffect(() => {
    console.log(query)
    onChange(q, ast);
  }, [q]);

  const onChangeQuery = (e) => {
    console.log(e.target.value);
    setQ(e.target.value);
  }

  return (
    <div style={
      {
        width: '100%', 
        background: 'gray', 
      }
    }>
      <textarea name="query" id="query" cols="30" rows="10" value={q} onInput={onChangeQuery}></textarea>
    </div>
  );
}