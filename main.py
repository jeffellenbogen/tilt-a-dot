def checkLeftRight():
    global tiltLeftRight
    if input.rotation(Rotation.ROLL) < -1 * tiltThreshold:
        tiltLeftRight = -1
    elif input.rotation(Rotation.ROLL) > tiltThreshold:
        tiltLeftRight = 1
    else:
        tiltLeftRight = 0
def getTiltDirection():
    global moveDirection
    if tiltForwardBack == 1:
        if tiltLeftRight == -1:
            moveDirection = 1
        elif tiltLeftRight == 1:
            moveDirection = 3
        else:
            moveDirection = 2
    elif tiltForwardBack == -1:
        if tiltLeftRight == -1:
            moveDirection = 6
        elif tiltLeftRight == 1:
            moveDirection = 8
        else:
            moveDirection = 7
    elif tiltLeftRight == -1:
        moveDirection = 4
    elif tiltLeftRight == 1:
        moveDirection = 5
    else:
        moveDirection = 0
def checkForwardBack():
    global tiltForwardBack
    if input.rotation(Rotation.PITCH) < -1 * tiltThreshold:
        tiltForwardBack = 1
    elif input.rotation(Rotation.PITCH) > tiltThreshold:
        tiltForwardBack = -1
    else:
        tiltForwardBack = 0
def offScreen():
    global xDot, yDot, xDotTemp, yDotTemp
    if moveDirection == 1:
        xDot += 1
        yDot += 1
        if yDot == 0:
            yDot = 4 - xDot
            xDot = 4
        elif xDot == 0:
            xDot = 4 - yDot
            yDot = 4
        else:
            pass
    elif moveDirection == 2:
        yDot = 4
    elif moveDirection == 3:
        xDot += -1
        yDot += 1
        xDotTemp = xDot
        yDotTemp = yDot
        xDot = yDotTemp
        yDot = xDotTemp
    elif moveDirection == 4:
        xDot = 4
    elif moveDirection == 5:
        xDot = 0
    elif moveDirection == 6:
        xDot += 1
        yDot += -1
        xDotTemp = xDot
        yDotTemp = yDot
        xDot = yDotTemp
        yDot = xDotTemp
    elif moveDirection == 7:
        yDot = 0
    elif moveDirection == 8:
        xDot += -1
        yDot += -1
        if yDot == 4:
            yDot = 4 - xDot
            xDot = 0
        elif xDot == 4:
            xDot = 4 - yDot
            yDot = 0
        else:
            pass
    else:
        pass
    led.toggle(xDot, yDot)
def moveDot():
    global xDot, yDot
    led.toggle(xDot, yDot)
    if moveDirection == 1:
        xDot += -1
        yDot += -1
    elif moveDirection == 2:
        yDot += -1
    elif moveDirection == 3:
        xDot += 1
        yDot += -1
    elif moveDirection == 4:
        xDot += -1
    elif moveDirection == 5:
        xDot += 1
    elif moveDirection == 6:
        xDot += -1
        yDot += 1
    elif moveDirection == 7:
        yDot += 1
    elif moveDirection == 8:
        xDot += 1
        yDot += 1
    else:
        xDot += 0
        yDot += 0
    if xDot >= 0 and xDot <= 4 and (yDot >= 0 and yDot <= 4):
        led.toggle(xDot, yDot)
    else:
        offScreen()
yDotTemp = 0
xDotTemp = 0
moveDirection = 0
tiltForwardBack = 0
tiltLeftRight = 0
tiltThreshold = 0
yDot = 0
xDot = 0
xDot = 2
yDot = 2
tiltThreshold = 10
led.toggle(xDot, yDot)

def on_forever():
    checkForwardBack()
    checkLeftRight()
    getTiltDirection()
    moveDot()
    basic.pause(200)
basic.forever(on_forever)
