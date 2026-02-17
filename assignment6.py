# Inheritance:
# 1. Create a base class called Employee.
# •	The class should contain attributes: name and salary.
# •	Create a method to display employee details.
# Now create a derived class called Manager that inherits from Employee.
# •	Add an additional attribute called department.
# •	Create a method to display manager details including department.
# •	Create an object of Manager and display all details.

class Employee:
    def __init__(self, name, salary):
        self.name = name
        self.salary = salary

    def display_employee_details(self):
        print(f"Employee Name: {self.name}")
        print(f"Employee Salary: {self.salary}")

class Manager(Employee):
    def __init__(self, name, salary, department):
        super().__init__(name, salary)
        self.department = department

    def display_manager_details(self):
        self.display_employee_details()
        print(f"Manager Department: {self.department}")


# 2. Create a class called Book.
# •	The class should have attributes: title and price.
# •	Use special method __add__() to add the prices of two books.
# •	Use special method __str__() to display book details properly.
# Create two book objects.
# •	Add both objects using + operator.
# •	Display total price.
# •	Print book details using print() function.

class Book:
    def __init__(self, title, price):
        self.title = title
        self.price = price

    def __add__(self, other):
        if isinstance(other, Book):
            return self.price + other.price
        return NotImplemented

    def __str__(self):
        return f"Book Title: {self.title}, Price: {self.price}"
    
book1 = Book("Book One", 10)
book2 = Book("Book Two", 15)    
total_price = book1 + book2
print(f"Total Price of both books: {total_price}")
print(book1)
print(book2)    

