package lv3;

import java.util.*;

public class Q1
{
    private static final int MOD = 1000000007;

    public enum SolveMethod
    {
        OOP,
        DP
    }

    public record ExampleCase(int m, int n, int[][] puddles, int result) {}

    public static final ExampleCase[] EXAMPLES =
    {
        new ExampleCase(4, 3, new int[][] { {2, 2} }, 4)
    };

    private static class Tile
    {
        private final int x;
        private final int y;
        private final boolean isPuddle;
        private final List<Tile> nextTiles = new ArrayList<>();
        private int dp = -1;

        public Tile(int x, int y, boolean isPuddle)
        {
            this.x = x;
            this.y = y;
            this.isPuddle = isPuddle;
        }

        public void setNext(Tile tile)
        {
            nextTiles.add(tile);
        }

        private boolean isTarget(int x, int y)
        {
            return this.x == x && this.y == y;
        }

        public int countPaths(int x, int y)
        {
            if (isPuddle)
            {
                return 0;
            }

            if (isTarget(x, y))
            {
                return 1;
            }

            if (dp >= 0)
            {
                return dp;
            }

            return dp = (int)(nextTiles.stream()
                    .mapToLong(next -> next.countPaths(x, y))
                    .sum() % MOD);
        }
    }

    private static int solutionOOP(int m, int n, int[][] puddles)
    {
        boolean[][] isPuddle = new boolean[m][n];
        for (int[] p : puddles)
        {
            isPuddle[p[0]-1][p[1]-1] = true;
        }

        Tile[][] tiles = new Tile[m][n];
        for (int i = 0; i < m; ++i)
        {
            for (int j = 0; j < n; ++j)
            {
                Tile tile = new Tile(i, j, isPuddle[i][j]);
                tiles[i][j] = tile;

                if (i > 0)
                {
                    tiles[i - 1][j].setNext(tile);
                }

                if (j > 0)
                {
                    tiles[i][j - 1].setNext(tile);
                }
            }
        }

        return tiles[0][0].countPaths(m - 1, n - 1) % MOD;
    }

    private static int solutionDP(int m, int n, int[][] puddles)
    {
        boolean[][] isPuddle = new boolean[m][n];
        for (int[] p : puddles)
        {
            isPuddle[p[0]-1][p[1]-1] = true;
        }

        int[][] dp = new int[m][n];
        dp[0][0] = 1;

        for (int i = 0; i < m; ++i)
        {
            for (int j = 0; j < n; ++j)
            {
                if (isPuddle[i][j])
                {
                    continue;
                }

                if (i > 0)
                {
                    dp[i][j] += dp[i - 1][j];
                }

                if (j > 0)
                {
                    dp[i][j] += dp[i][j - 1];
                }

                dp[i][j] %= MOD;
            }
        }

        return dp[m-1][n-1] % MOD;
    }

    public static final SolveMethod SOLVE_METHOD = SolveMethod.DP;

    public static int solution(int m, int n, int[][] puddles)
    {
        switch (SOLVE_METHOD)
        {
            case OOP ->
            {
                return solutionOOP(m, n, puddles);
            }
            case DP ->
            {
                return solutionDP(m, n, puddles);
            }
        }

        return -1;
    }
}
