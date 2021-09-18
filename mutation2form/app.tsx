import { fragment } from '../src/fragment';
import { parse, print } from 'graphql';

const initialQuery = `
query {
  ${print(fragment())}
}
`;

const initialAst = parse(initialQuery)

export function App() {

  return (
    <div>
      <pre>
        <code>
          { initialQuery }
        </code>
      </pre>
    </div>
  )
}
