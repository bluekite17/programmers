#define USE_DP

namespace cs.Lv3;

/*
 * # 등굣길
 * https://school.programmers.co.kr/learn/courses/30/lessons/42898
 * 웅덩이를 피해 집에서 학교까지 가는 최단 경로의 개수 구하기. 이동 방향은 집에서 오른쪽과 아래로만 가능
 *
 * 입력
 * - m, n: 1 <= m, n <= 100, m == 1 && n == 1 인 케이스는 없음
 * - puddles: 웅덩이 위치, 0 <= length <= 10, [1, 1], [m, n]은 들어오지 않음
 * 
 * 출력
 * 최단 경로를 1000000007로 나눈 나머지
 */
public static class Q1
{
    // ReSharper disable once InconsistentNaming
    private const int MOD = 1000000007;

    public record ExampleCase(int M, int N, int[][] Puddles, int Result);

    public static readonly ExampleCase[] Examples =
    [
        new(4, 3, [[2, 2]], 4)
    ];

    private class Tile(int x, int y, bool isPuddle)
    {
        private int X { get; } = x;
        private int Y { get; } = y;
        private bool IsPuddle { get; } = isPuddle;
        private readonly List<Tile> _nextTiles = []; // 0 <= len <= 2 (우측, 하단)

        private int _dp = -1;

        public void SetNext(Tile tile) => _nextTiles.Add(tile);
        
        private bool IsTarget(int x, int y) => X == x && Y == y;
        
        public int CountPaths(int x, int y)
        {
            // Console.WriteLine($"Checking tile {x}, {y}");
            
            if (IsPuddle)
            {
                return 0;
            }

            if (IsTarget(x, y))
            {
                return 1;
            }

            if (_dp >= 0)
            {
                return _dp;
            }

            return _dp = _nextTiles.Sum(next => next.CountPaths(x, y)) % MOD;
        }
    }

    public static int Solution(int m, int n, int[][] puddles)
    {
        var isPuddle = new bool[m, n];
        foreach (var p in puddles)
        {
            isPuddle[p[0]-1, p[1]-1] = true;
        }
        
        #if USE_DP
        var dp = new int[m, n];
        dp[0, 0] = 1;

        for (var i = 0; i < m; ++i)
        {
            for (var j = 0; j < n; ++j)
            {
                if (isPuddle[i, j])
                {
                    continue;
                }

                if (i > 0)
                {
                    dp[i, j] += dp[i - 1, j];
                }

                if (j > 0)
                {
                    dp[i, j] += dp[i, j - 1];
                }

                dp[i, j] %= MOD;
            }
        }

        return dp[m-1, n-1] % MOD;
        #else
        var tiles = new Tile[m, n];
        for (var i = 0; i < m; ++i)
        {
            for (var j = 0; j < n; ++j)
            {
                var tile = new Tile(i, j, isPuddle[i, j]);
                tiles[i,j] = tile;
                
                if (i > 0)
                {
                    tiles[i - 1 ,j].SetNext(tile);
                }

                if (j > 0)
                {
                    tiles[i, j - 1].SetNext(tile);
                }
            }
        }

        return tiles[0, 0].CountPaths(m - 1, n - 1) % MOD;
        #endif
    }
}