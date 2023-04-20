radio.onReceivedNumber(function (receivedNumber) {
    basic.clearScreen()
    if (control.deviceSerialNumber() == receivedNumber) {
        if (team) {
            rnd = randint(0, 5)
            if (rnd == 0) {
                basic.showLeds(`
                    . # # # .
                    # # # # #
                    # # # # #
                    # # # # #
                    . # # # .
                    `)
            } else if (rnd == 1) {
                basic.showArrow(ArrowNames.North)
            } else if (rnd == 2) {
                basic.showArrow(ArrowNames.South)
            } else if (rnd == 3) {
                basic.showArrow(ArrowNames.West)
            } else if (rnd == 4) {
                basic.showArrow(ArrowNames.East)
            } else if (rnd == 5) {
                basic.showLeds(`
                    . # # # .
                    # # # # #
                    # # # # #
                    # # # # #
                    . # # # .
                    `)
            }
        } else {
            basic.showLeds(`
                . # # # .
                # # # # #
                # # # # #
                # # # # #
                . # # # .
                `)
        }
    }
})
input.onButtonPressed(Button.A, function () {
    if (!(running) && !(coach_mode)) {
        radio.sendString("add")
    } else if (!(running) && coach_mode) {
        running = true
        basic.showIcon(IconNames.Heart)
    }
})
input.onButtonPressed(Button.AB, function () {
    if (!(running) && !(coach_mode)) {
        coach_mode = true
        players = []
        basic.showString("Coach")
    }
})
radio.onReceivedString(function (receivedString) {
    if (receivedString == "add") {
        if (coach_mode) {
            if (players.indexOf(radio.receivedPacket(RadioPacketProperty.SerialNumber)) == -1) {
                players.push(radio.receivedPacket(RadioPacketProperty.SerialNumber))
                basic.showNumber(players.length)
            }
        }
    } else if (receivedString == "team") {
        team = true
    }
})
input.onButtonPressed(Button.B, function () {
    if (!(running) && !(coach_mode)) {
        radio.sendString("add")
    } else if (!(running) && coach_mode) {
        team = true
        radio.sendString("team")
        running = true
        basic.showIcon(IconNames.Triangle)
    } else if (running && coach_mode) {
        delay += 1
        basic.showNumber(delay)
        basic.pause(1000)
    }
})
let players: number[] = []
let rnd = 0
let team = false
let delay = 0
let running = false
let coach_mode = false
coach_mode = false
running = false
radio.setGroup(13)
radio.setTransmitSerialNumber(true)
delay = 1
team = false
basic.forever(function () {
    if (running) {
        radio.sendNumber(players._pickRandom())
        basic.showIcon(IconNames.Heart)
        for (let index = 0; index < delay; index++) {
            basic.pause(1000)
        }
        if (team) {
            basic.showIcon(IconNames.Triangle)
        } else {
            basic.showIcon(IconNames.SmallHeart)
        }
    }
})
