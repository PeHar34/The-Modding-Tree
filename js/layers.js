addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
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
        if (hasUpgrade('p', 22)) mult = mult.times(10)
        if (hasUpgrade('p', 22)) mult = mult.pow(1.1)
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
        16: {
            unlocked() {return hasUpgrade(this.layer, 15)},
            title: "2nd row",
            description: "unlock 2nd row of PP upgrades",
            cost: new Decimal(50),
        },
        21: {
            unlocked() {return hasUpgrade(this.layer, 16)},
            title: "Useful points 2",
            description: "points get boost based on points(hardcaps at x100)",
            cost: new Decimal(100),
            effect() {
                return player.points.add(1).pow(0.1).min(100)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        22: {
            unlocked() {return hasUpgrade(this.layer, 21)},
            title: "Just PP multi",
            description: "x10 to PP gain",
            cost: new Decimal(300),
        },
        23: {
            unlocked() {return hasUpgrade(this.layer, 22)},
            title: "Ultimate points",
            description: "points ^1.1",
            cost: new Decimal(3000),
        },
        24: {
            unlocked() {return hasUpgrade(this.layer, 23)},
            title: "Ultimate PP",
            description: "PP ^1.1",
            cost: new Decimal(10000),
        },
        25: {
            unlocked() {return hasUpgrade(this.layer, 24)},
            title: "PP buff",
            description: "PP boost PP gain(hardcaps at x100)",
            cost: new Decimal(50000),
            effect() {
                return player.points.add(1).pow(0.1).min(100)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        26: {
            unlocked() {return hasUpgrade(this.layer, 25)},
            title: "Kirill?",
            description: "Unlock Kirill(not currently in game)",
            cost: new Decimal(100000),
        },
    },
})
