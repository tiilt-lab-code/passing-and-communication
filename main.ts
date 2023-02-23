radio.onReceivedNumber(function (receivedNumber) {
    basic.clearScreen()
    pins.digitalWritePin(DigitalPin.P0, 0)
    if (control.deviceSerialNumber() == receivedNumber) {
        basic.showLeds(`
            . # # # .
            # # # # #
            # # # # #
            # # # # #
            . # # # .
            `)
        pins.digitalWritePin(DigitalPin.P0, 1)
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
        basic.showString("C")
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
input.onButtonPressed(Button.B, function () {
    if (coach_mode) {
        delay += 1
        basic.showNumber(delay)
        basic.pause(1000)
    }
})
let players: number[] = []
let delay = 0
let running = false
let coach_mode = false
coach_mode = false
running = false
radio.setGroup(13)
radio.setTransmitSerialNumber(true)
delay = 1
basic.forever(function () {
    if (running) {
        radio.sendNumber(players._pickRandom())
        basic.showIcon(IconNames.Heart)
        for (let index = 0; index < delay; index++) {
            basic.pause(1000)
        }
        basic.showIcon(IconNames.SmallHeart)
    }
})
