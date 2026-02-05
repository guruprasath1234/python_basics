# for i in range(5):
#     print('GT',i)

# for i in range(1,6):
#     print('good')


# fruits=['apple','banana','mango']
# for a in fruits:
#     print(a)

# food=['pizza','burger','pasta']
# for i in food:
#     print(i)

#-- -----------------------------------------------------

# for i in range(2,32,2):
#     print(i)

# for i in 'good':
#     print(i)    

# for i in range(1,100):
#     if i==88:
#         break
#     print(i)

#-- -----------------------------------------------------

# a=1
# while a==5:
#     print('later we will take')
#     a+1

#-- -----------------------------------------------------

# sum=1
# # for i in range(1,11):
# #     sum=sum*i
# # print(sum)
# i=20

# while i<=10:
#     sum=sum+i
#     i+=1
# print(sum)

#-- -----------------------------------------------------


# year=int(input("Enter year: "))
# if (year%4==0 and year%100!=0) or (year%400==0):
#     print(year,"is a leap year")
# else:    
#     print(year,"is not a leap year")

#-----------------------------------------------------

# a=int(input("Enter a number: "))
# b=int(input("Enter b number: "))
# c=int(input("Enter c number: "))
# if a<b:
#     a=b
# if a<c:
#     a=c
# print(a,"is greatest")

# # -----------------------------------------------------

# a=int(input("Enter a number: "))
# b=int(input("Enter b number: "))
# c=int(input("Enter c number: "))

# if(a==b==c):
#     print("equal")
# elif a>=b and a>=c:
#     print(a,"is greatest")
# elif b>=a and b>=c:
#     print(b,"is greatest")
# else:
#     print(c,"is greatest")

# -----------------------------------------------------


# for i in range(2,12):
#     print(i*i)


#----------------------------------------------------------

n=input("Enter a number: ")

for i in range(1,11):
    print(n,'*',i,'=',int(n)*i)