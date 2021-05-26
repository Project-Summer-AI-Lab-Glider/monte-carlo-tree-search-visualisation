export class Node {
  id: string;

  children: Node[];

  height: number;

  parent: Node | undefined = undefined;

  x = -1;

  y = -1;

  constructor(id: string) {
    this.id = id;
    this.children = [];
    this.height = -1;
  }

  getChildIndex(child: Node): number {
    return this.children.findIndex((n: Node) => n === child);
  }
}
