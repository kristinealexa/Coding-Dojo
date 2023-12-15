class BankAccount:

    def __init__(self, int_rate, balance = 0):
        self.int_rate = int_rate
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount
        return self

    def withdraw(self, amount):
        self.balance -= amount
        return self

    def display_account_info(self):
        print("interest rate is", self.int_rate)
        return self

    def yield_interest(self):
        if self.balance > 0:
            self.balance += self.balance * self.int_rate
            return self 

        else: self.balance -= 5
        return self



Kristine = BankAccount (.299)
Luna = BankAccount (.300)

Kristine.deposit(5000).deposit(1000).deposit(2000).withdraw(4000).yield_interest().display_account_info()
print(Kristine.balance)

Luna.deposit(1000).deposit(2000).deposit(300).deposit(5000).withdraw(3000).yield_interest().display_account_info()
print(Luna.balance)