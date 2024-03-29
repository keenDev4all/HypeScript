import type { TypeCheck } from '../src';
import { expectType } from './TestUtils';

expectType<
  TypeCheck<`

function foo() {}

`>
>([]);

expectType<
  TypeCheck<`

function foo(a, b) {}

`>
>([
  "3: Parameter 'a' implicitly has an 'any' type.",
  "3: Parameter 'b' implicitly has an 'any' type.",
]);

expectType<
  TypeCheck<`

function foo(a: number, b: string) {}

`>
>([]);

expectType<
  TypeCheck<`

function foo(a: number, b: string) {
  return 5;
}

foo(1);

`>
>(['7: Expected 2 arguments, but got 1.']);

expectType<
  TypeCheck<`

function foo(a: number, b: string) {
  return a;
}

`>
>([]);

expectType<
  TypeCheck<`

function foo(a: number, b: string) {
  return oops;
}

`>
>(["4: Cannot find name 'oops'."]);

expectType<
  TypeCheck<`

function foo(a: number, b: string) {
  return 5;
}

foo(1, 'a');

`>
>([]);

expectType<
  TypeCheck<`

function foo(a: number, b: string) {
  return 5;
}

foo(true, 'a');

`>
>([
  "7: Argument of type 'boolean' is not assignable to parameter of type 'number'.",
]);

expectType<
  TypeCheck<`

function foo(a: number, b: string) {
  if (a) {
    return b
  }

  return 5;
}

const result: number = foo(1, 'a');

`>
>(["11: Type 'string | number' is not assignable to type 'number'."]);

expectType<
  TypeCheck<`

"foo"();

`>
>([
  "3: This expression is not callable. Type 'string' has no call signatures.",
]);

expectType<
  TypeCheck<`

foo();

`>
>(["3: Cannot find name 'foo'."]);

expectType<
  TypeCheck<`

function foo() {
  return 1;
}

const a: number = foo;

`>
>(["7: Type '() => number' is not assignable to type 'number'."]);
