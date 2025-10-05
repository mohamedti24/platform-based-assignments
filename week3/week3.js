// 🟢 Easy Level (Loops & Basic Logic)

// 1. Print Numbers 1–10
console.log("1. Print Numbers 1–10");
for (let i = 1; i <= 10; i++) {
  console.log(i);
}

// 2. Even or Odd Checker
console.log("\n2. Even or Odd Checker");
let num = 7; // try changing this number
if (num % 2 === 0) {
  console.log(num + " is Even");
} else {
  console.log(num + " is Odd");
}

// 3. Simple Calculator (Addition)
console.log("\n3. Simple Calculator (Addition)");
let a = 8;
let b = 12;
let sum = a + b;
console.log("Sum =", sum);


// 🟡 Medium Level (Branching & Arrays)

// 4. Grade Checker
console.log("\n4. Grade Checker");
let score = 85; // try changing this value
if (score >= 90 && score <= 100) {
  console.log("Grade: A");
} else if (score >= 80 && score < 90) {
  console.log("Grade: B");
} else if (score >= 70 && score < 80) {
  console.log("Grade: C");
} else {
  console.log("Grade: Fail");
}

// 5. Multiplication Table Generator
console.log("\n5. Multiplication Table");
let number = 5;
for (let i = 1; i <= 10; i++) {
  console.log(number + " x " + i + " = " + (number * i));
}

// 6. Array of Fruits
console.log("\n6. Array of Fruits");
let fruits = ["Apple", "Banana", "Orange", "Mango", "Grapes"];
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}


// 🔵 Advanced Level (Loop + Array + Logic)

// 7. Find the Largest Number
console.log("\n7. Find the Largest Number");
let numbers = [12, 5, 20, 25, 7];
let largest = numbers[0];
for (let i = 1; i < numbers.length; i++) {
  if (numbers[i] > largest) {
    largest = numbers[i];
  }
}
console.log("Largest number is:", largest);

// 8. Reverse a String
console.log("\n8. Reverse a String");
let word = "Hello";
let reversed = "";
for (let i = word.length - 1; i >= 0; i--) {
  reversed = reversed + word[i];
}
console.log("Original:", word);
console.log("Reversed:", reversed);

// 9. Prime Number Checker
console.log("\n9. Prime Number Checker");
let checkNum = 17;
let isPrime = true;
if (checkNum <= 1) {
  isPrime = false;
} else {
  for (let i = 2; i < checkNum; i++) {
    if (checkNum % i === 0) {
      isPrime = false;
      break;
    }
  }
}
if (isPrime) {
  console.log(checkNum + " is a Prime number");
} else {
  console.log(checkNum + " is NOT a Prime number");
}

// 10. Array Filtering (Adults Only)
console.log("\n10. Array Filtering (Adults Only)");
let ages = [12, 18, 25, 30, 15];
let adults = [];
for (let i = 0; i < ages.length; i++) {
  if (ages[i] >= 18) {
    adults.push(ages[i]);
  }
}
console.log("Adults (18+):", adults);
