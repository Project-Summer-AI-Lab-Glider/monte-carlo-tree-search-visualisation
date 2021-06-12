import { TransitionProps } from "@material-ui/core/transitions/transition";
import { TreeNode } from "../../logic/treeBuilder/treeNode";
import { useSpring, animated } from "react-spring";
import Collapse from "@material-ui/core/Collapse";
import TreeItem, { TreeItemProps } from "@material-ui/lab/TreeItem";
import TreeView from "@material-ui/lab/TreeView";
import { CollapseIcon, EndIcon, ExpandIcon } from "./styled";

function TransitionComponent(props: TransitionProps): JSX.Element {
  const style = useSpring({
    from: { opacity: 0, transform: "translate3d(20px,0,0)" },
    to: { opacity: props.in ? 1 : 0, transform: `translate3d(${props.in ? 0 : 20}px,0,0)` },
  });

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  );
}

interface RenderNodeProps {
  treeNode: TreeNode;
}
function RenderTreeNode({ treeNode }: RenderNodeProps): JSX.Element {
  const treeItemProps: TreeItemProps = {
    nodeId: treeNode.id,
    label: `Node: ${treeNode.id} ${
      treeNode.reward !== undefined ? `Reward: ${treeNode.reward}` : ""
    }`,
  };
  return (
    <TreeItem {...treeItemProps} TransitionComponent={TransitionComponent}>
      {treeNode.children.map((child) => (
        <RenderTreeNode treeNode={child} />
      ))}
    </TreeItem>
  );
}

interface RenderTreeProps {
  treeRoot: TreeNode;
}

export function RenderTree({ treeRoot }: RenderTreeProps): JSX.Element {
  return (
    <TreeView
      defaultEndIcon={<EndIcon />}
      defaultCollapseIcon={<CollapseIcon />}
      defaultExpandIcon={<ExpandIcon />}
    >
      <RenderTreeNode treeNode={treeRoot} />
    </TreeView>
  );
}
