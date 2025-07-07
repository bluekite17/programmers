// import  { solution, example } from "./src/lv1/q1.js";
// import  { solution, example } from "./src/lv1/q2.js";
// import  { solution, example } from "./src/lv1/q3.js";

// import  { solution, example } from "./src/lv2/q1.js";
// import  { solution, example } from "./src/lv2/q2.js";
// import  { solution, example } from "./src/lv2/q3.js";

import  { solution, example } from "./src/lv3/q1.js";
// import  { solution, example } from "./src/lv3/q2.js";
// import  { solution, example } from "./src/lv3/q3.js";

let num = 1;
let result = solution(example[num][0], example[num][1]);

console.log(result, example[num][2], JSON.stringify(example[num][2]) === JSON.stringify(result));
