import { createOverlord } from "./sample";
import { it, describe, expect } from "vitest";

describe('createOverlord', () => {
  it('should call the correct function based on argument types', () => {
    const overlord = createOverlord()
      .register(['string', 'number'], (a: string, b: number) => `${a} ${b}`)
      .register(['number', 'number'], (a: number, b: number) => a + b)
      .register(['string', 'string'], (a: string, b: string) => a + b);

    expect(overlord('Hello', 42)).toBe('Hello 42');
    expect(overlord(10, 20)).toBe(30);
    expect(overlord('Foo', 'Bar')).toBe('FooBar');
  })
})
