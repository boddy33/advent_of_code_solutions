import sys
import re

day1 = True

def main() -> None:
    print("Exec start")
    file_path = ''
    if sys.gettrace():
        file_path = "2016/day_3_1_debug.txt"
    else:
        file_path = "2016/day_3_1.txt"
    #open text file in read mode
    text_file = open(file_path, "r")
    #read whole file to a string
    data = text_file.read()
    arr = data.split('\n')
    cnt = 0

    for tri in arr:
        sides = re.findall(r'\d+', tri)
        sides = [eval(i) for i in sides]
        sides.sort()
        if (sides[0] + sides[1] > sides[2]):
            cnt += 1
    
    #close file
    text_file.close()
    print("Answer 1: " + str(cnt))
    #print("Answer 2: " + str(dup_loc_away))
    
    print("Exec end")


if __name__ == "__main__":
    main()