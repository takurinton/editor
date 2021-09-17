import { useEffect, useState } from 'preact/hooks'; 
import { Editor } from './Editor';
import { Preview } from './Preview';
import { fragment } from './fragment';
import { parse, print } from 'graphql';

const initialQuery = `
query {
  user: user_variables(
    q: { key: "value" }
    l: ["list1", "liat2"]
  ) {
    hoge
  }
}
`;

export function App() {
  const [query, setQuery] = useState(initialQuery); 
  const [code, setCode] = useState('hoge');

  const f = fragment();
  useEffect(() => {
    const p = parse(query); // DocumentNode
    console.log(p) 
  }, [query]);

  // const c = print()
  console.log(f)
  return (
    <div style={
      {
        display: 'flex', 
        margin: 'auto', 
        width: '80vw',
      }
    }>
      <Editor code={query} ast={code} />
      <Preview code={code} ast={code} />
    </div>
  )
}
