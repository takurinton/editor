import { ArgumentNode, ASTNode, DocumentNode } from "graphql";
import { useNodeContext } from "../context";

export const InputText = ({
  node,
}: {
  // args しか編集できないという前提で ArgumentNode
  node: ArgumentNode;
}) => {
  const context = useNodeContext();
  const handleChange = ({ currentTarget }: JSX.TargetedEvent<HTMLInputElement, Event>) => {
    const _node = context.getNode() as DocumentNode;
    _node.definitions.map(v => {
      if (v.kind === 'OperationDefinition') {
        v.selectionSet.selections.map(vv => {
          // @ts-ignore
          vv.arguments.map(vvv => {
            if (vvv.name.value === node.name.value) {
              vvv.value.value = currentTarget.value;
            };
          });
        });
      }
    });
    context.updateNode(node, _node);
  };
  return (
    <input type="text" value={node.name.value} onInput={handleChange}></input>
  );
}