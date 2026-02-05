# x="hello"
# y="bye"

# a=x+y
# print(a)
# print(type(a))


# num=int(input("Enter a number: "))
# if num==0:
#     print("The number is zero.")
# if num>0:
#     print("The number is positive.")    
# if num<0:
#     print("The number is negative.")

name=str(input("Enter your name: "))
age=int(input("Enter your age: "))
marital_status=str(input("Enter your marital status: "))
employment_status=str(input("Enter your employment status: "))
gender=str(input("Enter your gender: "))
location=str(input("Enter your location: "))

if gender=="Male":
     print(f"Hello Mr. {name}, your age is {age}, your application indicates your marital status is {marital_status}, your employment status show your are working at Google as {employment_status}, your gender is {gender}, and you currentlylive in {location}.")
else:
     print(f"Hello Ms. {name}, your age is {age}, your application indicates your marital status is {marital_status}, your employment status show your are working at Google as {employment_status}, your gender is {gender}, and you currentlylive in {location}.")