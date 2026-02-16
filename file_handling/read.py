a = open('data.txt', 'w')
a.write('Your new content here')
a.close()

a = open('data.txt', 'a')
a.write('\nAppended content here')
a.close()

a = open('data.txt', 'r')
print(a.read())
a.close()