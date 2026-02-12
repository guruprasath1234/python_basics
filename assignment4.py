#1.	Write a Python program that accepts a list of integers from the user and uses conditional statements and a for loop to separate the numbers into two different lists: one containing prime numbers and the other containing non-prime numbers. Store the results in a dictionary with keys "Prime" and "Non-Prime" and print the dictionary.
def is_prime(num):
    if num < 2:
        return False
    for i in range(2, int(num**0.5) + 1):
        if num % i == 0:
            return False
    return True 
numbers = input("Enter a list of integers separated by spaces: ").split()
prime_numbers = []
non_prime_numbers = []
for num in numbers:
    if num.isdigit():
        num = int(num)
        if is_prime(num):
            prime_numbers.append(num)
        else:
            non_prime_numbers.append(num)
result = {"Prime": prime_numbers,
          "Non-Prime": non_prime_numbers}
print(result)

#-----------------------------------------


#2.	Write a Python program that defines a function analyze_data(data) which takes a list of numbers as input and returns a dictionary containing the following:
# •	Total count of elements
# •	Sum of elements
# •	Maximum value
# •	Minimum value
# Do not use built-in functions like max() or min(). Print the returned dictionary.

def analyze_data(data):
    total_count = len(data)
    total_sum = sum(data)
    max_value = data[0]
    min_value = data[0]
    for num in data:
        if num > max_value:
            max_value = num
        if num < min_value:
            min_value = num
    result = {
        "Total Count": total_count,
        "Sum": total_sum,
        "Maximum Value": max_value,
        "Minimum Value": min_value
    }
    return result
numbers = [3, 5, 7, 2, 8]
analysis_result = analyze_data(numbers)
print(analysis_result)

