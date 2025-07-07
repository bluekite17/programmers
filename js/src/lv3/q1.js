/*
# 이중우선순위큐
2025.07.04 18:02
- 경로: https://school.programmers.co.kr/learn/courses/30/lessons/42628

입력 정보
- I {number}: 숫자 입력
- D 1: 최대값 삭제
- D -1: 최소값 삭제

출력 정보
[{최대값}, {최소값}] or [0, 0]
*/

export const example = [
    [["I 16", "I -5643", "D -1", "D 1", "D 1", "I 123", "D -1"], "", [0,0]],
    [["I -45", "I 653", "D 1", "I -642", "I 45", "I 97", "D 1", "D -1", "I 333"], "", [333, -45]],
];

// shift 첫번째 제거
// pop 마지막 제거
let delete_func = {
    '-1': (arr) => {
        let min = Math.min(...arr);
        arr.splice(arr.indexOf(min), 1);
    },
    '1': (arr) => {
        let max = Math.max(...arr);
        arr.splice(arr.indexOf(max), 1);
    },
}

class Heap {
    constructor(compare) {
        this.arr = [];
        this.compare = compare;
    }

    push(elem) {
        this.arr.push(elem);
        this._up(this.arr.length - 1);
    }

    pop() {
        if (this.arr.length === 0) {
            return undefined;
        }

        const top = this.arr[0];
        const end = this.arr.pop();
        if (this.arr.length) {
            this.arr[0] = end;
            this._down(0);
        }

        return top;
    }

    peek() {
        return this.arr[0];
    }

    size() {
        return this.arr.length;
    }

    _up(idx) {
        while (idx > 0) {
            const parent = (idx - 1) >> 1;
            if (this.compare(this.arr[idx], this.arr[parent]) < 0) {
                [this.arr[idx], this.arr[parent]] = [this.arr[parent], this.arr[idx]];
                idx = parent;
            }
            else {
                break;
            }
        }
    }

    _down(idx) {
        const n = this.arr.length;
        while (true) {
            let left = 2 * idx + 1;
            let right = 2 * idx + 2;
            let smallest = idx;
            if (left < n && this.compare(this.arr[left], this.arr[smallest]) < 0) {
                smallest = left;
            }
            if (right < n && this.compare(this.arr[right], this.arr[smallest]) < 0) {
                smallest = right;
            }
            if (smallest !== idx) {
                [this.arr[idx], this.arr[smallest]] = [this.arr[smallest], this.arr[idx]];
                idx = smallest;
            }
            else {
                break;
            }
        }
    }
}

function deleteValue(heap, deleted) {
    while (heap.size() > 0) {
        let elem = heap.pop();
        if (deleted[elem.index] === false) {
            deleted[elem.index] = true;
            return elem.value;
        }
    }
}

function peekValue(heap, deleted) {
    while (heap.size() > 0) {
        let elem = heap.peek();
        if (deleted[elem.index] === false) {
            return elem.value;
        }
        // else {
        heap.pop();
        // }
    }
}

export function solution(operations, _) {
    // let answer = [];
    //
    // let min = undefined;
    // let max = undefined;
    //
    // for(let op of operations) {
    //     let [cmd, value] = op.split(' ');
    //     if(cmd === 'I') {
    //         let num = parseInt(value)
    //         answer.push(num);
    //
    //         if(min === undefined || min > num) {
    //             min = num;
    //         }
    //
    //         if(max === undefined || max < num) {
    //             max = num;
    //         }
    //     }
    //     else if(cmd === 'D') {
    //         if(value === '1') {
    //             answer.splice(answer.indexOf(max), 1);
    //             max = Math.max(...answer);
    //         }
    //         else if(value === '-1') {
    //             answer.splice(answer.indexOf(min), 1);
    //             min = Math.min(...answer);
    //         }
    //     }
    // }
    // return answer.length > 0 ? [max, min] : [0, 0];

    let minHeap = new Heap((a, b) => a.value - b.value);
    let maxHeap = new Heap((a, b) => b.value - a.value);
    let deleted = {};

    let index = 0;
    for (let op of operations) {
        let [cmd, value] = op.split(' ');
        if (cmd === 'I') {
            let elem = { value: ''+value, index: index };
            minHeap.push(elem);
            maxHeap.push(elem);
            deleted[index] = false;
            ++index;
        }
        else if (cmd === 'D') {
            if (value === '1') {
                deleteValue(maxHeap, deleted);
            }
            else {
                deleteValue(minHeap, deleted);
            }
        }
    }

    let min = peekValue(minHeap, deleted), max = peekValue(maxHeap, deleted);

    return (min === undefined || max === undefined)
        ? [0, 0] : [parseInt(max), parseInt(min)];
}