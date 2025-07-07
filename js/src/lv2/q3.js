/*
# 가장 큰 수
- 경로: https://school.programmers.co.kr/learn/courses/30/lessons/42746

주어진 숫자들로 만들 수 있는 가장 큰 수를 문자열로 리턴
*/

export const example = [
    [[6, 10, 2], "", "6210"],
    [[3, 30, 34, 5, 9], "", "9534330"]
];

export function solution(numbers, _) {
    let numstring = [];

    for (let number of numbers) {
        numstring.push("" + number);
    }

    numstring.sort((a, b) => (b + a).localeCompare(a + b));

    if (numstring[0] === "0") {
        return "0";
    }

    return numstring.join('');
}