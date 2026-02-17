import csv
import json
with open('students.csv' , 'w',newline='') as file:
    writer = csv.writer(file)
    writer.writerow(['Name','Age','Place'])
    writer.writerow(['Alice',20,'mumbai'])
    writer.writerow(['Bob',22,'chennai'])
    writer.writerow(['Charlie',21,'delhi'])

print("CSV file created successfully.")

with open('students.csv', 'r') as file:
    reader = csv.reader(file)
    for row in reader:
        print(row)

