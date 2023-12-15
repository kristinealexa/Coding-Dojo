# 1. Basic
for i in range(0,150):
    print(i)

# 2 Multiples of five
for i in range(5,1000,5):
    print(i)

# 3 Counting the Dojo way
def count():
    for i in range(1,100,1):
        if i % 5 == 0:
            print ("Coding")
        if i % 10 == 0:
            print ("Dojo")
count()

# 4 Whoa. That sucker's huge
odd = 0

for i in range(0,500000+1):
    if i % 2 != 0:
        print(i,end=" ")
        odd = odd+i

print("sum of all odd nums from {0} to {1} = {2}".format(0,500000,odd))

#5 Countdown by fours
def count_by_four():
    i = 2018
    while i > 0:
        print(i)
        i = i - 4

count_by_four()

# 6 Flexible Counter
def flexible_count(low_num, high_num, mult):
    for i in range (low_num, high_num):
        if i % mult == 0:
            print(i)

flexible_count(2,9,3)



