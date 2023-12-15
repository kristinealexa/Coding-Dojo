public class BankAccount {
    // MEMBER VARIABLES
    private double checkingBalance;
    private double savingsBalance;

    private static int accounts;
    private static double totalMoney; // refers to the sum of all bank account checking and savings balances

    // CONSTRUCTOR
    public BankAccount(double checkingBalance, double savingsBalance) {
        this.checkingBalance = checkingBalance;
        this.savingsBalance = savingsBalance;
    }

    // GETTERS
    public double getCheckingBalance() {
        return this.checkingBalance;
    }
    public double getSavingsBalance() {
        return this.savingsBalance;
    }
    public double getTotalMoney() {
        return totalMoney;
    }

    // METHODS
    // deposit
    // - users should be able to deposit money into their checking or savings account
    public void depositChecking(double number) {
        this.checkingBalance += number;
        totalMoney += number;
    }
    public void depositSavings(double number) {
        this.savingsBalance += number;
        totalMoney += number;
    }

    // withdraw 
    // - users should be able to withdraw money from their checking or savings account
    // - do not allow them to withdraw money if there are insufficient funds
    // - all deposits and withdrawals should affect totalMoney
    public void withdrawChecking(double number) {
        if (number > this.checkingBalance) {
            System.out.println("Insufficient Funds");
        } 
        else {
            this.checkingBalance -= number;
            totalMoney -= number;
        }
    }
    public void withdrawSavings(double number) {
        if (number > this.checkingBalance) {
            System.out.println("Insufficient Funds");
        } 
        else {
            this.checkingBalance -= number;
            totalMoney -= number;
        }
    }

    // getBalance
    // - display total balance for checking and savings of a particular bank account
    public void getBalance() {
        System.out.printf("Checking: %s \n", this.checkingBalance);
        System.out.printf("Savings: %s", this.savingsBalance);
    }
}