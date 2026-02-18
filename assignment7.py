# 1. You are given a CSV file named students.csv containing:
# id,name,marks
# 1,Anu,85
# 2,Ravi,45
# 3,Meena,72
# 4,Kiran,30

# Perform the following:
# 1.	Read the CSV file.
# 2.	Display only students who scored more than 50.
# 3.	Count how many students failed (marks < 50).

import csv

data = [
    ["id", "name", "marks"],
    [1, "Anu", 85],
    [2, "Ravi", 45],
    [3, "Meena", 72],
    [4, "Kiran", 30]
]

with open("students.csv", "w", newline="") as file:
    writer = csv.writer(file)
    writer.writerows(data)

print("Data inserted into students.csv\n")

with open('students.csv', 'r') as file:
    reader = csv.DictReader(file)
    
    passed_students = []
    failed_count = 0
    
    for row in reader:
        marks = int(row['marks'])
        
        if marks > 50:
            passed_students.append(row)
        
        if marks < 50:
            failed_count += 1

print("Students who scored more than 50:")
for student in passed_students:
    print(student['id'], student['name'], student['marks'])

print("\nNumber of students failed:", failed_count)

