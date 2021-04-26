export const PADDING = 4;

export class StringifiedFunction {
  constructor(private functionString: string) {}

  format(): StringifiedFunction {
    return this.removePaddings().insertPaddings(PADDING);
  }

  removePaddings(): StringifiedFunction {
    const lines = this.functionString.split("\n");
    return new StringifiedFunction(lines.map((line) => line.trim()).join("\n"));
  }

  insertPaddings(padding: number): StringifiedFunction {
    const lines = this.functionString.split("\n");
    let linePadding = padding;
    return new StringifiedFunction(
      lines
        .map((line) => {
          const paddedString = `${"".padStart(linePadding)}${line}`;
          if (line.includes("{")) linePadding *= 2;
          if (line.includes("}")) linePadding = Math.floor(linePadding / 2);
          return paddedString;
        })
        .join("\n")
    );
  }

  toString(): string {
    return this.functionString;
  }
}
