import sys
import re

day1 = True

#aaaaa-bbb-z-y-x-123[abxyz]
def main() -> None:
    print("Exec start")
    file_path = ''
    if sys.gettrace():
        file_path = "2016/day_4_2_debug.txt"
    else:
        file_path = "2016/day_4_1.txt"
    #open text file in read mode
    text_file = open(file_path, "r")
    #read whole file to a string
    data = text_file.read()
    arr = data.split('\n')
    sum = 0

    for room in arr:
        dataOld = strToDataOld(room)
        data = strToData(room)  
        if nameToChecksum(dataOld[0]) == dataOld[2] or sys.gettrace():
            for word in data[0]:
                print(decypher(word, data[1]), end = ' ')
            print(data[1])
    
    #close file
    text_file.close()
    print("Answer 1: " + str(sum))
    #print("Answer 2: " + str(dup_loc_away))
    
    print("Exec end")

def strToDataOld(room):
    cnt = room.count('-')
    strArr = room.split('-')
    nameStr = ''
    sector = 0
    checksum = ''
    for i in range(0, cnt+1):
        if i < cnt:
            nameStr += strArr[i]
        else:
            subArr = strArr[i].split('[')
            sector = int(subArr[0])
            checksum = subArr[1][:-1]
    nameStr = ''.join(nameStr)
    return(nameStr, sector, checksum)

def decypher(roomName, sector):
    decyphered = ''
    cnt = 0

    for letter in roomName:
        for i in range (0, sector):
            if letter == 'z':
                letter = 'a'
            else:
                letter = next_alpha(letter)
        decyphered += letter
    return decyphered

def next_alpha(s):
    return chr((ord(s.upper())+1 - 65) % 26 + 65).lower()

def nameToChecksum(name):
    myDict = dict(sorted(nameDict(name).items(), reverse=False))
    maxValue = max(myDict.values())
    checksum = ''

    for i in range(maxValue, 0, -1):
        for key in myDict:
            if len(checksum) == 5:
                break
            if myDict[key] == i:
                checksum += key

    return checksum

def nameDict(name):
    myDict = {}
    for i in range (0,len(name)):
        if name[i] in myDict.keys():
            myDict[name[i]] = myDict[name[i]]+1
        else:
            myDict[name[i]] = 1
    return myDict

def strToData(room):
    cnt = room.count('-')
    strArr = room.split('-')
    nameList = []
    sector = 0
    checksum = ''
    for i in range(0, cnt+1):
        if i < cnt:
            nameList.append(strArr[i])
        else:
            subArr = strArr[i].split('[')
            sector = int(subArr[0])
            checksum = subArr[1][:-1]
    return(nameList, sector, checksum)

if __name__ == "__main__":
    main()