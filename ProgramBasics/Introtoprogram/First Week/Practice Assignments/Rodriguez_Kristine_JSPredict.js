//predict 1:
//this console log will predict "I was born in 1980"
//since 1980 is being added to the console
function myBirthYearFunc(){
    console.log("I was born in' + 1980);
}
myBirthYearFunc();

//predict 2:
//console.log will state "I was born in 1980"
// birthYearInput will be replaced by 1980 since it's myBirthYearFunc
function myBirthYearFunc(birthYearInput){
    console.log("I was born in" + birthYearInput);
}
myBirthYearFunc(1980);

//predict 3:
// console.log will state "Summing Numbers!, Num 1 is: 10, Num 2 is: 20"
function add(num1, num2){
    console.log("Summing Numbers!");
    console.log("num1 is: " + num1);
    console.log("num2 is: " + num2);
    var sum = num1 + num2;
    console.log(sum);
}
add(10, 20);