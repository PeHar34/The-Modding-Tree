addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    doReset(resettingLayer) {
        let keep = []
      
        if(hasMilestone("k", 0))keep.push(11, 12, 13, 14, 15, 21)
        if(hasMilestone("k", 1))keep.push(31, 32, 33, 34, 35, 41)
        if(layers[resettingLayer].row > this.row) layerDataReset(this.layer, keep) 

        player[this.layer].upgrades = keep
    },
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('p', 13)) mult = mult.times(upgradeEffect('p', 13))
        if (hasUpgrade('p', 32)) mult = mult.times(10)
        if (hasUpgrade('k', 11)) mult = mult.times(2)
        if (hasUpgrade('k', 12)) mult = mult.times(2)
        if (hasUpgrade("k", 14)) mult = mult.times(upgradeEffect("k", 14))
        if (hasUpgrade('k', 13)) mult = mult.times(100)
        if (hasUpgrade('p', 34)) mult = mult.pow(1.1)
        if (hasUpgrade('p', 35)) mult = mult.times(upgradeEffect("p", 35))
        return mult
    },
    passiveGeneration() {
        if (hasUpgrade("p", 15)) return 0.1
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades:{
        11: {
            title: "Doubler",
            description: "x2 to points gain",
            cost: new Decimal(1),
        },
        12: {
            unlocked() {return hasUpgrade(this.layer, 11)},
            title: "Useful PP",
            description: "Points get boost based on PP(hardcaps at x1000000)",
            cost: new Decimal(3),
            effect() {
                return player[this.layer].points.add(1).pow(0.5).min(1000000)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        13: {
            unlocked() {return hasUpgrade(this.layer, 12)},
            title: "Useful points",
            description: "PP get boost based on points(hardcaps at x100)",
            cost: new Decimal(5),
            effect() {
                return player.points.add(1).pow(0.15).min(100)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        14: {
            unlocked() {return hasUpgrade(this.layer, 13)},
            title: "Just points multi",
            description: "x5 to points gain",
            cost: new Decimal(20),
        },
        15: {
            unlocked() {return hasUpgrade(this.layer, 14)},
            title: "Automation",
            description: "You gain 10% of your PP gain per second",
            cost: new Decimal(50),
        },
        21: {
            unlocked() {return hasUpgrade(this.layer, 15)},
            title: "2nd row",
            description: "unlock 2nd row of PP upgrades",
            cost: new Decimal(50),
        },
        31: {
            unlocked() {return hasUpgrade(this.layer, 21)},
            title: "Useful points 2",
            description: "points get boost based on points(hardcaps at x100)",
            cost: new Decimal(100),
            effect() {
                return player.points.add(1).pow(0.1).min(100)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        32: {
            unlocked() {return hasUpgrade(this.layer, 31)},
            title: "Just PP multi",
            description: "x10 to PP gain",
            cost: new Decimal(300),
        },
        33: {
            unlocked() {return hasUpgrade(this.layer, 32)},
            title: "Ultimate points",
            description: "points ^1.1",
            cost: new Decimal(3000),
        },
        34: {
            unlocked() {return hasUpgrade(this.layer, 33)},
            title: "Ultimate PP",
            description: "PP ^1.1",
            cost: new Decimal(10000),
        },
        35: {
            unlocked() {return hasUpgrade(this.layer, 34)},
            title: "PP buff",
            description: "PP boost PP gain(hardcaps at x100)",
            cost: new Decimal(50000),
            effect() {
                return player.points.add(1).pow(0.1).min(100)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        41: {
            unlocked() {return hasUpgrade(this.layer, 35)},
            title: "Kirill?",
            description: "Unlock Kirill(not currently in game)",
            cost: new Decimal(100000),
        },
    },
})
addLayer("k", {
    name: "Kirill",
    symbol: "k",
    position: 0,
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    layerShown() { return player[this.layer].unlocked || hasUpgrade("p", 41) },
    color: "#008B8B",
    requires: new Decimal(100000),
    row: "1",
    resource: "IQ",
    baseResource: "prestige points",
    baseAmount() {return player.p.points},
    type: "static",
    exponent: 3,
    gainMult() {
        mult = new Decimal(1)
        return mult
    },
    canBuyMax() {return hasUpgrade("k", 13)},
    upgrades:{
        11: {
            title: "Again...",
            description: "x2 PP and points",
            cost: new Decimal(1),
        },
        12: {
            unlocked() {return hasUpgrade("k", 11)},
            title: "Again...Again...",
            description: "x2 PP and points",
            cost: new Decimal(1),
        },
        13: {
            unlocked() {return hasMilestone("k", 0)},
            title: "Powerful PP",
            description: "x100 to PP gain and you can get more than 1 IQ at once",
            cost: new Decimal(3),
        },
        14: {
            unlocked() {return hasUpgrade(this.layer, 13)},
            title: "needed IQ",
            description: "points boost based on IQ",
            cost: new Decimal(3),
            effect() {
                return player[this.layer].points.add(1).pow(4)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        15: {
            unlocked() {return hasUpgrade("k", 14)},
            title: "Really needed IQ",
            description: "boost PP based on IQ",
            cost: new Decimal(4),
            effect() {
                return player[this.layer].points.add(1).pow(4)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        21: {
            unlocked() {return hasUpgrade("k", 15)},
            title: "Something new",
            description: "Unlocks buyable(not currently in game)",
            tooltip: "Слишком сложная хуйня, я не вывез пока что",
            cost: new Decimal(4),
        },
    },
    milestones: {
        0: {
            unlocked() {return hasUpgrade("k", 12)},
            requirementDescription: "3 IQ",
            effectDescription: "save 1st row PP upgrades",
            done() { return player.k.points.gte(3) },
        },
        1: {
            unlocked() {return hasMilestone("k", 0)},
            requirementDescription: "5 IQ",
            effectDescription: "save 2nd row PP upgrades",
            done() { return player.k.points.gte(5) },
        },
    },
    buyables: {
        11: {
            title: "Roblox",
            unlocked() {return false},
            cost(x) { return new Decimal(3).add(x) },
            display() { return "Waste your IQ on roblox(roblox makes you more powerful)" },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            display() { 
                let data = tmp[this.layer].buyables[this.id]
                return "Cost: " + format(data.cost) + " IQ\n\
                Amount: " + player[this.layer].buyables[this.id] + "/3\n\
                Multiply points gain by" + format(data.effect.first) + "and multiplies PP by " + format(data.effect.second)
            },
            effect(x) { // Effects of owning x of the items, x is a decimal
                let eff = {}
                this.effect.first = 10**(3*x)
                this.effect.second = 10**(3*x)
                return eff;
            },
        },
    },
})
