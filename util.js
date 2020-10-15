const ENTER_KEY_CODE = 13
const TERMINAL_SELECTOR = "#terminal"
const TEXT_COMPRESSOR = 0.5
const MAX_BUTTONS_NO = document.getElementsByClassName("term-button").length
var mode = "C"
var buttons = document.getElementsByClassName("term-button")

const defaultActions = [
        {
            action: "play", 
            label: "Play the game"
        },
        {
            action: "h2p", 
            label: "How to play"
        },
        {
            action: "help", 
            label: "Terminal help"
        },
        {
            action: "about", 
            label: "About the game"
        },
    ]

var actions = defaultActions

function renderButtons() {
    for (let button in actions) {
        console.log(button, actions[button], actions[button]["action"])
        if (actions[button]["action"] == "" || actions[button]["action"] == undefined) {
            console.log("hiding")
            buttons[button].style.display = "none"
        } else {
            console.log("showing")
            buttons[button].style.display = "initial"
            buttons[button].innerHTML = actions[button]["label"]
        }
    }
    resizeButtons()
}

function commandInput() {
    return document.getElementsByTagName("input")[0] 
}
function requestInput() {
    return document.getElementsByTagName("input")[1]
}

function termDiv() {
    return document.querySelector(TERMINAL_SELECTOR)
}

function simulateEnter(where) {
    console.log("SimulateEnter", where)
    switch(where) {
    case "c":
        return commandInput().dispatchEvent(new KeyboardEvent('keyup', {'keyCode': ENTER_KEY_CODE}));
    case "r":
        return requestInput().dispatchEvent(new KeyboardEvent('keyup', {'keyCode': ENTER_KEY_CODE}));
    default: 
        return requestInput().dispatchEvent(new KeyboardEvent('keyup', {'keyCode': ENTER_KEY_CODE}));
        }
    renderButtons()
}

function sendKey(where, key) {
    console.log("SendKey", where, key)
    switch(where) {
        case "c":
            return commandInput().value+=key
        case "r": 
            return requestInput().value+=key
        default:
            return requestInput().value+=key

    }
}

function simulateInput(where, string) {
    console.log("SimulateInput", where, string)
    for (let key of string) {
        sendKey(where, key)
    }
    simulateEnter(where)
}

function resizeButtons() {
    // jQuery("#btn1").fitText(TEXT_COMPRESSOR)
    // jQuery("#btn2").fitText(TEXT_COMPRESSOR)
    // jQuery("#btn3").fitText(TEXT_COMPRESSOR)
    // jQuery("#btn4").fitText(TEXT_COMPRESSOR)
}

function buttonPress(buttonNo) {
    console.log("ButtonPress", buttonNo)
    modeCheck()
    if (!(buttonNo > MAX_BUTTONS_NO || buttonNo < 1)) {
        simulateInput(mode, actions[buttonNo-1]["action"])
    }
}

function modeCheck() {
    var ci = window.getComputedStyle(commandInput());

    if (ci.display == "block") {
        mode = "c"
    } else {
        mode = "r"
    }

    console.log("mode", mode)
}