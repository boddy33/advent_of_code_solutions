def main() -> None:
    print("Exec start")

    #open text file in read mode
    text_file = open("2016/day_1_1.txt", "r")
    #read whole file to a string
    data = text_file.read()
    arr = data.split(', ')
    coord_y = 0
    coord_x = 0
    dir = 'N'
    history = [(0, 0)]
    dup_loc_found = 0
    dup_loc_away = 0

    for next in arr:
        x_changed = 0
        val_increased = 0
        if next[0] == 'L':       
            if dir == 'N':
                coord_x -= int(next[1:])
                dir = 'W'
                x_changed = 1
            elif dir == 'S':
                coord_x += int(next[1:])
                dir = 'E'
                x_changed = 1
                val_increased = 1
            elif dir == "W":
                coord_y -= int(next[1:])
                dir = 'S'
            elif dir == "E":
                coord_y += int(next[1:])
                dir = 'N'
                val_increased = 1
        if next[0] == 'R':
            if dir == 'N':
                coord_x += int(next[1:])
                dir = 'E'
                x_changed = 1
                val_increased = 1
            elif dir == 'S':
                coord_x -= int(next[1:])
                dir = 'W'
                x_changed = 1
            elif dir == "W":
                coord_y += int(next[1:])
                dir = 'N'
                val_increased = 1
            elif dir == "E":
                coord_y -= int(next[1:])
                dir = 'S'
        if not dup_loc_found:
            if x_changed:
                last_x = history[-1][0]
                if val_increased:
                    for i in range(last_x + 1, coord_x+1):
                        if ((i, coord_y) in history):
                            dup_loc_found = 1
                            dup_loc_away = abs(i) + abs(coord_y)
                            break
                        else:
                            history.append((i, coord_y))
                else:
                    for i in range(last_x - 1, coord_x-1,-1):
                        if ((i, coord_y) in history):
                            dup_loc_found = 1
                            dup_loc_away = abs(i) + abs(coord_y)
                            break
                        else:
                            history.append((i, coord_y))   
            else:
                last_y = history[-1][1]
                if val_increased:
                    for i in range(last_y + 1, coord_y+1):
                        if ((coord_x, i) in history):
                            dup_loc_found = 1
                            dup_loc_away = abs(coord_x) + abs(i)
                            break
                        else:
                            history.append((coord_x, i))
                else:
                    for i in range(last_y - 1, coord_y-1,-1):
                        if ((coord_x, i) in history):
                            dup_loc_found = 1
                            dup_loc_away = abs(coord_x) + abs(i)
                            break
                        else:
                            history.append((coord_x, i))


    #close file
    text_file.close()
    print("Answer 1: " + str((abs(coord_x)+abs(coord_y))))
    print("Answer 2: " + str(dup_loc_away))
    
    print("Exec end")

if __name__ == "__main__":
    main()