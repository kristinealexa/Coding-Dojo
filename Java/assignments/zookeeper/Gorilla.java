class Gorilla extends Mammal {

    public Gorilla() {
        super();
    }

    public Gorilla(int energyLevel) { 
        super(energyLevel);
    }
    
    public void throwSomething(){
        System.out.println("The gorilla threw bananas at me!");
        energyLevel -= 5;
    }
    public void eatBananas(){
        System.out.println("Ate 10 yummy bananas.");
        energyLevel += 10;
    }
    public void climb(){
        System.out.println("The gorilla is climbing a big tree!");
        energyLevel -= 10;
    }
}

