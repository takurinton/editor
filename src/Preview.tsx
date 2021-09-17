export const Preview = ({ code, ast }: { code: string, ast: any }) => {
  return (
    <div style={
      {
        width: '100%', 
        background: 'red', 
      }
    }>
      { code }
    </div>
  );
}