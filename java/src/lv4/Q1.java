package lv4;

import java.util.*;

public class Q1 {
    public record ExampleCase(int[] foodItems, long k, int result) {}

    public static final ExampleCase[] EXAMPLES =
    {
        new ExampleCase(new int[]{3, 1, 2}, 5, 1)
    };

    public static int solution(int[] foodTimes, long k) {
        int len = foodTimes.length;
        long sum = 0;

        TreeMap<Integer, List<Integer>> foods = new TreeMap<>();
        for (int i = 0; i < len; ++i)
        {
            if (i == k)
            {
                return i + 1;
            }

            int t = foodTimes[i];
            sum += t;

            List<Integer> ids = foods.computeIfAbsent(t, k1 -> new ArrayList<>());
            ids.add(i);
        }

        if (sum <= k)
        {
            return -1;
        }

        long remainTime = k;
        int passFoods = len;
        int lastTime = 0;

        for (Map.Entry<Integer, List<Integer>> entry : foods.entrySet())
        {
            int key = entry.getKey();
            List<Integer> value = entry.getValue();

            long passTime = (long)(key - lastTime) * passFoods;

            if (remainTime <= passTime)
            {
                // 남은 음식 후보 모으기
                List<Integer> targets = new ArrayList<>();
                for (Map.Entry<Integer, List<Integer>> ent : foods.entrySet())
                {
                    if (ent.getKey() > lastTime)
                    {
                        targets.addAll(ent.getValue());
                    }
                }
                Collections.sort(targets);

                int answerIdx = (int)(remainTime % targets.size());
                return targets.get(answerIdx) + 1; // 1-based
            }

            remainTime -= passTime;
            lastTime = key;
            passFoods -= value.size();
        }

        return -1;
    }
}
