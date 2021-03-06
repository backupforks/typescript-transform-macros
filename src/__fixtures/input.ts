declare function MACRO<T>(t: T): T;

const FOR_EACH = MACRO(
  <T>(
    inputConst: T[],
    visitor: (value: T, index?: number, input?: T[]) => void
  ) => {
    const input = inputConst;
    const length = input.length;
    for (let i = 0; i < length; i++) {
      visitor(input[i], i, input);
    }
  }
);

const FILTER = MACRO(
  <T>(
    inputConst: T[],
    visitor: (value: T, index?: number, input?: T[]) => boolean
  ) => {
    const input = inputConst;
    const length = input.length;
    const result = [];
    for (let i = 0; i < length; i++) {
      if (visitor(input[i], i, input)) result.push(input[i]);
    }
    return result;
  }
);

const MAP = MACRO(
  <T, L>(
    inputConst: T[],
    visitor: (value: T, index?: number, input?: T[]) => L
  ) => {
    const input = inputConst;
    const length = input.length;
    const result = new Array(length) as L[];
    for (let i = 0; i < length; i++) {
      result[i] = visitor(input[i], i, input);
    }
    return result;
  }
);

declare interface Array<T> {
  FOR_EACH: Array<T>["forEach"];
  MAP: Array<T>["map"];
  FILTER: Array<T>["filter"];
}

[1, 2, 3, 4]
  .FILTER(n => n % 2 === 0)
  .MAP(n => n + 1)
  .MAP(n => n.toString())
  .FOR_EACH(n => console.log(n));
