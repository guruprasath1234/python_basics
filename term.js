console.log("Hello Javascript");
//---------------------------------------

const score=100;
// score=3456;
console.log(score);
//---------------------------------------

function greetings(name){
    return "hello "+name+",this is JS class";
}
console.log(greetings("ABC"));

//-----------------------------------------

const greeet = (name) => {
    return "Hello " + name;
};
console.log(greeet("XYZ"));

//---------------------------------------------

const add = (a,b) => {
    return a+b;
};
console.log(add(1,2));

// --------------------------------------------

// const bad=(a,b)=>a+b


// let fruits=["apple", "Mango", "Bannana"];

// for(let i =0; i<fruits.length, i++) {
//     console.log(fruits[i]);
// }

let fruits = ["apple", "Mango", "Banana"];

for (let i = 0; i < fruits.length; i++) {
    console.log(fruits[i]);
}

