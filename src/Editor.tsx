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
    onChange(q, ast);
    // console.log(query);
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
      <textarea name="query" id="" cols="30" rows="10" value={q} onChange={onChangeQuery}></textarea>
    </div>
  );
}