radio.onReceivedNumber(function (receivedNumber) {
    basic.clearScreen()
    if (control.deviceSerialNumber() == receivedNumber) {
        basic.showLeds(`
            . # # # .
            # # # # #
            # # # # #
            # # # # #
            . # # # .
            `)
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
    if (coach_mode) {
        if (players.indexOf(radio.receivedPacket(RadioPacketProperty.SerialNumber)) == -1) {
            players.push(radio.receivedPacket(RadioPacketProperty.SerialNumber))
            basic.showNumber(players.length)
        }
    }
})
let players: number[] = []
let running = false
let coach_mode = false
coach_mode = false
running = false
radio.setGroup(13)
radio.setTransmitSerialNumber(true)
basic.forever(function () {
    if (running) {
        radio.sendNumber(players._pickRandom())
        basic.showIcon(IconNames.Heart)
        basic.pause(1000)
        basic.pause(1000)
        basic.showIcon(IconNames.SmallHeart)
        basic.pause(1000)
    }
})
