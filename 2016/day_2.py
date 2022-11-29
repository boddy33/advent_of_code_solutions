import sys

day1 = False

def main() -> None:
    print("Exec start")
    file_path = ''
    if sys.gettrace():
        file_path = "2016/day_2_1_debug.txt"
    else:
        file_path = "2016/day_2_1.txt"
    #open text file in read mode
    text_file = open(file_path, "r")
    #read whole file to a string
    data = text_file.read()
    arr = data.split('\n')
    pos = '5'
    code = ''
    for line in arr:
        for command in line:
            pos = next(pos, command) if day1 else next2(pos, command)
        code += pos
    
    #close file
    text_file.close()
    print("Answer 1: " + code)
    #print("Answer 2: " + str(dup_loc_away))
    
    print("Exec end")

"""
  1  
 234 
56789
 ABC
  D  
"""
def next2(pos, command):
    if command == 'L':
        if pos == '1' or pos == '2' or pos == '5' or pos == 'A' or pos == 'D':
            return pos
        elif pos == 'B':
            return 'A'
        elif pos == 'C':
            return 'B'
        else:
            return str(int(pos)-1)
    elif command == 'R':
        if pos == '1' or pos == '4' or pos == '9' or pos == 'C' or pos == 'D':
            return pos
        elif pos == 'A':
            return 'B'
        elif pos == 'B':
            return 'C'
        else:
            return str(int(pos)+1)
    elif command == 'U':
        if pos == '5' or pos == '2' or pos == '1' or pos == '4' or pos == '9':
            return pos
        elif pos == '3':
            return '1'
        elif pos == 'D':
            return 'B'
        elif pos == 'A':
            return '6'
        elif pos == 'B':
            return '7'
        elif pos == 'C':
            return '8'
        else:
            return str(int(pos)-4)
    else:
        if pos == '5' or pos == 'A' or pos == 'D' or pos == 'C' or pos == '9':
            return pos
        elif pos == 'B':
            return 'D'
        elif pos == '6':
            return 'A'
        elif pos == '7':
            return 'B'
        elif pos == '8':
            return 'C'
        elif pos == '1':
            return '3'
        else:
            return str(int(pos)+4)

"""
123
456
789
"""
def next(pos, command):
    if command == 'L':
        if pos == 1 or pos == 4 or pos == 7:
            return pos
        else:
            return pos-1
    elif command == 'R':
        if pos == 3 or pos == 6 or pos == 9:
            return pos
        else:
            return pos+1
    elif command == 'U':
        if pos == 1 or pos == 2 or pos == 3:
            return pos
        else:
            return pos-3
    else:
        if pos == 7 or pos == 8 or pos == 9:
            return pos
        else:
            return pos+3

if __name__ == "__main__":
    main()