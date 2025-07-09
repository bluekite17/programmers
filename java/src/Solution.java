public class Solution
{
    public enum RunQuestion
    {
        Lv3Q1,

        Lv4Q1
    }

    public static final RunQuestion RUN = RunQuestion.Lv3Q1;

    public static void main(String[] args)
    {
        switch (RUN)
        {
            case Lv3Q1 ->
            {
                lv3.Q1.ExampleCase example = lv3.Q1.EXAMPLES[0];
                int result = lv3.Q1.solution(example.m(), example.n(), example.puddles());
                System.out.printf("%d, %d, %b%n", example.result(), result, result == example.result());
            }
            case Lv4Q1 ->
            {
                lv4.Q1.ExampleCase example = lv4.Q1.EXAMPLES[0];
                int result = lv4.Q1.solution(example.foodItems(), example.k());
                System.out.printf("%d, %d, %b%n", example.result(), result, result == example.result());
            }
        }
    }
}
