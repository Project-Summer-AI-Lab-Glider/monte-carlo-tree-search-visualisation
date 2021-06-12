export class TreeNode {
  constructor(public children: TreeNode[] = [], public id: string, public reward?: number) {}

  findRandomChild(): TreeNode {
    return this.children[Math.floor(Math.random() * this.children.length)];
  }
}
