# try:
#     num=int(input("Enter a number: "))
#     print(2/num)
# except ZeroDivisionError:
#     print("Error")
# except ValueError:
#     print("Invalid input")
# finally:
#     print("This will always execute")

#--------------------------------------

try:
    print("welcome to ATM")
    print("Insert your card")
    amount = int(input("enter the amount to withdraw: "))
    balance = int(input("balance about :"))

    if balance<=amount:
        raise Exception("insufficient balance")
    elif amount<=0:
        raise Exception("Invalid amount")
    elif amount<balance:
        balance -= amount
        print("Please collect your cash")
        print("Remaining balance:", balance)
    
except Exception as e:
    print("Error:", e)      

finally:
    print("thank you for using our ATM")

