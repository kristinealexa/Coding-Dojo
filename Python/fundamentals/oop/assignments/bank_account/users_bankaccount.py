from bank_account import BankAccount

class User:
    def __init__(self, first_name, last_name, email):
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.accounts_checking = BankAccount(int_rate=0.02, balance=0)

    def make_deposit(self, amount):
        self.myAccount.deposit(amount)
        return self

    def user_withdrawal(self, amount):
        self.myAccount.withdraw(amount)

    def display(self):
        return f"My name is: {self.first_name, self.last_name}, My balance is {self.myAccount.balance}"

    def display_info(self):
        print(f"First Name: {self.first_name}")
        print(f"Last Name: {self.last_name}")
        print(f"Email: {self.email}")
        return self






#     def display(self):
#         #return BankAccount.balance
#         return f"My name is: {self.name}, and I have {self.myAccount.balance} in my account"
#     # def make_withdraw(self, amount):
#     #     pass

#     # def display_user_balance(self,amount):
#     #     pass

# #         return self

# print(display_info())

# class User:
#     def example_method(self):
#         self.account.deposit(100)
#     print(self.account.balance)

