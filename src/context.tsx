import { ASTNode, DocumentNode, FieldNode, print, SelectionSetNode } from 'graphql';
import { createContext, JSX } from 'preact';
import { useContext } from 'preact/hooks';

type NodeContextType = {
  updateNode(node: ASTNode, newNode: ASTNode): void;
  debug(): void;
  getNode(): ASTNode;
};

const NodeContext = createContext<NodeContextType>(null as any);

export function useNodeContext() {
  return useContext(NodeContext);
}

export function NodeContextProvider({
  children,
  root,
  onChangeNode,
}: {
  children: JSX.Element;
  root: ASTNode;
  onChangeNode: (root: ASTNode) => void;
}) {
  const api: NodeContextType = {
    updateNode(node, newNode) {
      console.log('query: ', print(newNode))
      console.log('ast: ', newNode)
      onChangeNode(newNode)
      return;
    },
    debug() {
      console.log(root);
    },
    getNode() {
      return root;
    }
  };
  return <NodeContext.Provider value={api} children={children}></NodeContext.Provider>;
}
