### create variables

```js
var number = 1;
var decimal = 16.8;
var lastname = "homhuan";

var object = {
  firstName: "sakda",
  lastName: "homhuan",
};
```

### การใช้ operator

```js
var x = 5;
var y = 2;
var z = x + y;

console.log(z);
```

### การเขียน function

```js
function showMessage() {
  var userName = "sakda";
  console.log(userName);
}

// เรียกใช้ function
showMessage();

// return function
function add() {
  return 1 + 2;
}

var addData = add();
console.log(addData);

// parameter function
function plusOne(a) {
  return a + 1;
}

var a = plusOne(5);
console.log(a);

// arrow function
let b = (a) => {
  return a + 2;
};
let c = b(5);
console.log(c);
```

### การใช้ if

```js
let d = 5 + 4;

if (d < 7) {
  console.log("d < 7");
} else if (d == 8) {
  console.log("d == 8");
} else {
  console.log("d > 8");
}
```

### การใช้ loop

#### while loop

```js
var e = 0;
while (e <= 5) {
  console.log(e);
  e++;
}
```

#### for loop

```js
for (var f = 0; f <= 5; f += 1) {
  console.log(f);
}
```

### การสร้าง object

```js
var user = new Object();
let k = {};
console.log(typeof user, typeof k);
```

#### properties

```js
user = {
  firstName: "sakda",
  lastName: "homhuan",
};
console.log(user.firstName);
```

#### method

```js
user["sayHi"] = function () {
  return "hello";
};
console.log(user.sayHi());
```
