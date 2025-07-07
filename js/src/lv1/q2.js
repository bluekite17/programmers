/*
# 크레인 인형뽑기 게임
- 경로: https://school.programmers.co.kr/learn/courses/30/lessons/64061
배치된 인형 정보에서 정해진 순서로 인형을 뽑고, 연속된 인형 종류일 경우 제거한다.
모든 순서를 처리한 후 제거된 인형의 갯수를 리턴한다.

입출력 정보
- 입력(board): 인형 배치도
- 입력(moves): 크레인 움직임
- 결과: 사라진 인형 갯수

제한 사항
- board 배열은 2차원 배열로 크기는 "5 x 5" 이상 "30 x 30" 이하입니다.
- board의 각 칸에는 0 이상 100 이하인 정수가 담겨있습니다.
- 0은 빈 칸을 나타냅니다.
- 1 ~ 100의 각 숫자는 각기 다른 인형의 모양을 의미하며 같은 숫자는 같은 모양의 인형을 나타냅니다.
- moves 배열의 크기는 1 이상 1,000 이하입니다.
- moves 배열 각 원소들의 값은 1 이상이며 board 배열의 가로 크기 이하인 자연수입니다.
*/

export const example = [
    [[[0,0,0,0,0],[0,0,1,0,3],[0,2,5,0,1],[4,2,4,4,2],[3,5,1,3,1]], [1,5,3,5,1,2,1,4], 4]
];

export function solution(board, moves) {
    let removeCount = 0;
    // let emptyCols = [];
    let basket = [];

    moves.forEach(move => {
        let idx = move-1;
        // if (emptyCols.indexOf(idx) > -1) {
        //     return;
        // }

        // let picked = false;
        for (let i = 0; i < board.length; ++i) {
            const row = board[i];
            if(row[idx] === 0) {
                continue;
            }

            if(basket.length > 0 && basket[basket.length-1] === row[idx]) {
                basket.pop();
                removeCount += 2;
            }
            else {
                basket.push(row[idx]);
            }

            row[idx] = 0;
            // picked = true;
            break;
        }

        // if(picked === false)
        // {
        //     emptyCols.push(idx);
        // }
    });

    return removeCount;
}