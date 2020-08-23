function checkLeftRight () {
    if (input.rotation(Rotation.Roll) < -1 * tiltThreshold) {
        tiltLeftRight = -1
    } else if (input.rotation(Rotation.Roll) > tiltThreshold) {
        tiltLeftRight = 1
    } else {
        tiltLeftRight = 0
    }
}
function getTiltDirection () {
    if (tiltForwardBack == 1) {
        if (tiltLeftRight == -1) {
            moveDirection = 1
        } else if (tiltLeftRight == 1) {
            moveDirection = 3
        } else {
            moveDirection = 2
        }
    } else if (tiltForwardBack == -1) {
        if (tiltLeftRight == -1) {
            moveDirection = 6
        } else if (tiltLeftRight == 1) {
            moveDirection = 8
        } else {
            moveDirection = 7
        }
    } else {
        if (tiltLeftRight == -1) {
            moveDirection = 4
        } else if (tiltLeftRight == 1) {
            moveDirection = 5
        } else {
            moveDirection = 0
        }
    }
}
function checkForwardBack () {
    if (input.rotation(Rotation.Pitch) < -1 * tiltThreshold) {
        tiltForwardBack = 1
    } else if (input.rotation(Rotation.Pitch) > tiltThreshold) {
        tiltForwardBack = -1
    } else {
        tiltForwardBack = 0
    }
}
function offScreen () {
    if (moveDirection == 1) {
        xDot += 1
        yDot += 1
        if (yDot == 0) {
            yDot = 4 - xDot
            xDot = 4
        } else if (xDot == 0) {
            xDot = 4 - yDot
            yDot = 4
        } else {
        	
        }
    } else if (moveDirection == 2) {
        yDot = 4
    } else if (moveDirection == 3) {
        xDot += -1
        yDot += 1
        xDotTemp = xDot
        yDotTemp = yDot
        xDot = yDotTemp
        yDot = xDotTemp
    } else if (moveDirection == 4) {
        xDot = 4
    } else if (moveDirection == 5) {
        xDot = 0
    } else if (moveDirection == 6) {
        xDot += 1
        yDot += -1
        xDotTemp = xDot
        yDotTemp = yDot
        xDot = yDotTemp
        yDot = xDotTemp
    } else if (moveDirection == 7) {
        yDot = 0
    } else if (moveDirection == 8) {
        xDot += -1
        yDot += -1
        if (yDot == 4) {
            yDot = 4 - xDot
            xDot = 0
        } else if (xDot == 4) {
            xDot = 4 - yDot
            yDot = 0
        } else {
        	
        }
    } else {
    	
    }
    led.toggle(xDot, yDot)
}
function moveDot () {
    led.toggle(xDot, yDot)
    if (moveDirection == 1) {
        xDot += -1
        yDot += -1
    } else if (moveDirection == 2) {
        yDot += -1
    } else if (moveDirection == 3) {
        xDot += 1
        yDot += -1
    } else if (moveDirection == 4) {
        xDot += -1
    } else if (moveDirection == 5) {
        xDot += 1
    } else if (moveDirection == 6) {
        xDot += -1
        yDot += 1
    } else if (moveDirection == 7) {
        yDot += 1
    } else if (moveDirection == 8) {
        xDot += 1
        yDot += 1
    } else {
        xDot += 0
        yDot += 0
    }
    if (xDot >= 0 && xDot <= 4 && (yDot >= 0 && yDot <= 4)) {
        led.toggle(xDot, yDot)
    } else {
        offScreen()
    }
}
let yDotTemp = 0
let xDotTemp = 0
let moveDirection = 0
let tiltForwardBack = 0
let tiltLeftRight = 0
let tiltThreshold = 0
let yDot = 0
let xDot = 0
xDot = 2
yDot = 2
let onEdge = 0
tiltThreshold = 20
led.toggle(xDot, yDot)
basic.forever(function () {
    checkForwardBack()
    checkLeftRight()
    getTiltDirection()
    moveDot()
    basic.pause(500)
})
