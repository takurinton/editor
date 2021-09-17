import { useState } from 'preact/hooks'; 
import { Editor } from './Editor';
import { Preview } from './Preview';

export function App() {
  const [code, setCode] = useState('hoge');
  return (
    <div style={
      {
        display: 'flex', 
        margin: 'auto', 
        width: '80vw',
      }
    }>
      <Editor code={code} ast={code} />
      <Preview code={code} ast={code} />
    </div>
  )
}
