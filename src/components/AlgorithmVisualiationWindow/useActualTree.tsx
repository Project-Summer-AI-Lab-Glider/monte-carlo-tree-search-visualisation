import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TreeBuilder } from "../../logic/treeBuilder/treeBuilder";
import { TreeNode } from "../../logic/treeBuilder/treeNode";
import { ApplicationState } from "../../state/appReducer";

export function useActualTree(): TreeNode | undefined {
  const lastRunParams = useSelector((state: ApplicationState) => state.lastRunParams);
  const [lastBuiltTree, setLastBuiltTree] = useState<TreeNode>();
  useEffect(() => {
    setLastBuiltTree(TreeBuilder.build(lastRunParams));
  }, [lastRunParams]);
  return lastBuiltTree;
}
