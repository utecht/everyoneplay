import redis
import time
import os

r = redis.StrictRedis(host='localhost', port=6379, db=0)

def get_highest():
    buttons = r.hgetall('button')
    r.delete('button')

    highest_num = 0
    highest = None 
    for b in buttons.keys():
        if int(buttons[b]) > highest_num:
            highest = b
            highest_num = int(buttons[b])
    return highest

# here we need to a sleeping loop that calls xkeysend on get_highest()
while True:
    key = get_highest()
    if key:
        print(key)
        os.system("DISPLAY=:0 xdotool keydown '{}'".format(key.decode("utf-8")))
    time.sleep(.1)
    if key:
        os.system("DISPLAY=:0 xdotool keyup '{}'".format(key.decode("utf-8")))


if __name__ == '__main__':
    print(get_highest())
