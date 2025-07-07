/*
# 올바른 괄호
- 경로: https://school.programmers.co.kr/learn/courses/30/lessons/12909
*/

export const example = [
    ["()()", "", true],
    ["(())()", "", true],
    [")()(", "", false],
    ["(()(", "", false],
];

export function solution(s, _) {
    let count = 0;

    for(let c of s) {
        if (c === '(') {
            ++count;
        }
        else {
            --count;
        }

        if (count < 0) {
            return false;
        }
    }

    return count === 0;
}