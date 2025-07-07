/*
# 네트워크
2025.07.04 22:09
- 경로: https://school.programmers.co.kr/learn/courses/30/lessons/43162

입력 정보
- n: 1 <= n <= 200
- computers: 컴퓨터간 연결 여부

출력 정보
- 연결된 컴퓨터의 그룹 갯수
*/

export const example = [
    [3, [[1, 1, 0], [1, 1, 0], [0, 0, 1]], 2],
    [3, [[1, 1, 0], [1, 1, 1], [0, 1, 1]], 1],
];

/*
   1  2  3
1 [1, 1, 0]
2 [1, 1, 0]
3 [0, 0, 1]
2 (1-2, 3)

   1  2  3
1 [1, 1, 0]
2 [1, 1, 1]
3 [0, 1, 1]
1 (1-2-3)
*/

class Computer
{
    constructor()
    {
        this.id = undefined;
        this.network = []; // computer array
        this.group_number = undefined;
    }
}

let computers = {}; // key: id, value: computer
let groups = {}; // key: group_number, value: computer ids

function get_computer(id) {
    let computer = computers[id];

    if (computer === undefined) {
        computer = new Computer();
        computer.id = id;

        computers[id] = computer;
    }

    return computer;
}

function add_network(id, connections) {
    let computer = get_computer(id);

    connections.forEach((connection, index) => {
        if(index !== id && connection === 1) {
            let tmp = get_computer(index);
            computer.network.push(tmp);
            tmp.network.push(computer);
        }
    });
}

function DFS(computer, check_computers, check_group) {
    check_computers.push(computer.id);
    check_group.push(computer.id);

    for(let next of computer.network) {
        if(check_computers.has(next.id) === false) {
            DFS(next, check_computers, check_group);
        }
    }
}

function make_groups() {
    let check_computers = new Set();
    let finish_groups = [];

    for(let [id, computer] of Object.entries(computers)) {
        if (check_computers.has(parseInt(id)) !== false) {
            continue;
        }

        let group = [];
        DFS(computer, check_computers, group);
        finish_groups.push(group);
    }

    let group_number = 1;
    for(let group of finish_groups) {
        groups[group_number] = group;

        for(let id of group) {
            computers[id].group_number = group_number;
        }

        ++group_number;
    }
}

export function solution(n, computers) {
    // for(let i = 0; i < n; ++i) {
    //     add_network(i, computers[i]);
    // }
    //
    // make_groups();
    //
    // return Object.keys(groups).length;

    let checked = Array(n).fill(false);
    let groups = 0;

    function _dfs(index) {
        checked[index] = true;
        for (let next = 0; next < n; ++next) {
            if (checked[next] === false && computers[index][next] === 1) {
                _dfs(next);
            }
        }
    }

    for(let i = 0; i < n; ++i) {
        if (checked[i] === false) {
            _dfs(i);
            ++groups;
        }
    }

    return groups;
}