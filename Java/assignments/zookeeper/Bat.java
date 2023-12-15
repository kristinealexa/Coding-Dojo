class Bat extends Mammal {
    
    private int energyLevel = 300;

    public Bat() {
        super();
    }

    public Bat(int energyLevel) { 
        super(energyLevel);
    }

    public void fly(){
        System.out.println("The bat is flying!" + this.energyLevel);
        energyLevel -= 50;
    }
    public void eatHumans(){
        System.out.println("Ate 10 yummy humans and drank all their blood." + this.energyLevel);
        energyLevel += 25;
    }
    public void attackTown(){
        System.out.println("The bat is attacking the town!" + this.energyLevel);
        energyLevel -= 100;
    }
    public void setEnergyLevel(int energy) {
        this.energyLevel = energy;
    }
    public int getEnergyLevel() {
        return this.energyLevel;
    }
}
