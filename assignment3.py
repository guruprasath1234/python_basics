#Write a Python program to create a function named find_largest(a, b, c) that accepts three numbers as arguments and returns the largest number among them. Call the function and display the result.

def find_largest(a, b, c):
    largest = a
    if b > largest:
        largest = b
    if c > largest:
        largest = c
    return largest      
a = float(input("Enter first number: "))
b = float(input("Enter second number: "))
c = float(input("Enter third number: "))
largest_number=find_largest(a, b, c)
print("The largest number is:", largest_number)

#---------------------------------------

#Write a Python program to create a function sum_of_list(numbers) that accepts a list of numbers and returns the sum of all elements in the list. Display the output.

def sum_of_list(numbers):
    total = 0
    for num in numbers:
        total += num
    return total        
numbers = list(map(float, input("Enter numbers separated by spaces: ").split()))
result = sum_of_list(numbers)
print("Sum of list elements:", result)

#---------------------------------------




