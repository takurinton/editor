import { DocumentNode } from "graphql"

export const Editor = (
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
        background: 'gray', 
      }
    }>
      { query }
    </div>
  )
}