// const ninja1 = {
//     name:"",
//     health: 90,
//     speed: 3,
//     strength: 3
// }

class Ninja {
    constructor(ninjaName, health = 90, speed = 3, strength = 3){
        this.name = ninjaName;
        this.health = health;
        this.speed = speed;
        this.strength = strength;
    }
    sayName() {
        console.log(this.name)
    }
    showStats() {
        console.log(this.name,this.strength,this.speed,this.health)
    }
    drinkSake() {
        console.log(this.health += 10)
        return this
    }
}
const ninja = new Ninja("Billy Bob");
console.log(ninja)

class SuperSensei extends Ninja {
    constructor (ninjaName, wisdom = 10, health = 200, speed = 10, strength = 10) {
        super(ninjaName, wisdom, health, speed, strength)
        this.wisdom = wisdom;
    }
    speakWisdom() {
        this.drinkSake ()
        console.log("Live in the present, since the past and future cannot be seen")
    }
}
const sensei =  new SuperSensei("Kristine");
sensei.speakWisdom();
sensei.showStats();

