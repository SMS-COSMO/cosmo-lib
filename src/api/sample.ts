// 示例api函数
export function sampleApi(name: string): string {
  return `Hello, ${name}! Welcome to COSMO!`;
}

// 实现函数重载, 其中的类型体操不用管太多, 重点看函数部分实现
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFn = (...args: any[]) => any;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type JsRuntimeType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'bigint'
  | 'symbol'
  | 'undefined'
  | 'function'
  | 'object';

type RuntimeTypeOf<T> =
  T extends string ? 'string'
  : T extends number ? 'number'
  : T extends boolean ? 'boolean'
  : T extends bigint ? 'bigint'
  : T extends symbol ? 'symbol'
  : T extends undefined ? 'undefined'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  : T extends (...args: any[]) => any ? 'function'
  : 'object';

type RuntimeTypeTuple<Args extends readonly unknown[]> = {
  [K in keyof Args]: RuntimeTypeOf<Args[K]>;
};

type UnionToIntersection<U> =
  (U extends unknown ? (value: U) => void : never) extends ((value: infer I) => void)
    ? I
    : never;

type OverloadCall<T extends AnyFn> = [T] extends [never]
  ? (...args: unknown[]) => unknown
  : UnionToIntersection<T>;

export type Overlord<T extends AnyFn = never> = OverloadCall<T> & {
  register<Args extends unknown[], R>(
    runtimeTypes: [...RuntimeTypeTuple<Args>],
    fn: (...args: Args) => R,
  ): Overlord<T | ((...args: Args) => R)>;
};

/**
 *  使用函数重载, 通过register方法注册不同参数类型的函数实现, 最终返回一个根据参数类型调用对应函数的overlord函数
 *  示例: const fn = createOverlord().register(['string', 'number'], (a: string, b: number) => `${a} ${b}`)
 *  fn('Hello', 42) // 'Hello 42'
 *  支持类型推断
 * @returns
 */
export function createOverlord<T extends AnyFn = never>(): Overlord<T> {
  const fnMap = new Map<string, AnyFn>();

  const overlord = ((...args: unknown[]) => {
    const key = args.map(it => typeof it).join(',');
    const fn = fnMap.get(key);
    if (!fn) {
      throw TypeError(`No function registered for argument types: ${key}`);
    }
    return fn(...args);
  }) as Overlord<T>;

  overlord.register = <Args extends unknown[], R>(
    runtimeTypes: [...RuntimeTypeTuple<Args>],
    fn: (...args: Args) => R,
  ) => {
    fnMap.set(runtimeTypes.join(','), fn as AnyFn);
    return overlord as unknown as Overlord<T | ((...args: Args) => R)>;
  };

  return overlord;
}
