input.onPinPressed(TouchPin.P0, function () {
    if (awaitingInput == true) {
        currentArea = Decision1
        changingAreas = true
    }
})
input.onPinPressed(TouchPin.P2, function () {
    if (awaitingInput == true) {
        if (Decision3 != "none") {
            currentArea = Decision3
            changingAreas = true
        }
    }
})
function basicFight () {
    currentEnemy = enemy_list._pickRandom()
    enemyHP = randint(playerMaxHP - 25, playerMaxHP + 25)
    enemyAttack = playerAttack - 5
    playerCurrentHP = playerMaxHP
    serial.writeLine("<________________>")
    serial.writeLine("A wild " + currentEnemy + " attacks you!")
    while (playerCurrentHP > 0 && enemyHP > 0) {
        serial.writeLine("<________________>")
        damage = randint(enemyAttack, enemyAttack + 5)
        playerCurrentHP = playerCurrentHP - damage
        serial.writeLine("The " + currentEnemy + " attacks for " + damage + " damage!")
        serial.writeLine("You have " + Math.max(playerCurrentHP, 0) + " health left.")
        damage = randint(playerAttack, playerAttack + 5)
        enemyHP = enemyHP - damage
        serial.writeLine("You attack for " + damage + " damage!")
        serial.writeLine("The " + currentEnemy + " has " + Math.max(enemyHP, 0) + " health left.")
        serial.writeLine("Press 1 to continue.")
        basic.pause(500)
        while (!(input.pinIsPressed(TouchPin.P0))) {
        	
        }
    }
    if (playerCurrentHP <= 0) {
        serial.writeLine("You lost! You return to camp with no rewards.")
        serial.writeLine("Press 1 to continue.")
    } else {
        reward = randint(0, playerMaxHP)
        gold += reward
        serial.writeLine("You win! You return to camp with an extra " + reward + " gold!")
        serial.writeLine("Press 1 to continue.")
    }
}
input.onPinPressed(TouchPin.P1, function () {
    if (awaitingInput == true) {
        if (Decision2 != "none") {
            currentArea = Decision2
            changingAreas = true
        }
    }
})
function SetOption (Option: number, Decision: string) {
    if (Option == 1) {
        Decision1 = Decision
    } else if (Option == 2) {
        Decision2 = Decision
    } else {
        Decision3 = Decision
    }
}
let Decision2 = ""
let reward = 0
let damage = 0
let playerCurrentHP = 0
let currentEnemy = ""
let Decision3 = ""
let Decision1 = ""
let awaitingInput = false
let enemy_list: string[] = []
let playerMaxHP = 0
let enemyHP = 0
let enemyAttack = 0
let playerAttack = 0
let changingAreas = false
let currentArea = ""
currentArea = "start"
changingAreas = true
let gold = 0
playerAttack = 15
enemyAttack = 0
enemyHP = 0
playerMaxHP = 100
enemy_list = [
"reef shark",
"chimera",
"griffin",
"earth elemental",
"yeti"
]
basic.forever(function () {
    if (changingAreas == true) {
        if (currentArea == "start") {
            changingAreas = false
            awaitingInput = false
            serial.writeLine("Welcome to Micro:Bit Text Adventure!")
            serial.writeLine("Press 1 for a tutorial.")
            serial.writeLine("Press 2 to skip the tutorial.")
            SetOption(1, "tutorial")
            SetOption(2, "mainMenu")
            SetOption(3, "none")
            awaitingInput = true
        } else if (currentArea == "tutorial") {
            changingAreas = false
            awaitingInput = false
            serial.writeLine("<________________>")
            serial.writeLine("TUTORIAL")
            serial.writeLine("Whenever the program lists choices, press the pin that matches the decision you want to make.")
            serial.writeLine("Press 1 to begin.")
            SetOption(1, "mainMenu")
            SetOption(2, "none")
            SetOption(3, "none")
            awaitingInput = true
        } else if (currentArea == "mainMenu") {
            changingAreas = false
            awaitingInput = false
            serial.writeLine("<________________>")
            serial.writeLine("CAMPGROUND")
            serial.writeLine("Press 1 for the shop.")
            serial.writeLine("Press 2 to battle.")
            SetOption(1, "shop")
            SetOption(2, "battle")
            SetOption(3, "none")
            awaitingInput = true
        } else if (currentArea == "shop") {
            changingAreas = false
            awaitingInput = false
            serial.writeLine("<________________>")
            serial.writeLine("SHOP")
            serial.writeLine("You have " + gold + " gold.")
            serial.writeLine("Press 1 to look at weapons.")
            serial.writeLine("Press 2 to look at armor.")
            serial.writeLine("Press 3 to go back.")
            SetOption(1, "weaponsShop")
            SetOption(2, "armorShop")
            SetOption(3, "mainMenu")
            awaitingInput = true
        } else if (currentArea == "battle") {
            changingAreas = false
            awaitingInput = false
            basicFight()
            SetOption(1, "mainMenu")
            SetOption(2, "none")
            SetOption(3, "none")
            awaitingInput = true
        } else {
        	
        }
    }
})
