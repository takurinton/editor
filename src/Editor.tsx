export const Editor = ({ code, ast }: { code: string, ast: any }) => {
  return (
    <div style={
      {
        width: '100%', 
        background: 'gray', 
      }
    }>
      { code }
    </div>
  )
}