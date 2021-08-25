const items = [
    // { shape: 'square', color:'green' },
    // { shape: 'square', color: 'green'},
    // { shape: 'square', color: 'blue'}, 
    // { shape: 'square', color:'red' },
    // { shape: 'square', color:'red'},
    { shape: 'rectangle', color: 'black', weigh: 10, height: 15},
    { shape: 'square', color: 'black', weigh: 10, height: 10}, 
    { shape: 'square', color:'black', weigh: 10, height: 10 },
    { shape: 'rectangle', color:'black', weigh: 10, height: 15},
    { shape: 'rectangle', color: 'black', weigh: 10, height: 15},
    { shape: 'square', color: 'black', weigh: 10, height: 10}, 
    { shape: 'rectangle', color:'black', weigh: 10, height: 15 },
    { shape: 'square', color:'black', weigh: 10, height: 10}
];

// function hasColor(color) {
//     return function(rectangle) {
//         return rectangle.color === color
//     }
// }
// function filter(items) {
//         return function (condition) {
//             let result = items.filter(condition);
//             return result;
//         }
// }
// const isRed = hasColor('red')
// console.log(isRed({ color: 'red' })) // true
// console.log(isRed({color: 'blue'})) // false



const hasColor = color => rectangle => rectangle.color === color;
 const filter = condition => items => items.filter(condition);
 const map = expression => items => items.map(expression);
 const reduce = (callback, initValue) => items => items.reduce(callback, initValue);


function foo(item) { // condition
    if (item.color === 'green') {
        // console.log(item)
        return true
    }
    return false
}
function bar(item) { // expression
    return item.color.toUpperCase()
}
function foobar(acc, current) { // callback
    return acc + current.color
}
function flowTest (a){
return a + 1;
}

function flowTest2 (a){
    return a + 100;
}

function flowTest3 (a){
    return a - 50;
}
// function flow(...funcs) {
//     return function (arg) {
//         let nextArg = funcs[0](arg); //result of first f()
//         for (let i = 1; i < funcs.length; i++){
//             let temp = funcs[i](nextArg);
//             nextArg = temp;
//         }
//         return nextArg;
//     }
// }
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
const flow = (...funcs) => args => {
    return funcs.reduce(function (acc, func) {
        // console.log(acc)
        console.log(func(acc))
        return func(acc);
    }, args);
}

// const combine = (...funcs) => args => {
//     return funcs.reduceRight(function (acc, func) {
//         return func(acc);
//     }, args);
// }

//console.log(combine(flowTest3,flowTest2,flowTest)(0))
// console.log(flow(flowTest,flowTest2,flowTest3)(0))


const isBlack = hasColor('black')
const isSquare = ({ weigh, height }) => weigh === height;
const and = (condition1, condition2) => obj => condition1(obj) && condition2(obj);
const calcArea = ({ weigh, height }) => weigh * height;
const compareSq = (max, curr) => (max > curr) ? max : curr;

const calcMaxBlackSquareArea = flow(
    filter(and(isBlack, isSquare)),
    map(calcArea), 
    reduce(compareSq, -Infinity)
)
console.log(calcMaxBlackSquareArea(items)); 


















// filter(items)(foo)
// console.log(filter(items)(foo))
// console.log(map(items)(bar))
// console.log(reduce(items)(foobar)(''))

















// const filter = condition => items => items.filter(condition);
// function filter(condition) {
//     return function (items){
//         return items.filter(condition);
//     }
// }
// console.log(filter(isRed)(items))

// const hz = filter(isRed)
// console.log(hz(items))

// const reduce =
// const array = [1,2,3,4,5];
// const summa = array.reduce(function(, ){
//     return acc + init;
// }, {});

// console.log(summa)