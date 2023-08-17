addLayer("w", {
    name: "Waiting",
    symbol: "w",
    position: 1,
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    layerShown() { return player[this.layer].unlocked || hasUpgrade("d", 41) },
    color: "#4682B4",
    requires() {
        if (getBuyableAmount("w", 12).gte(10)) return 60
        if (getBuyableAmount("w", 11).gte(10)) return 3600
        else return 86400
    },
    row: "2",
    resource: "Minutes",
    baseResource: "Seconds",
    tabFormat: [
        "main-display",
        "prestige-button",
        "resource-display",
        "blank",
        "upgrades",
        "blank",
        "milestones",
        "blank",
        ["row", [
            ["buyable", "11"],
            "blank",
            ["bar", "bar1"],
        ]],
        "blank",
        ["row", [
            ["buyable", "12"],
            "blank",
            ["bar", "bar2"],
        ]],
        "blank",
    ],
    onPrestige() {
        player.d.points = new Decimal(0)
    },
    doReset(resettingLayer) {
        if(layers[resettingLayer].row <= this.row) return;
            let keep = []

            layerDataReset(this.layer, keep) 
    },
    baseAmount() {return player.d.points},
    type: "normal",
    resetDescription: "Reset all your seconds for ",
    canBuyMax() {return hasUpgrade("w", 11)},
    exponent() {
        exponent = 1
        return exponent
    },
    gainMult() {
        mult = new Decimal(1)
        if (hasUpgrade("w", 25)) mult = mult.times(100)
        return mult
    },
    directMult() {
        mult = new Decimal(1)
        if (hasUpgrade("w", 13)) mult = mult.times(upgradeEffect("w", 13))
        return mult
    },
    canBuyMax() {return false },
    buyables: {
        11: {
            title: "Wait prestige",
            unlocked() {return hasUpgrade("w", 11)},
            cost(x) { return new Decimal(10).pow(x) },
            display() { return "x1e1000 to PP" },
            canAfford() { return player.w.points.gte(this.cost()) },
            purchaseLimit() {
                return new Decimal(10)
            },
            buy() {
                player.w.points = player.w.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            display() { 
                let data = tmp[this.layer].buyables[this.id]
                return "Cost: " + format(data.cost) + " minutes\n\
                wait progress: " + player[this.layer].buyables[this.id] + "/10\n\
                Gain " + format(data.effect) + "x more PP" 
            },
            effect(x) { 
                eff = new Decimal("1e1000").pow(x)
                return eff
            }, 
            displayEffect() { return format(buyableEffect(this.layer, this.id))+"x" },
        },
        12: {
            title: "Wait Kirill",
            unlocked() {return hasUpgrade("w", 21)},
            cost(x) { return new Decimal(1e14).times(new Decimal(100).pow(x)) },
            display() { return "exponential x1.1 to IQ" },
            canAfford() { return player.w.points.gte(this.cost()) },
            purchaseLimit() {
                return new Decimal(10)
            },
            buy() {
                player.w.points = player.w.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            display() { 
                let data = tmp[this.layer].buyables[this.id]
                return "Cost: " + format(data.cost) + " minutes\n\
                wait progress: " + player[this.layer].buyables[this.id] + "/10\n\
                Gain " + format(data.effect) + "x more IQ" 
            },
            effect(x) { 
                eff = new Decimal("1.1").pow(x)
                return eff
            }, 
            displayEffect() { return format(buyableEffect(this.layer, this.id))+"x" },
        },
    },
    upgrades:{
        11: {
            unlocked() {return true},
            title: "waiting started",
            description: "Unlocks waiting machine",
            tooltip: "Вам пока что некого ждать, поэтому вы ждёте... ПРЕСТИЖ? как его вообще можно ждать...",
            cost: new Decimal(1),
        },
        12: {
            unlocked() { return new Decimal(getBuyableAmount("w", 11)).gte(1)},
            title: "waiting bonus",
            description: "Minutes boost seconds",
            cost: new Decimal(5),
            effect() {
                return new Decimal(player.w.points).plus(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect("w", 12))+"x" }
        },
        13: {
            unlocked() { return new Decimal(getBuyableAmount("w", 11)).gte(3)},
            title: "waiting bonus",
            description: "Minutes boost seconds",
            cost: new Decimal(100),
            effect() {
                return new Decimal(player.p.points).plus(1).pow(0.00008)
            },
            effectDisplay() { return format(upgradeEffect("w", 13))+"x" }
        },
        14: {
            unlocked() { return new Decimal(getBuyableAmount("w", 11)).gte(7)},
            title: "Roblox is good",
            description: "Roblox also boost PP and autobuys it",
            cost: new Decimal(1e6),
        },
        15: {
            unlocked() { return new Decimal(getBuyableAmount("w", 11)).gte(9) },
            title: "Wait is so long",
            description: "Dimitron formula better",
            cost: new Decimal(5e8),
        },
        21: {
            unlocked() { return new Decimal(getBuyableAmount("w", 11)).gte(10) },
            title: "Wait Kirill",
            description: "unlocks waiting Kirill",
            tooltip: "Вы ждёте Кирилла, чтобы поиграть в Хойку",
            cost: new Decimal(1e11),
        },
        22: {
            unlocked() { return new Decimal(getBuyableAmount("w", 11)).gte(10)},
            title: "BOSS speed",
            description: "Adds more maximum levels to BOSS and autobuys all mafia buyables",
            cost: new Decimal(1e16),
            effect() {
                return Math.floor(new Decimal(player.w.points).plus(1).log(1e6))
            },
            effectDisplay() { return "+ " +format(upgradeEffect("w", 22)) + " maximum BOSS levels" }
        },
        23: {
            unlocked() { return new Decimal(getBuyableAmount("w", 11)).gte(10) },
            title: "Smartness",
            description: "More points but prestige formula is worse",
            tooltip: "У вас средний уровень айкью, вы способны улучшить поинты и сделать формула хуже, там, чтобы это дало бафф",
            cost: new Decimal(2e20),
        },
        24: {
            unlocked() { return new Decimal(getBuyableAmount("w", 11)).gte(10) },
            title: "Waiting for Mafia",
            description: "Bar complictation 1000 -> 700",
            cost: new Decimal(1e27),
        },
        25: {
            unlocked() { return new Decimal(getBuyableAmount("w", 11)).gte(10) },
            title: "yeah",
            description: "x100 to minutes gain",
            cost: new Decimal(1e29),
        },
    },
    milestones: {
        
    },
    bars: {
        bar1: {
            unlocked() { return hasUpgrade("w", 11) },
            direction: RIGHT,
            width: 500,
            height: 190,
            progress() {
                return new Decimal(getBuyableAmount("w", 11).div(10))
            },
        },
        bar2: {
            unlocked() { return hasUpgrade("w", 21) },
            direction: RIGHT,
            width: 500,
            height: 190,
            progress() {
                return new Decimal(getBuyableAmount("w", 12).div(10))
            },
        },
    },
})