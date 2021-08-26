// const items = [
//     { shape: 'square', color:'green' },
//     { shape: 'square', color: 'green'},
//     { shape: 'square', color: 'blue'}, 
//     { shape: 'square', color:'red' },
//     { shape: 'square', color:'red'},
//     { shape: 'rectangle', color: 'red', weigh: 10, height: 15},
//     { shape: 'square', color: 'black', weigh: 10, height: 10}, 
//     { shape: 'square', color:'black', weigh: 10, height: 10 },
//     { shape: 'rectangle', color:'red', weigh: 10, height: 15},
//     { shape: 'rectangle', color: 'red', weigh: 10, height: 15},
//     { shape: 'square', color: 'black', weigh: 10, height: 10}, 
//     { shape: 'rectangle', color:'red', weigh: 10, height: 15 },
//     { shape: 'square', color:'black', weigh: 10, height: 10}
// ];
//                                                               Определения цвета фигуры

// function hasColor(color) {
//     return function(rectangle) {
//         return rectangle.color === color
//     }
// }
const hasColor = color => rectangle => rectangle.color === color;
const isRed = hasColor('red')
console.log(isRed({ color: 'red' })) // true
console.log(isRed({ color: 'blue' })) // false

//                                                      ункциональные обертки над методами массива: map, filter, reduce



function foo(item) { // condition
    if (item.color === 'green') {
        // console.log(item)
        return true
    }
    return false
}
// function filter(condition) {
//     return function (items){
//         return items.filter(condition);
//     }
// }
const filter = condition => items => items.filter(condition);
// console.log(filter(isRed)(items))
// console.log(filter(items)(foo))


// function bar(item) { // expression
//     return item.color.toUpperCase()
// }
// function map(expression) {
//     return function (items) {
//         return items.map(expression);
//     }
// }
const map = expression => items => items.map(expression);
// console.log(map(items)(bar))

// function reduce(callback,initValue) {
//     return function (items) {
//         return items.reduce(callback, initValue)
//     }
// }
const reduce = (callback, initValue) => items => items.reduce(callback, initValue);
// function foobar(acc, current) { // callback
//     return acc + current.color
// }
// console.log(reduce(items)(foobar)(''))

//                                                            Комбинирования функций: flow, combine
function flowTest (a){
return a + 1;
}

function flowTest2 (a){
    return a + 100;
}

function flowTest3 (a){
    return a - 50;
}
function flow(...funcs) {
    return function (arg) {
        let nextArg = funcs[0](arg); //result of first f()
        for (let i = 1; i < funcs.length; i++){
            let temp = funcs[i](nextArg);
            nextArg = temp;
        }
        return nextArg;
    }
}
const flow = (...funcs) => args => {
        return funcs.reduce(function (acc, func) {
            // console.log(acc)
            console.log(func(acc))
            return func(acc);
        }, args);
}
console.log(flow(flowTest,flowTest2,flowTest3)(0))

function combine(...funcs) {
    return function (arg) {
        let nextArg = funcs[funcs.length - 1](arg); //result of first f()
        for (let i = funcs.length - 2; i >= 0; i--){
            let temp = funcs[i](nextArg);
            nextArg = temp;
        }
        return nextArg;
    }
}
const combine = (...funcs) => args => {
    return funcs.reduceRight(function (acc, func) {
        return func(acc);
    }, args);
}
//console.log(combine(flowTest3,flowTest2,flowTest)(0))

//                                                                 Максимальной площади из всех черных квадратов

const isBlack = hasColor('black')
const isSquare = ({ weigh, height }) => weigh === height;
const and = (condition1, condition2) => obj => condition1(obj) && condition2(obj);
const calcArea = ({ weigh, height }) => weigh * height;
const compareSq = (max, curr) => (max > curr) ? max : curr;

const calcMaxBlackSquareArea = flow(
    filter(and(isBlack, isSquare)),
    map(calcArea), 
    reduce(compareSq, 0)
)
console.log(calcMaxBlackSquareArea(items));

//                                                                  Суммы периметров всех красных прямоугольников

const items = [
    { shape: 'square', color:'green' },
    { shape: 'square', color: 'green'},
    { shape: 'square', color: 'blue'}, 
    { shape: 'square', color:'red' },
    { shape: 'square', color:'red'},
    { shape: 'rectangle', color: 'red', weigh: 10, height: 15},
    { shape: 'square', color: 'black', weigh: 10, height: 10}, 
    { shape: 'square', color:'black', weigh: 10, height: 10 },
    { shape: 'rectangle', color:'red', weigh: 10, height: 15},
    { shape: 'rectangle', color: 'red', weigh: 10, height: 15},
    { shape: 'square', color: 'black', weigh: 10, height: 10}, 
    { shape: 'rectangle', color:'red', weigh: 10, height: 15 },
    { shape: 'square', color:'black', weigh: 10, height: 10}
];
const and = (condition1, condition2) => obj => condition1(obj) && condition2(obj);
const isRed = hasColor('red')
const isReqtangles = ({ weigh, height }) => weigh > height || weigh < height;
const calcPerimeter = ({ weigh, height }) => weigh + height;
const calcSum = (max, curr) => max + curr;

const calcSummAllRedReqtangles = flow(
    filter(and(isRed, isReqtangles)),
    map(calcPerimeter), 
    reduce(calcSum, 0)
)
console.log(calcSummAllRedReqtangles(items));

//                                                                  Комбинирования предикатов: or, any, and, all;
const and = (condition1, condition2) => obj => condition1(obj) && condition2(obj);
const or = (condition11, condition2) => obj => condition1(obj) || condition2(obj);
const any = (condition) => obj => obj.some(condition)
const all = (condition) => obj => obj.every(condition);