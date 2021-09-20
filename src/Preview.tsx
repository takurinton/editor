import { ASTNode } from "graphql";

export const Preview = (
  { 
    query, 
    ast 
  }: { 
    query: string, 
    ast: ASTNode, 
    // onChange: (query: string, ast: ASTNode) => void
}) => {
  return (
    <div style={
      {
        width: '100%', 
        textAlign: 'left', 
        paddingLeft: '50px'
      }
    }>
      <pre style={{ background: '#FFFFF0' }}>
        <code>
            {query}
        </code>
      </pre>
    </div>
  );
}