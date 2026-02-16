#1. Create a class called Circle. Add an attribute radius. After creating the object, assign the radius value. Create a method to calculate and print the area of the circle. Display the result in a proper sentence

# class Circle:
#     def __init__(self, radius):
#         self.radius = radius

#     def area(self):
#         area = 3.14 * (self.radius ** 2)
#         print(f"The area of the circle with radius {self.radius} is: {area:.2f}")

# circle1 = Circle(int(input("Enter the radius of the circle: ")))
# circle1.area()

#------------------------------------------

#Create a class called ExamResult. Add attributes student_name and marks. After creating the object, assign the values. Create a method that checks whether the student passed or failed:
# •	Pass if marks are greater than or equal to 40
# •	Fail if marks are less than 40
# Print a detailed result message.


class ExamResult:
    def __init__(self, student_name, marks):
        self.student_name = student_name
        self.marks = marks

    def check_result(self):
        if self.marks >= 40:
            print(f"{self.student_name} has passed with marks: {self.marks}")
        else:
            print(f"{self.student_name} has failed with marks: {self.marks}")
student_name = input("Enter the student's name: ") 
marks = int(input("Enter the students marks: "))
result = ExamResult(student_name, marks) 
result.check_result()
