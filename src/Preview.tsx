import { DocumentNode } from "graphql";

export const Preview = (
  { 
    query, 
    ast 
  }: { 
    query: string, 
    ast: DocumentNode, 
    onChange: (query: string, ast: DocumentNode) => void
}) => {
  return (
    <div style={
      {
        width: '100%', 
        background: 'red', 
      }
    }>
      { query }
    </div>
  );
}