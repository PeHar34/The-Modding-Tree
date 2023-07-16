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

        if(layers[resettingLayer].row > this.row) player[this.layer].upgrades = keep
    },
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent() {
        exponent = 0.5
        if (hasUpgrade("k", 32)) exponent = 0.7
        return exponent
    },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('p', 13)) mult = mult.times(upgradeEffect('p', 13))
        if (hasUpgrade('p', 32)) mult = mult.times(10)
        if (hasUpgrade('k', 11)) mult = mult.times(2)
        if (hasUpgrade("k", 35)) mult = mult.times(upgradeEffect("k", 35))
        if (hasUpgrade('k', 12)) mult = mult.times(2)
        nult = mult.times(buyableEffect("k", 11))
        if (hasUpgrade("k", 14)) mult = mult.times(upgradeEffect("k", 14))
        if (hasUpgrade('k', 13)) mult = mult.times(100)
        if (hasUpgrade('p', 34)) mult = mult.pow(1.1)
        if (hasUpgrade('p', 35)) mult = mult.times(upgradeEffect("p", 35))
        return mult
    },
    passiveGeneration() {
        if (hasUpgrade("p", 15)) return 0.1
        if (hasMilestone("k", 2)) return 1
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
            description: "Points get boost based on PP",
            cost: new Decimal(3),
            effect() {
                hardcap = new Decimal("1e6")
                if (hasUpgrade("k", 31)) hardcap = new Decimal("1e100")
                return player[this.layer].points.add(1).pow(0.5).min(hardcap)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        13: {
            unlocked() {return hasUpgrade(this.layer, 12)},
            title: "Useful points",
            description: "PP get boost based on points",
            cost: new Decimal(5),
            effect() {
                hardcap = new Decimal("100")
                if (hasUpgrade("k", 31)) hardcap = new Decimal("1e15")
                return player.points.add(1).pow(0.15).min(hardcap)
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
            unlocked() {
                if (hasUpgrade(this.layer, 21)) return false
                else return hasUpgrade(this.layer, 15)
            },
            title: "2nd row",
            description: "unlock 2nd row of PP upgrades",
            cost: new Decimal(50),
        },
        31: {
            unlocked() {return hasUpgrade(this.layer, 21)},
            title: "Useful points 2",
            description: "points get boost based on points",
            cost: new Decimal(100),
            effect() {
                hardcap = new Decimal("100")
                if (hasUpgrade("k", 31)) hardcap = new Decimal("1e15")
                return player.points.add(1).pow(0.1).min(hardcap)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        32: {
            unlocked() {return hasUpgrade(this.layer, 21)},
            title: "Just PP multi",
            description: "x10 to PP gain",
            cost: new Decimal(300),
        },
        33: {
            unlocked() {return hasUpgrade(this.layer, 21)},
            title: "Ultimate points",
            description: "points ^1.1",
            cost: new Decimal(3000),
        },
        34: {
            unlocked() {return hasUpgrade(this.layer, 21)},
            title: "Ultimate PP",
            description: "PP ^1.1",
            cost: new Decimal(10000),
        },
        35: {
            unlocked() {return hasUpgrade(this.layer, 21)},
            title: "PP buff",
            description: "PP boost PP gain",
            cost: new Decimal(50000),
            effect() {
                hardcap = new Decimal("100")
                if (hasUpgrade("k", 31)) hardcap = new Decimal("1e15")
                return player.points.add(1).pow(0.1).min(hardcap)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        41: {
            unlocked() {
                if (hasUpgrade(this.layer, 41)) return false
                else return hasUpgrade(this.layer, 35)
            },
            title: "Kirill?",
            description: "Unlocks Kirill",
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
    exponent() {
        exponent = 3
        if (hasUpgrade("k", 34)) exponent = 2.862
        return exponent
    },
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
                IQB = new Decimal("4")
                if (hasUpgrade(this.layer, 33)) IQB = 15
                return player[this.layer].points.add(1).pow(IQB)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        15: {
            unlocked() {return hasUpgrade("k", 14)},
            title: "Really needed IQ",
            description: "boost PP based on IQ",
            cost: new Decimal(4),
            effect() {
                IQB = new Decimal("4")
                if (hasUpgrade(this.layer, 33)) IQB = 15
                return player[this.layer].points.add(1).pow(IQB)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        21: {
            unlocked() {
                if (hasUpgrade(this.layer, 21)) return false
                else return hasUpgrade(this.layer, 15)
            },
            title: "Something new",
            description: "Unlocks kirill buyable",
            cost: new Decimal(4),
        },
        22: {
            unlocked() {
                if (hasUpgrade(this.layer, 22)) return false
                else return hasMilestone(this.layer, 1)
            },
            title: "Something new v2",
            description: "Unlocks 2nd row of Kirill upgrades",
            cost: new Decimal(5),
        }, 
        31: {
            unlocked() {return hasUpgrade(this.layer, 22)},
            title: "Return",
            description: "2nd PP upgrade hardcap now 1e100, other hardcaps now 1e15",
            cost: new Decimal(5),
        },
        32: {
            unlocked() {return hasUpgrade(this.layer, 22)},
            title: "Stupid Formula",
            description: "Prestige formula better",
            tooltip: "С вашим IQ вы не можете понять престиж формулу, поэтому она теперь легче",
            cost: new Decimal(6),
        },
        33: {
            unlocked() {return hasUpgrade(this.layer, 22)},
            title: "Really Really needed IQ",
            description: "needed IQ and Really needed IQ better",
            cost: new Decimal(8),
        },
        34: {
            unlocked() {return hasUpgrade(this.layer, 22)},
            title: "Stupid formula 2",
            description: "IQ formula slightly better",
            tooltip: "У вас чуть больше IQ, но всё ещё недостаточно, чтобы понять IQ формулу, поэтому она теперь легче",
            cost: new Decimal(9),
        },
        35: {
            unlocked() {return hasUpgrade(this.layer, 22)},
            title: "Super Buyable",
            description: "Number of buyable purchases boosts PP",
            effect() {
                return getBuyableAmount(this.layer, 11).add(1).pow(37)
            },
            cost: new Decimal(10),
        },
        41: {
            unlocked() {return hasUpgrade(this.layer, 35)},
            title: "Papa",
            description: "Unlocks money making(not currently in game)",
            cost: new Decimal(11),
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
        2: {
            unlocked() {return hasUpgrade(this.layer, 34)},
            requirementDescription: "10 IQ",
            effectDescription: "You gain 100% of your PP gain per second",
            done() { return player.k.points.gte(10) },
        },
    },
    buyables: {
        11: {
            title: "Roblox",
            unlocked() {return hasUpgrade("k", 21)},
            cost(x) { return new Decimal(3).add(x) },
            display() { return "Waste your IQ on roblox(roblox makes you more powerful)" },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            purchaseLimit: "10",
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            display() { 
                let data = tmp[this.layer].buyables[this.id]
                return "Cost: " + format(data.cost) + " IQ\n\
                Amount: " + player[this.layer].buyables[this.id] + "/10\n\
                Gain " + format(data.effect) + "x more points and multiplies PP by " + format(data.effect) +"x"
            },
            effect(x) { 
                eff = new Decimal("100000")
                eff = eff.pow(x)
                return eff
            }, 
            effectDisplay(x) { return format(buyableEffect(this.layer, this.id))+"x" },
        },
    },
})
