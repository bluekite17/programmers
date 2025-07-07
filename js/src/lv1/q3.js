/*
# K번째수
- 경로: https://school.programmers.co.kr/learn/courses/30/lessons/42748
array를 i부터 j까지 자르고 정렬하여 k번째 숫자 찾기

입출력 정보
- 입력(array): 길이는 1 이상 100 이하, 각 원소는 1 이상 100 이하
- 입력(commands): 길이는 1 이상 50 이하, 각 원소는 길이는 3(i, j, k)
- 출력
*/

export const example = [
    [[1, 5, 2, 6, 3, 7, 4], [[2, 5, 3], [4, 4, 1], [1, 7, 3]], [5, 6, 3]]
];

export function solution(array, commands) {
    // let answer = [];
    //
    // commands.forEach(command => {
    //     let tmpArray = array.slice(command[0]-1, command[1]);
    //     tmpArray.sort((a,b) => a - b);
    //
    //     answer.push(tmpArray[command[2]-1]);
    // })
    //
    // return answer;

    return commands.map(([i, j, k]) => {
        return array.slice(i-1, j).sort((a,b) => a - b)[k-1];
    });
}