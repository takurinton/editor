import { ASTNode, DocumentNode, FieldNode, print, SelectionSetNode } from 'graphql';
import { visit } from 'graphql';
import { createContext, JSX } from 'preact';
import { useContext } from 'preact/hooks';

type NodeContextType = {
  // addField(parent: SelectionSetNode, node: FieldNode): void;
  updateNode(node: ASTNode, newNode: ASTNode): void;
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
  root: DocumentNode;
  onChangeNode: (root: DocumentNode) => void;
}) {
  const api: NodeContextType = {
    // addField(parent: SelectionSetNode, createdNode: FieldNode) {
    //   const newNode = visit(root, {
    //     SelectionSet: c => {
    //       if (c === parent) {
    //         return {
    //           ...parent,
    //           selections: [...parent.selections, createdNode],
    //         };
    //       }
    //     },
    //   });
    //   const code = print(newNode);
    //   onChangeNode(newNode);
    //   return;
    // },
    updateNode(node, newNode) {
      console.log(node)
      console.log(newNode)
      return;
    },
  };
  return <NodeContext.Provider value={api} children={children}></NodeContext.Provider>;
}