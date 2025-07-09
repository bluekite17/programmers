namespace cs.Lv4;

/*
 * # 징검다리
 * https://school.programmers.co.kr/learn/courses/30/lessons/43236
 *
 *
 * 입력
 * - distance: 출발지부터 도착지까지 거리, 1 <= n <= 1000000000
 * - rocks: 바위 위치, 1 <= length <= 50000
 * - n: 제거할 바위 수, 1 <= n <= rocks.length
 * 
 * 출력
 * 바위를 n개 만큼 제거 후 각 바위 사이의 거리의 최소값 중 가장 큰 값 
 */
public class Q2
{
    public record ExampleCase(int Distance, int[] Rocks, int N, int Result);

    public static readonly ExampleCase[] Examples =
    [
        new(25, [2, 14, 11, 21, 17], 2, 4)
    ];

    private class Path
    {
        private readonly List<int> _points;
        private readonly int _removeCount;

        public Path(int distance, int[] rocks, int n)
        {
            _removeCount = n;
            
            Array.Sort(rocks);
            _points = [..rocks, distance]; // C# 12 이상 문법이므로, programmers에서는 사용할 수 없음
            // _points = new List<int>(rocks) { distance };
        }
        
        public bool CanRemove(int min)
        {
            var prev = 0;
            var removed = 0;

            foreach (var p in _points)
            {
                if (p - prev < min) 
                {
                    ++removed;
                }
                else
                {
                    prev = p;
                }
            }

            return removed <= _removeCount;
        }
    }
    
    public static int Solution(int distance, int[] rocks, int n)
    {
        var path = new Path(distance, rocks, n);
        
        var left = 1;
        var right = distance;
        var answer = 0;

        while (left <= right)
        {
            var mid = (left + right) / 2;
            
            if (path.CanRemove(mid))
            {
                answer = mid;
                left = mid + 1;
            }
            else
            {
                right = mid - 1;
            }
        }
        return answer;
    }
}