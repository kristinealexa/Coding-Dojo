// Number 1
var hello;                                 
console.log(hello);
hello = 'world'                                   


// Number 2
var needle = 'haystack';
function test(){
    let needle = 'magnet';
    console.log(needle);
}
test();

// Number 3
var brendan = 'super cool';
function print(){
    brendan = 'only okay';
    console.log(brendan);
}
print();
console.log(brendan);


// Number 4
let food = 'chicken';
console.log(food);
function eat(){
    let food = 'half-chicken';
    console.log(food);
    food = 'gone';
}
eat();

// Number 5

var mean = function() {
    food = "chicken";
    console.log(food);
    let food = "fish";
    console.log(food);
}
mean();
console.log(food);

// Number 6
let genre = "disco";
console.log(genre);
function rewind() {
    let genre = "rock";
    console.log(genre);
    var genre = "r&b";
    console.log(genre);
}
rewind();
console.log(genre);

// Number 7 
let dojo = "san jose";
console.log(dojo);
function learn() {
    let dojo = "seattle";
    console.log(dojo);
    dojo = "burbank";
    console.log(dojo);
}
learn();
console.log(dojo);

// Number 8 
function makeDojo(name, students){
    let dojo = {};
    dojo.name = name;
    dojo.students = students;
    if(dojo.students > 50){
        dojo.hiring = true;
    }
    else if(dojo.students <= 0){
        dojo = "closed for now";
    }
    return dojo;
}
console.log(makeDojo("Chicago", 65));
console.log(makeDojo("Berkeley", 0));










