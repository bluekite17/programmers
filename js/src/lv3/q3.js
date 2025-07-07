/*
# 베스트앨범
- 경로: https://school.programmers.co.kr/learn/courses/30/lessons/42579

입력 정보
- genres[i]는 고유번호가 i인 노래의 장르입니다. 장르 종류는 100개 미만
    장르에 속한 곡이 하나라면, 하나의 곡만 선택
- plays[i]는 고유번호가 i인 노래가 재생된 횟수입니다.
    모든 장르는 재생된 횟수가 다름
- genres와 plays의 길이는 같으며, 이는 1 이상 10,000 이하입니다.

출력 정보
- 재생된 장르 순, 재생된 곡 순으로 장르별 2개씩 정렬

*/

export const example = [
    [["classic", "pop", "classic", "classic", "pop"], [500, 600, 150, 800, 2500], [4, 1, 3, 0]]
];

export function solution(genres, plays) {
    let gen_play_times = {}

    for (let i = 0; i < genres.length; ++i) {
        let music = { no: i, play_times: plays[i] };

        let gen = gen_play_times[genres[i]];

        if (gen === undefined) {
            gen = { play_times: 0, musics: [] };
            gen_play_times[genres[i]] = gen;
        }

        // gen.name =  genres[i];
        gen.play_times += music.play_times;
        gen.musics.push(music);

    }

    let gen_array = Object.values(gen_play_times);
    gen_array.sort((a, b) => b.play_times - a.play_times);

    let answer = [];
    for(let gen of gen_array) {
        gen.musics
            .sort((a, b) => b.play_times - a.play_times || a.no - b.no)
            .slice(0, 2)
            .forEach(m => answer.push(m.no));
    }

    return answer;
}