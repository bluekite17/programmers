#define USE_PRIORITY_QUEUE

namespace cs.Lv4;

/*
 * # 무지의 먹방 라이브
 * https://school.programmers.co.kr/learn/courses/30/lessons/42891
 * 회전판에 각 음식이 있고, 음식당 1초씩 먹고 다음 음식을 먹는 방식. 방송 시작 후 k초에 방송이 중단이 되고 재개 시 먹어야 하는 음식 번호 찾기
 *
 * 입력
 * - food_times: 음식 당 먹는 시간, 1 <= length <= 2000, 1 <= n (index+1) <= 1000
 * - k: 먹방 시작 이후로 방송이 중단되는 시간, 1 <= k <= 2x10^13
 *
 * 출력
 * 방송 재개 이후 먹어야 하는 음식 번호 n
 */
public static class Q1
{
    public record ExampleCase(int[] FoodItems, long K, int Result);

    public static readonly ExampleCase[] Examples =
    [
        new([3, 1, 2], 5, 1)
    ];
    
    public static int Solution(int[] foodTimes, long k)
    {
        var len = foodTimes.Length;
        var sum = 0;
        
        #if USE_PRIORITY_QUEUE
        var foods = new Dictionary<int, List<int>>();
        var foodsQueue = new PriorityQueue<(int time, List<int> indices), int>();
        #else
        var foods = new SortedDictionary<int, List<int>>();
        #endif
        
        for (var i = 0; i < len; ++i)
        {
            if (i == k)
            {
                return i + 1;
            }
            
            var t = foodTimes[i];
            sum += t;
            
            if (foods.TryGetValue(t, out var indices) == false)
            {
                indices = new List<int>();
                foods.Add(t, indices);
            }
            
            indices.Add(i);
        }
        
        if (sum <= k)
        {
            return -1;
        }

        #if USE_PRIORITY_QUEUE
        foreach (var kv in foods)
        {
            foodsQueue.Enqueue((kv.Key, kv.Value), kv.Key);
        }
        #endif

        var remainTime = k;
        var passFoods = len;
        var lastTime = 0;
        
        #if USE_PRIORITY_QUEUE
        #region PriorityQueue
        while (foodsQueue.Count > 0)
        {
            var t = foodsQueue.Peek().time;
            var passTime = (t - lastTime) * passFoods;

            if (remainTime <= passTime)
            {
                // 남은 음식만 번호순으로 합치기
                var targets = foodsQueue.UnorderedItems
                    .SelectMany(x => x.Element.indices)
                    .OrderBy(x => x)
                    .ToList();
                
                var answerIdx = (int)(remainTime % targets.Count);
                return targets[answerIdx] + 1;
            }

            remainTime -= passTime;
            lastTime = t;
            passFoods -= foodsQueue.Dequeue().indices.Count;
            
        }
        #endregion
        #else
        #region SortedDictionary
        foreach (var kv in foods)
        {
            var passTime = (kv.Key - lastTime) * passFoods;
            
            if (remainTime <= passTime)
            {
                // 남은 음식만 번호순으로 합치기
                var targets = foods.Where(x => x.Key > lastTime)
                    .SelectMany(x => x.Value).OrderBy(x => x).ToList();
                
                var answerIdx = (int)(remainTime % targets.Count);
                return targets[answerIdx] + 1;
            }
            
            remainTime -= passTime;
            lastTime = kv.Key;
            passFoods -= kv.Value.Count;
        }
        #endregion
        #endif
        
        return -1;
    }
}