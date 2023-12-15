var count = 9;
var countElement = document.querySelector("#count")

function add1() {
    count++;
    countElement.innerText = count + "like(s)";
    console.log(count);
}

// var countT = 12;
// var countElement =  document.querySelector("#countT")

// function add1() {
//     countT++;
//     countElement.innerText = countT + "like(s)";
//     console.log(countT)
// }

// QUESTION
// Is there a way to separte the buttons so the function can all run at the same time?
// I had to comment out the second function to make them work.