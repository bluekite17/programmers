// #define L3_Q1
// #define L4_Q1
#define L4_Q2

const int exampleNo = 0;

#if L3_Q1
//-------------------
// Level3 Q1.등굣길
//-------------------
#region L3_Q1
var example = cs.Lv3.Q1.Examples[exampleNo];
var result = cs.Lv3.Q1.Solution(example.M, example.N, example.Puddles);
Console.WriteLine($"{example.Result}, {result}, {result == example.Result}");
#endregion
#elif L4_Q1
//-------------------
// Level4 Q1. 무지의 먹방 라이브
//-------------------
#region L4_Q1
    var example = cs.Lv4.Q1.Examples[exampleNo];
    var result = cs.Lv4.Q1.Solution(example.FoodItems, example.K);
    Console.WriteLine($"{example.Result}, {result}, {result == example.Result}");
#endregion
#elif L4_Q2
//-------------------
// Level4 Q2. 징검다리
//-------------------
#region L4_Q2
var example = cs.Lv4.Q2.Examples[exampleNo];
var result = cs.Lv4.Q2.Solution(example.Distance, example.Rocks, example.N);
Console.WriteLine($"{example.Result}, {result}, {result == example.Result}");
#endregion
#endif