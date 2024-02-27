import type { TypeCheck } from '../src';

// Hover over `Errors1` to see what's wrong with this input
type Errors1 = TypeCheck<`

// Define a constant
const a = 5;

// Can it be changed?
a = 3;

`>;

// Hover over `Errors2` to see what's wrong with this input
type Errors2 = TypeCheck<`

// Define a let variable
let b = "hello";

// Can it be changed?
b = "world";

// What about changing its type?
b = true;

`>;

// Hover over `Errors3` to see what's wrong with this input
type Errors3 = TypeCheck<`

// Now with type annotations
let c: number = true;

`>;

// Hover over `Errors4` to see what's wrong with this input
type Errors4 = TypeCheck<`

// Even local references
if (true) {
  let a = 5;

  // This works
  console.log(a);
}

// This doesn't :(
console.log(a);

`>;
