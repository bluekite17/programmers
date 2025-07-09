#define L3_Q1
// #define L4_Q1

using Lv3Q1 = cs.Lv3.Q1;
using Lv4Q1 = cs.Lv4.Q1;

const int exampleNo = 0;

#if L3_Q1
//-------------------
// Level3 Q1.등굣길
//-------------------
#region L3_Q1
var example = Lv3Q1.Examples[exampleNo];
var result = Lv3Q1.Solution(example.M, example.N, example.Puddles);
Console.WriteLine($"{example.Result}, {result}, {result == example.Result}");
#endregion
#elif L4_Q1
//-------------------
// Level4 Q1. 무지의 먹방 라이브
//-------------------
#region L4_Q1
    var example = Lv4Q1.Examples[exampleNo];
    var result = Lv4Q1.Solution(example.FoodItems, example.K);
    Console.WriteLine($"{example.Result}, {result}, {result == example.Result}");
#endregion
#endif

//-------------------
// Level4 Q3.
//-------------------
#region L4_Q3
#if L4_Q3
#endif
#endregion