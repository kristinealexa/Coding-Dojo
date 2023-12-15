public class BankTest {
    public static void main(String[] args){
        // Create 3 bank accounts
        BankAccount user1 = new BankAccount(0,0);
        BankAccount user2 = new BankAccount(0,0);
        BankAccount user3 = new BankAccount(0,0);

        // Deposit Test
        // - deposit some money into each bank account's checking or savings account and display the balance each time
        // - each deposit should increase the amount of totalMoney
        System.out.printIn(gettotalMoney());
        user1.depositSavings(500);
        user2.depositChecking(700);
        user3.depositSavings(1000);

        // Withdrawal Test
        // - withdraw some money from each bank account's checking or savings account and display the remaining balance
        // - each withdrawal should decrease the amount of totalMoney

        user1.withdrawSavings(100);
        user2.withdrawChecking(50);
        user3.withdrawSavings(200);

        // Static Test (print the number of bank accounts and the totalMoney)
        // user1.accounts();
        // user2.accounts();
        // user3.accounts();

        // was unable to print need help on this part please
    }
}
