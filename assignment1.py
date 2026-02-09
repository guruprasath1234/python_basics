# a = 10
# b = 5

# print("Addition:", a + b)
# print("Subtraction:", a - b)
# print("Multiplication:", a * b)
# print("Division:", a / b)

# #-------------------------------------

# num = input("Enter a number: ")
# print("Data type is:", type(num))

# #-------------------------------------

# attendance = float(input("Enter attendance percentage: "))
# internal = float(input("Enter internal marks: "))

# if attendance >= 75 and internal >= 40:
#     print("Eligible for exam")
# else:
#     print("Not eligible for exam")

# #-------------------------------------

# data = float(input("Enter mobile data used (in GB): "))

# if data < 1:
#     print("Low data usage")
# elif data >= 1 and data <= 5:
#     print("Regular User")
# else:
#     print("Heavy User")


# #-------------------------------------

# a = int(input("Enter first number: "))
# b = int(input("Enter second number: "))
# c = int(input("Enter third number: "))
# d = int(input("Enter fourth number: "))

# largest = max(a, b, c, d)
# print("Largest number is:", largest)

# #-------------------------------------

# for i in range(15, 86):
#     if i % 5 == 0:
#         print(i)

# #-------------------------------------

# s = input("Enter a string: ")
# rev = ""

# for i in s:
#     rev = i + rev

# print("Reverse string:", rev)

# #-------------------------------------

# for i in range(1, 5):
#     print("*" * i)


# #--------------------------------------

# n = int(input("Enter N: "))
# i = 1

# while i <= n:
#     print(i)
#     i += 1


#--------------------------------------

num = int(input("Enter number: "))
temp = num
rev = 0

while num > 0:
    rem = num % 10
    rev = rev * 10 + rem
    num = num // 10

if temp == rev:
    print("Palindrome number")
else:
    print("Not a palindrome")
