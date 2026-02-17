import json
data = {
    'Name': 'Alice',
    'Age': 20,
    'Place': 'Mumbai'
}

with open('students.csv', 'w') as file:
    json.dump(data, file)
    print("JSON data written to file successfully.")

with open('students.csv', 'r') as file:
    data = json.load(file)
print(data['Name'])