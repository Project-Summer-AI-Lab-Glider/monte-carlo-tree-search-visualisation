import { Node } from "./Node";

function maxValue(arr: number[]) {
  let max = arr[0];

  arr.forEach((val) => {
    if (val > max) {
      max = val;
    }
    return null;
  });
  return max;
}

export class SimpleGraph {
  adjacencyList: Node[];

  constructor() {
    this.adjacencyList = [];
  }

  addNode(node: Node): SimpleGraph {
    if (this.adjacencyList.find((n) => n.id === node.id)) {
      return this;
    }
    this.adjacencyList.push(node);
    return this;
  }

  addEdge(fromNode: Node, toNode: Node): SimpleGraph {
    if (this.adjacencyList.indexOf(fromNode) !== -1 && this.adjacencyList.indexOf(toNode) !== -1) {
      fromNode.children.push(toNode);
      toNode.parent = fromNode;
      return this;
    }
    return this;
  }

  updateChildrenHeight(n: Node): void {
    n.children.forEach((child) => {
      child.height = n.height + 1;
      this.updateChildrenHeight(child);
    });
  }

  dfsCountDepth(rootId: string): number {
    let result = 0;
    const visited: { [id: string]: boolean } = {};
    const root = this.adjacencyList.find((n) => n.id === rootId);
    if (root !== undefined) {
      result = this.dfsUtil(root, visited).depth;
    }
    root!.height = 0;
    this.updateChildrenHeight(root!);
    return result;
  }

  dfsUtil(
    node: Node,
    visited: { [id: string]: boolean }
  ): { depth: number; visited: { [id: string]: boolean } } {
    const res: { depth: number; visited: { [id: string]: boolean } } = { depth: -1, visited };
    const childrenDepth: { [id: string]: number } = {};
    node.children.forEach((child) => {
      childrenDepth[child.id] = 0;
      return null;
    });
    res.visited[node.id] = true;
    node.children.forEach((child) => {
      if (!visited[child.id]) {
        childrenDepth[child.id] = this.dfsUtil(child, res.visited).depth;
      }
      return null;
    });
    res.depth = maxValue(Object.keys(childrenDepth).map((key) => childrenDepth[key])) + 1;
    if (Number.isNaN(res.depth)) {
      res.depth = 0;
    }
    node.height = res.depth;
    return res;
  }

  findNodeById(id: string): Node | undefined {
    return this.adjacencyList.find((n) => n.id === id);
  }
}
