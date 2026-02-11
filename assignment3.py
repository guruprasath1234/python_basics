#Write a Python program to create a function named find_largest(a, b, c) that accepts three numbers as arguments and returns the largest number among them. Call the function and display the result.

# def find_largest(a, b, c):
#     largest = a
#     if b > largest:
#         largest = b
#     if c > largest:
#         largest = c
#     return largest      
# a = float(input("Enter first number: "))
# b = float(input("Enter second number: "))
# c = float(input("Enter third number: "))
# largest_number=find_largest(a, b, c)
# print("The largest number is:", largest_number)

#---------------------------------------

#Write a Python program to create a function sum_of_list(numbers) that accepts a list of numbers and returns the sum of all elements in the list. Display the output.

# def sum_of_list(numbers):
#     total = 0
#     for num in numbers:
#         total += num
#     return total        
# numbers = list(map(float, input("Enter numbers separated by spaces: ").split()))
# result = sum_of_list(numbers)
# print("Sum of list elements:", result)

#---------------------------------------

# Write a Python program to perform the following operations: 
# • Create a list of 5 integers. 
# • Add one new element to the list. 
#  Convert the list into a tuple. 
# • Display both the list and the tuple.

# numbers = [10, 20, 30, 40, 50]
# numbers.append(60)

# num_tuple = tuple(numbers)

# print("List:", numbers)
# print("Tuple:", num_tuple)

#---------------------------------------
# . Write a Python program to create two sets with some common elements. Perform and display the following operations:
# •	Union
# •	Intersection
# •	Difference

# set1 = {1, 2, 3, 4, 5}
# set2 = {4, 5, 6, 7, 8}  
# union_set = set1.union(set2)
# intersection_set = set1.intersection(set2)
# difference_set = set1.difference(set2)
# print("Set 1:", set1)
# print("Set 2:", set2)   
# print("Union:", union_set)
# print("Intersection:", intersection_set)
# print("Difference (Set 1 - Set 2):", difference_set)

#---------------------------------------
#. Write a Python program to create a dictionary with student names as keys and their marks as values. Perform the following operations:
# •	Add a new student
# •	Update the marks of an existing student
# •	Display all students and their marks

# students = {
#     "Alice": 85,
#     "Bob": 90,
#     "Charlie": 78
# }
# students["David"] = 92
# students["Alice"] = 88
# print("Students and their marks:")
# for name, marks in students.items():
#     print(f"{name}: {marks}")   

#---------------------------------------

#Write a Python program to create a dictionary representing items and their prices. Create a function calculate_total(cart) that calculates and returns the total amount of all items. Display the final bill amount.

# Create a dictionary of items and their prices
items = {
    "Apple": 50,
    "Banana": 20,
    "Milk": 40,
    "Bread": 30,
    "Eggs": 60
}

# Function to calculate total amount
def calculate_total(cart):
    total = 0

    for item in cart:
        total += cart[item]

    return total

# Call the function
bill_amount = calculate_total(items)

# Display final bill
print("Items and Prices:", items)
print("Total Bill Amount: ₹", bill_amount)











