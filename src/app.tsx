import { useEffect, useState } from 'preact/hooks'; 
import { Editor } from './Editor';
import { Preview } from './Preview';
import { fragment } from './fragment';
import { parse, print } from 'graphql';

const initialQuery = `
query {
  data: hoge (
    q: { key: "value" }
    l: ["list1", "list2"]
  ) {
    hoge
  }
}
`;

const initialAst = parse(initialQuery)

export function App() {
  const [query, setQuery] = useState(initialQuery); 
  const [ast, setAst] = useState(initialAst);

  // const f = fragment();
  // useEffect(() => {
  //   setQuery(query);
  // }, [query]);

  useEffect(() => {
    const ast = parse(query); // DocumentNode
    setAst(ast);
    console.log(ast)
  }, []);

  return (
    <div style={
      {
        display: 'flex', 
        margin: 'auto', 
        width: '80vw',
      }
    }>
      <Editor 
        query={query} 
        ast={ast} 
        onChange={
          (query, ast) => {
            setQuery(query);
            setAst(ast);
          }
        }
        />
      <Preview 
        query={query} 
        ast={ast} 
        onChange={
          (query, ast) => {
            setQuery(query);
            setAst(ast);
          }
        }
      />
    </div>
  )
}
