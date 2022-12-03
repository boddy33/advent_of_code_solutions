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
    ptr = 0

    for i in range(0, len(arr) // 3):
        strGroup = [arr[ptr],arr[ptr+1],arr[ptr+2]]
        strGroup = stringGroupToTriArrList(strGroup)
        for sides in strGroup:
            sides.sort()
            if (sides[0] + sides[1] > sides[2]):
                cnt += 1
        ptr += 3
     
    #close file
    text_file.close()
    print("Answer 1: " + str(cnt))
    #print("Answer 2: " + str(dup_loc_away))
    
    print("Exec end")

def stringGroupToTriArrList(strGroup):
    arr1 = re.findall(r'\d+', strGroup[0])
    arr1 = [eval(i) for i in arr1]
    arr2 = re.findall(r'\d+', strGroup[1])
    arr2 = [eval(i) for i in arr2]
    arr3 = re.findall(r'\d+', strGroup[2])
    arr3 = [eval(i) for i in arr3]

    return [[arr1[0],arr2[0],arr3[0]],[arr1[1],arr2[1],arr3[1]],[arr1[2],arr2[2],arr3[2]]]

if __name__ == "__main__":
    main()