
## 1) What is the difference between var, let, and const?
ans:
the difference between var, let, and const-
### var: Old version of variable.
 var is scoped to functions, not blocks
 It's can be redeclared and reassigned
 Hoisted to the top with 'undefined' value.
### let: es6 new version variable.
let is block scoped. it can be reassigned but not redeclared.
It can be hoisted, but stays in the Temporal Dead Zone (TDZ)
### const: es6 new version variable.
const is block scoped. it can't be reassigned or redeclared.
It can be hoisted, but stays in the Temporal Dead Zone (TDZ).


## 2) What is the difference between map(), forEach(), and filter()? 
ans:
map(), forEach(), and filter() this all are array method. 
forEach()- It's can be loop through each element and perform
an action, don't return new array.
map()-It's can be loop through each element and perform
an action, it return new transformed array .
filter()-it's filter an element from the array based on condition. 
## 3) What are arrow functions in ES6?
ans: arrow functions in es6 are-
ex:
const arr=()=>{};
const arr=x=>x++; 
we don't need to write "function" key word. it is easy to write.


## 4) How does destructuring assignment work in ES6?
ans:
const [a, b, c, d] = [10, 20, 30, 40];
console.log(a, b, c); // 10 20 30 40

## 5) Explain template literals in ES6. How are they different from string concatenation?
ans:
template literals is a new way to writing string with (``) back-ticks.
ex: let name = "sachin"; //Normal way
let great=`hello ${name}`; //using template literals
console.log(great);// hello sachin
For string concatenation we need to use (+), but in template literals we don't need (+);

