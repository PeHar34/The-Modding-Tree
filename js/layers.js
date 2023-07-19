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
        if (hasUpgrade("k", 55)) mult = mult.times(1e30)
        if (hasUpgrade("m", 15)) mult = mult.times(upgradeEffect("m", 15))
        if (hasUpgrade("m", 13)) mult = mult.times(upgradeEffect("m", 13))
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
                if (hasUpgrade("k", 53)) hardcap = new Decimal("1e300")
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
                if (hasUpgrade("k", 54)) hardcap = new Decimal("1e200")
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
                if (hasUpgrade("k", 54)) hardcap = new Decimal("1e200")
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
            effectDisplay() { return format(upgradeEffect(this.layer, 35))+"x" },
            cost: new Decimal(10),
        },
        41: {
            unlocked() {
                if (hasUpgrade(this.layer, 41)) return false
                else return hasUpgrade(this.layer, 35)
            },
            title: "Papa",
            description: "Unlocks money making",
            cost: new Decimal(11),
        },
        42: {
            unlocked() {
                if (hasUpgrade(this.layer, 42)) return false
                else return hasUpgrade("m", 13)
            },
            title: "3rd row",
            description: "Unlocks 3rd row of IQ upgrades",
            cost: new Decimal(12),
        },
        51: {
            unlocked() {
                return hasUpgrade(this.layer, 42)
            },
            title: "IQ is good",
            description: "IQ boosts mafia XP",
            tooltip: "Айкью действительно влияет на устройство мафии, чем вы умнее, тем больше мафия будет процветать!",
            cost: new Decimal(12),
            effect() {
                return new Decimal(player[this.layer].points).pow(3)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, 51))+"x" },
        },
        52: {
            unlocked() {
                return hasUpgrade(this.layer, 42)
            },
            title: "Mafia buff",
            description: "Just x5 mafia XP",
            cost: new Decimal(15),
        },
        53: {
            unlocked() {
                return hasUpgrade(this.layer, 42)
            },
            title: "hardcap? what is this?",
            description: "Useful PP harcap 1e100 -> 1e300",
            cost: new Decimal(16),
        },
        54: {
            unlocked() {
                return hasUpgrade(this.layer, 42)
            },
            title: "hardcap? what is this? Again?",
            description: "Useful points and Useful points 2 harcap 1e15 -> 1e200 also money using harcap higher",
            cost: new Decimal(19),
        },
        55: {
            unlocked() {
                return hasUpgrade(this.layer, 42)
            },
            title: "Im tired of doing whis update so",
            description: "x1e30 PP",
            tooltip: "Я заебался делать обнову, поэтому просто закину ПП бафф, надеюсь обнова вам зашла, очень долго её делал, по сравнению с другими обновами",
            cost: new Decimal(20),
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
addLayer("m", {
    name: "Mafia",
    symbol: "m",
    position: 1,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
        mafiaBarXP: new Decimal(0),
        mafiaBarLevel: new Decimal(0),
    }},
    layerShown() { return player[this.layer].unlocked || hasUpgrade("k", 41) },
    color: "#FFFAEE",
    requires: new Decimal(11),
    row: "1",
    resource: "Money",
    baseResource: "IQ",
    baseAmount() {return player.k.points},
    type: "static",
    tabFormat: [
        "main-display",
        "prestige-button",
        "resource-display",
        "blank",
        "upgrades",
        "blank",
        "milestones",
        "blank",
        ["display-text", function() {
            let data = player[this.layer]
            return "Mafia level: "+data.mafiaBarLevel}],
        "blank",
        ["bar", "11"],
        "blank",
        "buyables",
        "blank",
    ],
    roundUpCost: "true",
    exponent() {
         exponent = 0.38
         if (player[this.layer].points.gte(1e4)) exponent = 0.25
         return exponent
    },
    gainMult() {
        mult = new Decimal(1)
        return mult
    },
    directMult() {
        mult = new Decimal(1)
        if (hasUpgrade("m", 14)) mult = mult.times(upgradeEffect("m", 14))
        return mult
    },
    canBuyMax() {return true},
    upgrades: {
        11: {
            unlocked() {return true},
            title: "Hire worker",
            description: "You now have mafia worker",
            tooltip: "Вы наняли первого работника! Поздравляю!",
            cost: new Decimal(1),
        },
        12: {
            unlocked() {return player[this.layer].mafiaBarLevel.gte(2)},
            title: "nice level bro",
            description: "Mafia level boost points",
            cost: new Decimal(1),
            effect() {
                return new Decimal(player[this.layer].mafiaBarLevel).pow_base(1e7)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, 12))+'x'},
        },
        13: {
            unlocked() {return player[this.layer].mafiaBarLevel.gte(3)},
            title: "nice level bro v2",
            description: "Mafia level boost PP",
            cost: new Decimal(1),
            effect() {
                return new Decimal(player[this.layer].mafiaBarLevel).pow_base(1e14)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, 13))+'x'},
        },
        14: {
            unlocked() {return player[this.layer].mafiaBarLevel.gte(5)},
            title: "Money producing",
            description: "buff to money gain based on Mafia level",
            tooltip: "Чем больше уровень мафии, тем больше денег вы получаете всё логично!",
            cost: new Decimal(1),
            effect() {
                return new Decimal(player[this.layer].mafiaBarLevel).pow_base(3)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, 14))+'x'},
        },
        15: {
            unlocked() {return hasUpgrade("m", 14)},
            title: "Money using",
            description: "buff to PP gain based on money",
            cost: new Decimal(2),
            effect() {
                hardcap = new Decimal(1e100)
                if (hasUpgrade("k", 54)) hardcap = new Decimal(1e150)
                return new Decimal(player[this.layer].points).pow_base(1e15).min(hardcap)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, 15))+'x'},
        },
        21: {
            unlocked() {
                if (hasUpgrade(this.layer, 21)) return false
                else return hasUpgrade("m", 15)
            },
            title: "2nd row",
            description: "Unlocks 2nd row of money upgrades",
            cost: new Decimal(5),
        },
        31: {
            unlocked() { return hasUpgrade(this.layer, 21) },
            title: "If you want good mafia you need money",
            description: "buffs mafia XP based on money",
            tooltip: "Чем больше денег, тем больше возможностей у мафии, всё снова логично!",
            cost: new Decimal(6),
            effect() {
                return new Decimal(player.m.points).pow(3).min(1e12)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, 31))+"x" }
        },
        32: {
            unlocked() { return hasUpgrade("m", 21)},
            title: "Hire manager",
            tooltip: "Поздравляю вас с вашим новым менеджером, ваша мафия начинает достигать новых высот!",
            description: "Every mafia needs control",
            cost: new Decimal(3670),
        },
        33: {
            unlocked() { return hasUpgrade("m", 21)},
            title: "Buy nuts",
            description: "more nuts gives you x20 mafia XP",
            tooltip: "Ваши рабочие начали делать резьбу на гайках, и вы стали получать больше уровня мафии.",
            cost: new Decimal(191740),
        },
        34: {
            unlocked() { return hasUpgrade("m", 21)},
            title: "Finally points buff",
            description: "buff points gain based on money",
            cost: new Decimal(575218),
            effect(){
                return new Decimal(player.m.points).plus(1).pow(4).min(1e200)
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, 34)) + "x"
            },
        },
        35: {
            unlocked() { return hasUpgrade("m", 21)},
            title: "Hire BOSS(Sashka)",
            description: "Every mafia needs control v2",
            tooltip: "Ну, конечно мы все знаем, что за мафией стоит Сашка, и та йно всем управляет, с ним вы можете ещё сильнее улучшить работника и менеджера",
            cost: new Decimal(1e11),
        },
        41: {
            unlocked() { return new Decimal(player.m.mafiaBarLevel).gte(43)},
            title: "Dima",
            description: "Unlocks Dimitron(not currently in game)",
            tooltip: "Димитрон?",
            cost: new Decimal(1e20),
        },
    },
    buyables: {
        11: {
            title: "Worker level",
            unlocked() {return hasUpgrade("m", 11)},
            cost(x) { return new Decimal(1e197).times(new Decimal(1e15).pow(x)) },
            display() { return "x200 to mafia XP gain" },
            canAfford() { return player.points.gte(this.cost()) },
            purchaseLimit() {
                return new Decimal(15).plus(buyableEffect("m", 13))
            },
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            display() { 
                let data = tmp[this.layer].buyables[this.id]
                let data2 = tmp[this.layer].buyables[13]
                return "Cost: " + format(data.cost) + " points\n\
                Worker level: " + player[this.layer].buyables[this.id] + "/"+new Decimal(15).plus(data2.effect) +"\n\
                Gain " + format(data.effect) + "x more mafia XP" 
            },
            effect(x) { 
                eff = new Decimal(200).pow(x)
                return eff
            }, 
            displayEffect() { return format(buyableEffect(this.layer, this.id))+"x" },
        },
        12: {
            title: "Manager level",
            unlocked() {return hasUpgrade("m", 32)},
            cost(x) { return new Decimal("1e546").times(new Decimal(1e30).pow(x)) },
            display() { return "x20 to mafia XP gain" },
            canAfford() { return player.p.points.gte(this.cost()) },
            purchaseLimit() {
                return new Decimal(15).plus(buyableEffect("m", 13))
            },
            buy() {
                player.p.points = player.p.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            display() { 
                let data = tmp[this.layer].buyables[this.id]
                let data2 = tmp[this.layer].buyables[13]
                return "Cost: " + format(data.cost) + " prestige points\n\
                Manager level: " + player[this.layer].buyables[this.id] + "/"+new Decimal(15).plus(data2.effect) +"\n\
                Gain " + format(data.effect) + "x more mafia XP" 
            },
            effect(x) { 
                eff = new Decimal(20).pow(x)
                return eff
            }, 
            displayEffect() { return format(buyableEffect(this.layer, this.id))+"x" },
        },
        13: {
            title: "BOSS level",
            unlocked() {return hasUpgrade("m", 35)},
            cost(x) { 
                add = new Decimal(2).times(x) 
                if (new Decimal(getBuyableAmount("m", 13)).eq(2)) add = add.sub(1)
                cost = new Decimal(18).plus(add)
                return cost
            },
            display() { return "+5 max mafia buyables except boss buyable" },
            canAfford() { return player.k.points.gte(this.cost()) },
            purchaseLimit: "3",
            buy() {
                player.k.points = player.k.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            display() { 
                let data = tmp[this.layer].buyables[this.id]
                return "Cost: " + format(data.cost) + " IQ\n\
                BOSS level: " + player[this.layer].buyables[this.id] + "/3\n\
                Gain " + format(data.effect) + "more buyables" 
            },
            effect(x) { 
                eff = new Decimal(5).times(x)
                return eff
            }, 
            displayEffect() { return format(buyableEffect(this.layer, this.id))+"x" },
        },
    },
    update() {
        let mafiaBar = tmp[this.layer].bars[11]
        if (mafiaBar.unlocked) {
            let data = player[this.layer]
            if (mafiaBar.progress.gte(1)) {
            data.mafiaBarXP = new Decimal(0)
            data.mafiaBarLevel = data.mafiaBarLevel.plus(1)
            }   
            else {
            data.mafiaBarXPgain = new Decimal(0.01)
            data.mafiaBarXPgain = data.mafiaBarXPgain.times(buyableEffect(this.layer, 11))
            data.mafiaBarXPgain = data.mafiaBarXPgain.times(buyableEffect(this.layer, 12))
            if (hasUpgrade("k", 51)) data.mafiaBarXPgain = data.mafiaBarXPgain.times(upgradeEffect("k", 51))
            if (hasUpgrade("k", 52)) data.mafiaBarXPgain = data.mafiaBarXPgain.times(5)
            if (hasUpgrade("m", 33)) data.mafiaBarXPgain = data.mafiaBarXPgain.times(20)
            if (hasUpgrade(this.layer, 31)) data.mafiaBarXPgain = data.mafiaBarXPgain.times(upgradeEffect(this.layer, 31))
            if (new Decimal(data.mafiaBarLevel).eq(2)) data.mafiaBarXPgain = data.mafiaBarXPgain.times(3)
            if (new Decimal(data.mafiaBarLevel).eq(4)) data.mafiaBarXPgain = data.mafiaBarXPgain.times(6)
            if (new Decimal(data.mafiaBarLevel).eq(8)) data.mafiaBarXPgain = data.mafiaBarXPgain.times(4)
            if (new Decimal(data.mafiaBarLevel).eq(43)) data.mafiaBarXPgain = data.mafiaBarXPgain.div(1e100)
            data.mafiaBarXP = data.mafiaBarXP.plus(data.mafiaBarXPgain)
            }
        }
    },
    bars: {
        11: {
            unlocked() { return hasUpgrade("m", 11) },
        direction: RIGHT,
        width: 600,
        height: 50,
        progress() {
            let data = player[this.layer];
            return new Decimal(data.mafiaBarXP).div(new Decimal(data.mafiaBarLevel).pow_base(1000))
        },
        },
    },
})
