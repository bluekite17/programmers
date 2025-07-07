/*
# 완주하지 못한 선수
- 경로: https://school.programmers.co.kr/learn/courses/30/lessons/42576?language=javascript
마라톤에 참여한 선수 중 완주하지 못한 선수 찾기

입출력 정보
- 입력(participant): 마라톤에 참여한 선수
- 입력(completion): 완주한 선수
- 결과: 완주하지 못한 선수

제한 사항
- 마라톤 경기에 참여한 선수의 수는 1명 이상 100,000명 이하입니다.
- completion의 길이는 participant의 길이보다 1 작습니다.
- 참가자의 이름은 1개 이상 20개 이하의 알파벳 소문자로 이루어져 있습니다.
- 참가자 중에는 동명이인이 있을 수 있습니다.
*/

export const example = [
    [["leo", "kiki", "eden"], ["eden", "kiki"], "leo"],
    [["marina", "josipa", "nikola", "vinko", "filipa"], ["josipa", "filipa", "marina", "nikola"], "vinko"],
    [["mislav", "stanko", "mislav", "ana"], ["stanko", "ana", "mislav"], "mislav"]
];

export function solution(participant, completion) {
    /*
    - 배열에서 삭제의 비용
    배열에서 요소를 삭제(splice, shift, unshift 등)는 삭제한 자리 뒤의 모든 요소를 한 칸씩 앞으로 이동해야 하기 때문에 → O(N)

    indexOf로 요소 찾기(O(N)), splice로 요소 삭제(O(N)), 이걸 N번 반복하면 → O(N^2)
    */
    // completion.forEach(element => {
    //     let idx = participant.indexOf(element);
    //     if (idx > -1) {
    //         participant.splice(idx, 1);
    //     }
    // })

    /*
    - 배열을 순회하며 Map(객체)으로 카운팅
    Map/객체에 값 추가/조회/수정은 평균적으로 O(1)

    배열을 한 번 순회하며 각 요소를 Map에 등록하면 → O(N)
    두 번째 배열(completion)도 Map을 O(1)로 업데이트 → O(N)
    마지막으로 Map을 한 번 순회 → O(N)
    총합: O(3N) → O(N)
    */
    let map = {};

    participant.forEach(park => {
        map[park] = (map[park] || 0) + 1;
    });

    completion.forEach(elem => {
       map[elem] -= 1;
    });

    return Object.entries(map).find(([k, v]) => v === 1)[0];
}

