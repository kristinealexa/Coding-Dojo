class GorillaTest {
    public static void main(String[] args) {
        Gorilla gorilla = new Gorilla();
        gorilla.throwSomething();
        gorilla.throwSomething();
        gorilla.throwSomething();
        gorilla.eatBananas();
        gorilla.eatBananas();
        gorilla.climb();
        
        System.out.println("The gorilla's energy level is ");
        gorilla.displayEnergy();

        Bat bat = new Bat();
        bat.attackTown();
        bat.attackTown();
        bat.attackTown();
        bat.eatHumans();
        bat.eatHumans();
        bat.fly();
        bat.fly();

        System.out.println("The bat's energy is ");
        bat.displayEnergy();
    }
}

