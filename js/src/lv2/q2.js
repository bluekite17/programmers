/*
# 전화번호 목록
- 경로: https://school.programmers.co.kr/learn/courses/30/lessons/12909

입력된 번호 목록 중, 어느 한 번호가 다른 번호의 접두어 인 경우 false, 아닌 경우 true를 리턴
*/

export const example = [
    [["119", "97674223", "1195524421"], "", false],
    [["123","456","789"], "", true],
    [["12","123","1235","567","88"], "", false],
];

class Node
{
    constructor() {
        this.children = {};
        this.is_full_number = false;
    }
}

let _root = new Node();

// function insert_node(number) {
//     let node = _root;
//
//     let contains = false;
//     Array.from(number).forEach((n, i) => {
//         let child = node.children[n];
//         if(child === undefined) {
//             child = new Node();
//             node.children[n] = child;
//         }
//
//         node = child;
//
//         if(node.is_full_number) {
//             contains = true;
//         }
//
//         if(i === number.length - 1) {
//             node.is_full_number = true;
//         }
//     });
//
//     return contains;
// }
//
// function contains_number(number) {
//     for (let i = 0; i < number.length; ++i)
//     {
//         let node = _root;
//
//         for (let j = i; j < number.length; ++j)
//         {
//             let child = node.children[number[j]];
//             if(child === undefined)
//             {
//                 break;
//             }
//
//             if(child.is_full_number)
//             {
//                 return true;
//             }
//
//             node = child;
//         }
//     }
// }

export function solution(phone_book, _) {
    phone_book.sort((a, b) => a.length - b.length);

    // for(let number of phone_book) {
    //     if(contains_number(number)) {
    //         return false;
    //     }
    //
    //     if(insert_node(number)) {
    //         return false;
    //     }
    // }

    for(let number of phone_book) {
        let node = _root;

        for (let i = 0; i < number.length; ++i) {
            const n = number[i];

            if(node.is_full_number) {
                return false;
            }

            let child = node.children[n];
            if(child === undefined) {
                child = new Node();
                node.children[n] = child;
            }

            node = child;
        }

        if(Object.keys(node.children).length > 0) {
            return false;
        }

        node.is_full_number = true;
    }

    return true;
}