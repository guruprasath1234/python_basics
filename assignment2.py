# for i in range(10, 101):
#     if i % 7 == 0:
#         print(i)

#------------------------------------

# n = int(input("Enter a number: "))

# fact = 1
# for i in range(1, n + 1):
#     fact = fact * i

# print("Factorial:", fact)

#------------------------------------

# for i in range(1, 6):
#     print(str(i) * i)

#------------------------------------

# rows = 3
# stars = 5

# for i in range(rows):
#     print(" " * (2 * i) + " * " * (stars - 2 * i))

#-------------------------------------

# num = int(input("Enter a number: "))

# sum = 0
# while num > 0:
#     digit = num % 10
#     sum = sum + digit
#     num = num // 10

# print("Sum of digits:", sum)


#-----------------------

# num = 0
# while num >= 0:
#     num = int(input("Enter a number: "))
# print("negative number")

#-----------------------

# try:
#     num = int(input("Enter a number: "))
#     print("You entered:", num)

# except ValueError:
#     print("Error: Please enter a valid numeric value.")

#-------------------------------------

# try:
#     a = int(input("Enter first number: "))
#     b = int(input("Enter second number: "))

#     result = a / b
#     print("Result:", result)

# except ValueError:
#     print("Error: Please enter only numbers.")

# except ZeroDivisionError:
#     print("Error: Cannot divide by zero.")

#-------------------------------------

# correct_pin = "1234"
# attempts = 0

# while attempts < 3:
#     pin = input("Enter PIN: ")

#     if pin == correct_pin:
#         print("Access Granted")
#         break
#     else:
#         print("Wrong PIN")
#         attempts += 1

# if attempts == 3:
#     print("Account Locked")

#-------------------------------------

# try:
#     num = int(input("Enter a number: "))

#     if num < 0:
#         raise ValueError("Negative number entered")

#     print("You entered:", num)

# except ValueError as e:
#     print("Error:", e)

# finally:
#     print("Program Executed")

#-------------------------------------  

