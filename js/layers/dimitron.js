addLayer("d", {
    name: "Dimitron",
    symbol: "d",
    position: 0,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
        total: new Decimal(0),
    }},
    layerShown() { return player[this.layer].unlocked || hasUpgrade("m", 41) },
    color: "#00FFB9",
    requires: new Decimal(2e20),
    row: "2",
    resource: "Seconds",
    doReset(resettingLayer) {
        if(layers[resettingLayer].row <= this.row) return;
            let keep = []

            layerDataReset(this.layer, keep)
    },
    baseResource: "Money",
    baseAmount() {return player.m.points},
    type: "normal",
    tabFormat: [
        "main-display",
        "prestige-button",
        "resource-display",
        "total",
        "blank",
        "upgrades",
        "blank",
        "buyables",
        "blank",
        "milestones",
        "blank",
    ],
    roundUpCost: "true",
    exponent() {
         if (hasUpgrade("w", 15)) return 0.15
         else return 0.1
    },
    gainMult() {
        mult = new Decimal(1)
        if (hasUpgrade("w", 12)) mult = mult.times(upgradeEffect("w", 12))
        return mult
    },
    directMult() {
        mult = new Decimal(1)
        if (hasUpgrade("o", 11)) mult = mult.times(10)
        return mult
    },
    passiveGeneration() {
        if (hasUpgrade("o", 25)) return 0.5
        else return 0
    },
    canBuyMax() {return true},
    upgrades: {
        11: {
            unlocked() {return true},
            title: "Start stats",
            description: "x5 to PP, points and mafia XP gain",
            cost: new Decimal(1),
        },
        12: {
            unlocked() {return hasUpgrade("d", 11)},
            title: "Start stats v2",
            description: "PP and points are *1.01",
            cost: new Decimal(1),
        },
        13: {
            unlocked() {return hasUpgrade("d", 12)},
            title: "Cool mafia",
            description: "Mafia XP get boost based on total Dimitron points",
            cost: new Decimal(2),
            effect() {
                return new Decimal(player.d.total).plus(1)
            },
            effectDisplay() {return format(upgradeEffect("d", 13))+"x"},
        },
        14: {
            unlocked() {return hasUpgrade("d", 13)},
            title: "Start stats v2",
            description: "x1e100 to PP and points",
            cost: new Decimal(1),
        },   
        15: {
            unlocked() {return hasMilestone("d", 1)},
            title: "Gun",
            description: "kill kirill",
            tooltip: "С пистолетом вы можете убить Кирилла, что означает, что буллинг в сторону Сашки уменьшится, и вы сможете купить больше уровней босса",
            cost: new Decimal(2),
        },   
        21: {
            unlocked() {
                if (hasUpgrade("d", 21)) return false
                else return (player.d.total.gte(10))
            },
            title: "2nd row",
            description: "Unlocks 2nd row of dimitron upgrades",
            cost: new Decimal(0),
        },     
        31: {
            unlocked() { return hasUpgrade("d", 21)},
            title: "PP?Money?",
            description: "another x 1e100 to PP gain and x300 to money gain",
            cost: new Decimal(2),
        },   
        32: {
            unlocked() { return hasUpgrade("d", 21)},
            title: "hard",
            description: "all hardcaps x1e20",
            cost: new Decimal(4),
        },    
        33: {
            unlocked() { return hasUpgrade("d", 21)},
            title: "Smart",
            description: "prestige formula better",
            tooltip: "Вы умны, а поэтоиу делаете престиж формулу легче",
            cost: new Decimal(40),
        },   
        34: {
            unlocked() { return hasUpgrade("d", 21)},
            title: "Roblox",
            description: "+ 100 buy limit to Roblox nuyable and he's stronger now",
            tooltip: "Вы тратите время на роблокс, что позволяет вам стать, более могущественным",
            cost: new Decimal(100),
        },  
        35: {
            unlocked() { return hasUpgrade("d", 21)},
            title: "BOSS",
            description: "another + 10 to mafia BOSS buyable cap",
            cost: new Decimal(140),
        },  
        41: {
            unlocked() { 
                if (player.w.unlocked) return false
                else return  hasUpgrade("d", 35)
            },
            title: "waiting...",
            description: "Unlocks waiting(not currently in game)",
            cost: new Decimal(10000),
        },  
    },
    milestones: {
        0: {
            unlocked() {return hasUpgrade("d", 12)},
            requirementDescription: "3 total seconds",
            effectDescription: "keep PP upgrades on Dimitron",
            done() { return player.d.total.gte(3) },
        },
        1: {
            unlocked() {return player.d.total.gte(6)},
            requirementDescription: "6 total seconds",
            effectDescription: "you automatically get IQ",
            done() { return player.d.total.gte(6) },
        },
        2: {
            unlocked() {return hasUpgrade("d", 15)},
            requirementDescription: "9 total seconds",
            effectDescription: "you automatically get money",
            done() { return player.d.total.gte(9) },
        },
        3: {
            unlocked() {return player.d.total.gte(29)},
            requirementDescription: "30 total seconds",
            effectDescription: "keep buyable level on reset",
            done() { return player.d.total.gte(29) },
        },
        4: {
            unlocked() {return player.d.total.gte(30)},
            requirementDescription: "70 total seconds",
            effectDescription: "keep kirill upgrades on reset",
            done() { return player.d.total.gte(70) },
        },
        5: {
            unlocked() {return player.d.total.gte(10000)},
            requirementDescription: "10000 total seconds",
            effectDescription: "keep money upgrades and mafia level on reset",
            done() { return player.d.total.gte(10000) },
        },
    },
})
