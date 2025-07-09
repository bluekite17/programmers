// #define L3_Q1
// #define L4_Q1
#define L4_Q2

#if L3_Q1
//-------------------
// Level3 Q1.등굣길
//-------------------
#region L3_Q1
    foreach (var example in cs.Lv3.Q1.Examples)
    {
        var result = cs.Lv3.Q1.Solution(example.M, example.N, example.Puddles);
        Console.WriteLine($"{example.Result}, {result}, {result == example.Result}");
    }
#endregion
#elif L4_Q1
//-------------------
// Level4 Q1. 무지의 먹방 라이브
//-------------------
#region L4_Q1
    foreach (var example in cs.Lv4.Q1.Examples)
    {
        var result = cs.Lv4.Q1.Solution(example.FoodItems, example.K);
        Console.WriteLine($"{example.Result}, {result}, {result == example.Result}");
    }
#endregion
#elif L4_Q2
//-------------------
// Level4 Q2. 징검다리
//-------------------
#region L4_Q2
    foreach (var example in cs.Lv4.Q2.Examples)
    {
        var result = cs.Lv4.Q2.Solution(example.Distance, example.Rocks, example.N);
        Console.WriteLine($"{example.Result}, {result}, {result == example.Result}");
    }
#endregion
#endif