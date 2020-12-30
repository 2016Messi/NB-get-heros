const fiveStars = require('./params.js')
let inquirer = require('inquirer')
let fiveStarsBox = [],
    season = 0,
    count = 0,
    fiveNums = 0,
    heros = [],
    unluckyNums = 0
inquirer.prompt([{
    name: 'season',
    type: 'list',
    message: '当前的赛季为',
    choices: [
        {
            name: '第一赛季',
            value: 'S1',
        },
        {
            name: '第二赛季',
            value: "S2",
        },
        {
            name: "第三赛季",
            value: "S3",
        },
        {
            name: "第四赛季",
            value: "S4",
        },
        {
            name: "第五赛季",
            value: "S5",
        },
        {
            name: "第六赛季",
            value: "S6",
        },
    ],
}]).then((answers) => {
    // season = answers['season']
    fiveStarsBox = fiveStars["S3"]
    inquirer.prompt([{
        name: 'number',
        message: '你想抽卡多少次'
    }]).then((answers) => {
        ouHuang(answers.number)
    })
})

function random(min, max) {
    return (Math.random() * (max - min) + min).toFixed(2)
}


function GO() {
    let X = 0
    if (unluckyNums === 30) {
        console.log('保底')
        X = random(94.4, 100)
        unluckyNums = 0
    } else if (count % 5 === 0) {
        X = random(58.4, 100)
    } else {
        X = random(0, 100)
    }


    if (X >= 0 && X <= 58.4) {
        unluckyNums++
    } else if (X > 58.4 && X <= 94.4) {
        unluckyNums++
    } else if (X > 94.4 && X <= 100) {
        let name = fiveStarsBox[Math.floor((Math.random() * fiveStarsBox.length))]
        console.log(
        	`第${count}次   随机值:${X}   恭喜，你抽到了5星武将 【${name}】`
           )
        unluckyNums = 0
        heros.push(name)
        fiveNums++
    }
}
function ouHuang(number) {
    while (count < number) {
        count++
        GO(season, number)
    }
    console.log(fiveNums, '个五星')
    // console.log(`你抽到武将有 ${heros}`)
    console.log(`你抽到武将有${[...new Set(heros)]} 共${[...new Set(heros)].length}/${fiveStarsBox.length}`)
}

