import { useEffect, useState } from 'preact/hooks'; 
import { Editor } from './Editor';
import { Preview } from './Preview';
import { fragment } from './fragment';
import { ASTNode, parse, print } from 'graphql';

const initialQuery = `
query {
  ${print(fragment())}
}
`;

const initialAst = parse(initialQuery)

export function App() {
  const [query, setQuery] = useState<string>(initialQuery); 
  const [ast, setAst] = useState<ASTNode>(initialAst);

  useEffect(() => {
    const ast = parse(query); // DocumentNode
    setAst(ast);
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
