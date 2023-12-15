public class Mammal {

    public int energyLevel = 100;
    
    public Mammal() {
    }

    public Mammal(int energyLevel) {
        this.energyLevel = energyLevel;
        System.out.println("This is the energy level");
    }
    
    public int displayEnergy() {
        System.out.println(this.energyLevel);
        return energyLevel;
    }
    public void setEnergyLevel(int energy) {
        this.energyLevel = energy;
    }
    public int getEnergyLevel() {
        return this.energyLevel;
    }
}
