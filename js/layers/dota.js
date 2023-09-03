addLayer("z", {
    name: "Dota 2",
    symbol: "z",
    position: 1,
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        total: new Decimal(0),
        setBuyableAmount: new Decimal(0),
        energy: new Decimal(0),
        energyGain: new Decimal(0),
        energyGain2: new Decimal(0),
        poopGain: new Decimal(0),
        MMR: new Decimal(0),
        progress1: new Decimal(0),
        progress2: new Decimal(0),
        progress3: new Decimal(0),
        poopChance: new Decimal(0), 
        playText : new String(0),
        playTime1 : new Decimal(0),
        playPick : new Decimal(0),
        play1 : new Decimal(0),
        pick: new Decimal(0),
        cpick: new Decimal(0),
        pickChance: new Decimal(0),
        playTime2 : new Decimal(0),
        play2 : new Decimal(0),
        pickChance1: new Decimal(0),
        power1: new Decimal(0),
        pickChance2: new Decimal(0),
        power2: new Decimal(0),
        pickChance3: new Decimal(0),
        power3: new Decimal(0),
        pickChance4: new Decimal(0),
        power4: new Decimal(0),
        pickChance5: new Decimal(0),
        power5: new Decimal(0),
        winChance : new Decimal(0),
        line : new Decimal(0),
        late: new Decimal(0),
        win: new Decimal(0),
        MMRGain: new Decimal(1)
    }},
    canReset() { return hasUpgrade("o", 31) },
    layerShown() { return player[this.layer].unlocked || hasUpgrade("o", 31) },
    color: "#D3D3D3",
    getResetGain(useType="custom") { return Math.floor(new Decimal(player.o.points).div(1e87).log(1e30).sub(player.z.total).plus(1) ) },
    getNextAt(canMax=true) {
        return new Decimal(1e87).times(new Decimal(1e30).pow(player.z.total))
    },
    prestigeButtonText() {
        return "Redeem "+ format(tmp[this.layer].getResetGain) +" acts" + "\n\
        Next at " + format(tmp[this.layer].getNextAt)
    },
    requires: new Decimal(1e87),
    row: "3",
    resource: "Acts",
    baseResource: "motivation points",
    autoPrestige() { return false },
    doReset(resettingLayer) {
        if(layers[resettingLayer].row <= this.row) return;
            let keep = []

            layerDataReset(this.layer, keep) 
    },
    resetsNothing() { return true },
    baseAmount() {return player.o.points},
    type: "custom",
    gainMult() {
        mult = new Decimal(1)
        return mult
    },
    directMult() {
        mult = new Decimal(1)
        mult = mult.times(buyableEffect("w", 13))
        return mult
    },
    canBuyMax() { return false },
    tabFormat: [
        "main-display",
        "prestige-button",
        "total",
        "blank",
        "resource-display",
        "blank",
        ["row", [
            ["clickable", '11'],
            "blank",
            "blank",
            "blank",
            "blank",
            "blank",
            "blank",
            "blank",
            "blank",
            "blank",
            "blank",
            "blank",
            "blank",
            "blank",
            ["clickable", '12'],
        ]],
        "blank",
        ["row", [
            "blank",
            "blank",         
            ["bar", 'bar1'],
            "blank",
            "blank",
            "blank",
            "blank",
            "blank",
            "blank",
            "blank",
            "blank",
            "blank",
            "blank",
            "blank",
            "blank",
            "blank",
            "blank",
            "blank",
            "blank",
            "blank",
            "blank",
            "blank",
            "blank",
            "blank",
            ["bar", 'bar2'],
            "blank",
            "blank",
            "blank",
            ["bar", 'bar3'],
        ]],
        "blank",
        ["row", [
            ["clickable", '13'],
            "blank",
            "blank",
            "blank",
            "blank",
            "blank",
            "blank",
            "blank",
            "blank",
            "blank",
            "blank",
            "blank",
            "blank",
            ["clickable", '14'],
        ]],
        "blank",
        ["display-text", 
            function() { return "Energy: "+format(player[this.layer].energy) }
        ],
        "blank",
        ["clickable", '15'],
        "blank",
        ["display-text",
            function() { return player[this.layer].playText }
        ],
        "blank",
        ["row", [
            ["clickable", "21"],
            ["clickable", "22"],
            ["clickable", "23"],
            ["clickable", "24"],
            ["clickable", "25"],
        ]],
        "blank",
        ["display-text",
            function() { return "MMR: " +format(player[this.layer].MMR) }
        ],
        "blank",
        "upgrades",
        "blank",
        "milestones",
        "blank",
    ],
    bars: {
        bar1: {
            unlocked() { return true },
            direction: UP,
            width: 30,
            height: 350,
            progress() {
                return player[this.layer].progress1
            },
        },
        bar2: {
            unlocked() { return true },
            direction: UP,
            width: 30,
            height: 350,
            progress() {
                return player[this.layer].progress2
            }, 
        },
        bar3: {
            unlocked() { return true },
            direction: UP,
            width: 10,
            height: 350,
            progress() {
                return player[this.layer].progress3
            }, 
            fillStyle(){ return { "color": "#D66206"} },
        },
    },
    clickables: {
        11: {
            display() {return "+"},
            canClick() { return new Decimal(player[this.layer].progress1).lte(0.9) && new Decimal(player.z.points).gte(1)},
            onClick() { 
                player.z.points = new Decimal(player.z.points).sub(1)
                player[this.layer].progress1 = new Decimal(player[this.layer].progress1).plus(0.1)
            },
        },
        12: {
            display() {return "+"},
            canClick() { return new Decimal(player[this.layer].progress2).lte(0.9) && new Decimal(player.z.points).gte(1)},
            onClick() { 
                player.z.points = new Decimal(player.z.points).sub(1)
                player[this.layer].progress2 = new Decimal(player[this.layer].progress2).plus(0.1)
            },
        },
        13: {
            display() {return "-"},
            canClick() { return new Decimal(player[this.layer].progress1).gte(0.1) },
            onClick() { 
                player.z.points = new Decimal(player.z.points).plus(1)
                player[this.layer].progress1 = new Decimal(player[this.layer].progress1).sub(0.1)
            },
        },
        14: {
            display() {return "-"},
            canClick() { return new Decimal(player[this.layer].progress2).gte(0.1) },
            onClick() { 
                player.z.points = new Decimal(player.z.points).plus(1)
                player[this.layer].progress2 = new Decimal((player[this.layer].progress2).sub(0.1))
            },
        },
        15: {
            display() {return "Play Dota 2"},
            canClick() { 
                let req = new Decimal(50)
                if (hasUpgrade("z", 13)) req = new Decimal(req).times(5)
                if (hasUpgrade("z", 15)) req = new Decimal(req).times(5)
                if (hasUpgrade("z", 24)) req = new Decimal(req).times(5)
                if (new Decimal(player[this.layer].play).eq(0) && new Decimal(player[this.layer].play2).eq(0) && new Decimal(player[this.layer].pick).eq(0)) return player[this.layer].energy.gte(req)
                else return false
            },
            onClick() { 
                let req = new Decimal(50)
                if (hasUpgrade("z", 13)) req = new Decimal(req).times(5)
                if (hasUpgrade("z", 15)) req = new Decimal(req).times(5)
                if (hasUpgrade("z", 24)) req = new Decimal(req).times(5)
                player[this.layer].play = new Decimal(1)
                player[this.layer].energy = new Decimal(player[this.layer].energy).sub(req)
            },
        },
        21: {
            unlocked() { return player[this.layer].pick.eq(1) },
            canClick() { return true },
            onClick() { 
                player[this.layer].play = new Decimal(0)
                player[this.layer].pick = new Decimal(0)
                player[this.layer].play2 = new Decimal(1)
                player[this.layer].pickChance = Math.random() * 100
                if (new Decimal(player[this.layer].pickChance).lte(player[this.layer].pickChance1)) player[this.layer].cpick = new Decimal(1)
                else player[this.layer].cpick = new Decimal(0)
                lineChance = new Decimal(Math.random()* 100)
                if (new Decimal(lineChance).lte(50)) player[this.layer].line = new Decimal(1)
                else player[this.layer].line = new Decimal(0)
                player[this.layer].winChance = new Decimal(80)
                if (new Decimal(player[this.layer].pick).eq(1)) player[this.layer].winChance = new Decimal(player[this.layer].winChance).mul(0.7)
                if (new Decimal(player[this.layer].line).eq(1)) player[this.layer].winChance = new Decimal(player[this.layer].winChance).mul(1.2)
                else player[this.layer].winChance = new Decimal(player[this.layer].winChance).div(1.2)
                lateChance = new Decimal(Math.random()* 100)
                if (new Decimal(lateChance).lte(50)) player[this.layer].late = new Decimal(1)
                else player[this.layer].late = new Decimal(0)
                if (new Decimal(player[this.layer].late).eq(1)) player[this.layer].winChance = new Decimal(player[this.layer].winChance).mul(1.2)
                else player[this.layer].winChance = new Decimal(player[this.layer].winChance).div(1.2)
                player[this.layer].winChance = new Decimal(player[this.layer].winChance).mul(player[this.layer].power1).div(100)
                win = new Decimal(Math.random() * 100)
                if (new Decimal(win).lte(player[this.layer].winChance)) player[this.layer].win = new Decimal(1)
                else player[this.layer].win = new Decimal(0)
            },
            display() {
                return "1"+"\n\
                Counte pick chance: " + format(player[this.layer].pickChance1)+ "%" +"\n\
                Hero power: " + format(player[this.layer].power1)+ "%"
            },
        },
        22: {
            unlocked() { return player[this.layer].pick.eq(1) },
            canClick() { return true },
            onClick() { 
                player[this.layer].play = new Decimal(0)
                player[this.layer].pick = new Decimal(0)
                player[this.layer].play2 = new Decimal(1)
                player[this.layer].pickChance = Math.random() * 100
                if (new Decimal(player[this.layer].pickChance).lte(player[this.layer].pickChance2)) player[this.layer].cpick = new Decimal(1)
                else player[this.layer].cpick = new Decimal(0)
                lineChance = new Decimal(Math.random()* 100)
                if (new Decimal(lineChance).lte(50)) player[this.layer].line = new Decimal(1)
                else player[this.layer].line = new Decimal(0)
                player[this.layer].winChance = new Decimal(80)
                if (new Decimal(player[this.layer].pick).eq(1)) player[this.layer].winChance = new Decimal(player[this.layer].winChance).mul(0.7)
                if (new Decimal(player[this.layer].line).eq(1)) player[this.layer].winChance = new Decimal(player[this.layer].winChance).mul(1.2)
                else player[this.layer].winChance = new Decimal(player[this.layer].winChance).div(1.2)
                lateChance = new Decimal(Math.random()* 100)
                if (new Decimal(lateChance).lte(50)) player[this.layer].late = new Decimal(1)
                else player[this.layer].late = new Decimal(0)
                if (new Decimal(player[this.layer].late).eq(1)) player[this.layer].winChance = new Decimal(player[this.layer].winChance).mul(1.2)
                else player[this.layer].winChance = new Decimal(player[this.layer].winChance).div(1.2)
                player[this.layer].winChance = new Decimal(player[this.layer].winChance).mul(player[this.layer].power2).div(100)
                win = new Decimal(Math.random() * 100)
                if (new Decimal(win).lte(player[this.layer].winChance)) player[this.layer].win = new Decimal(1)
                else player[this.layer].win = new Decimal(0)
            },
            display() {
                return "2"+"\n\
                Counte pick chance: " + format(player[this.layer].pickChance2)+ "%" +"\n\
                Hero power: " + format(player[this.layer].power2) + "%"
            },
        },
        23: {
            unlocked() { return player[this.layer].pick.eq(1) },
            canClick() { return true },
            onClick() { 
                player[this.layer].play = new Decimal(0)
                player[this.layer].pick = new Decimal(0)
                player[this.layer].play2 = new Decimal(1)
                player[this.layer].pickChance = Math.random() * 100
                if (new Decimal(player[this.layer].pickChance).lte(player[this.layer].pickChance3)) player[this.layer].cpick = new Decimal(1)
                else player[this.layer].cpick = new Decimal(0)
                lineChance = new Decimal(Math.random()* 100)
                if (new Decimal(lineChance).lte(50)) player[this.layer].line = new Decimal(1)
                else player[this.layer].line = new Decimal(0)
                player[this.layer].winChance = new Decimal(80)
                if (new Decimal(player[this.layer].pick).eq(1)) player[this.layer].winChance = new Decimal(player[this.layer].winChance).mul(0.7)
                if (new Decimal(player[this.layer].line).eq(1)) player[this.layer].winChance = new Decimal(player[this.layer].winChance).mul(1.2)
                else player[this.layer].winChance = new Decimal(player[this.layer].winChance).div(1.2)
                lateChance = new Decimal(Math.random()* 100)
                if (new Decimal(lateChance).lte(50)) player[this.layer].late = new Decimal(1)
                else player[this.layer].late = new Decimal(0)
                if (new Decimal(player[this.layer].late).eq(1)) player[this.layer].winChance = new Decimal(player[this.layer].winChance).mul(1.2)
                else player[this.layer].winChance = new Decimal(player[this.layer].winChance).div(1.2)
                player[this.layer].winChance = new Decimal(player[this.layer].winChance).mul(player[this.layer].power3).div(100)
                win = new Decimal(Math.random() * 100)
                if (new Decimal(win).lte(player[this.layer].winChance)) player[this.layer].win = new Decimal(1)
                else player[this.layer].win = new Decimal(0)
            },
            display() {
                return "3"+"\n\
                Counte pick chance: " + format(player[this.layer].pickChance3)+ "%" + "\n\
                Hero power: " + format(player[this.layer].power3) + "%"
            },
        },
        24: {
            unlocked() { return player[this.layer].pick.eq(1) },
            canClick() { return true },
            onClick() { 
                player[this.layer].play = new Decimal(0)
                player[this.layer].pick = new Decimal(0)
                player[this.layer].play2 = new Decimal(1)
                player[this.layer].pickChance = Math.random() * 100
                if (new Decimal(player[this.layer].pickChance).lte(player[this.layer].pickChance4)) player[this.layer].cpick = new Decimal(1)
                else player[this.layer].cpick = new Decimal(0)
                lineChance = new Decimal(Math.random()* 100)
                if (new Decimal(lineChance).lte(50)) player[this.layer].line = new Decimal(1)
                else player[this.layer].line = new Decimal(0)
                player[this.layer].winChance = new Decimal(80)
                if (new Decimal(player[this.layer].pick).eq(1)) player[this.layer].winChance = new Decimal(player[this.layer].winChance).mul(0.7)
                if (new Decimal(player[this.layer].line).eq(1)) player[this.layer].winChance = new Decimal(player[this.layer].winChance).mul(1.2)
                else player[this.layer].winChance = new Decimal(player[this.layer].winChance).div(1.2)
                lateChance = new Decimal(Math.random()* 100)
                if (new Decimal(lateChance).lte(50)) player[this.layer].late = new Decimal(1)
                else player[this.layer].late = new Decimal(0)
                if (new Decimal(player[this.layer].late).eq(1)) player[this.layer].winChance = new Decimal(player[this.layer].winChance).mul(1.2)
                else player[this.layer].winChance = new Decimal(player[this.layer].winChance).div(1.2)
                player[this.layer].winChance = new Decimal(player[this.layer].winChance).mul(player[this.layer].power4).div(100)
                win = new Decimal(Math.random() * 100)
                if (new Decimal(win).lte(player[this.layer].winChance)) player[this.layer].win = new Decimal(1)
                else player[this.layer].win = new Decimal(0)
            },
            display() {
                return "4"+"\n\
                Counte pick chance: " + format(player[this.layer].pickChance4)+ "%"+ "\n\
                Hero power: " + format(player[this.layer].power4)+"%"
            },
        },
        25: {
            unlocked() { return player[this.layer].pick.eq(1) },
            canClick() { return true },
            onClick() {
                player[this.layer].play = new Decimal(0)
                player[this.layer].pick = new Decimal(0)
                player[this.layer].play2 = new Decimal(1)
                player[this.layer].pickChance = Math.random() * 100
                if (new Decimal(player[this.layer].pickChance).lte(player[this.layer].pickChance5)) player[this.layer].cpick = new Decimal(1)
                else player[this.layer].cpick = new Decimal(0)
                lineChance = new Decimal(Math.random()* 100)
                if (new Decimal(lineChance).lte(50)) player[this.layer].line = new Decimal(1)
                else player[this.layer].line = new Decimal(0)
                player[this.layer].winChance = new Decimal(80)
                if (new Decimal(player[this.layer].pick).eq(1)) player[this.layer].winChance = new Decimal(player[this.layer].winChance).mul(0.7)
                if (new Decimal(player[this.layer].line).eq(1)) player[this.layer].winChance = new Decimal(player[this.layer].winChance).mul(1.2)
                else player[this.layer].winChance = new Decimal(player[this.layer].winChance).div(1.2)
                lateChance = new Decimal(Math.random()* 100)
                if (new Decimal(lateChance).lte(50)) player[this.layer].late = new Decimal(1)
                else player[this.layer].late = new Decimal(0)
                if (new Decimal(player[this.layer].late).eq(1)) player[this.layer].winChance = new Decimal(player[this.layer].winChance).mul(1.2)
                else player[this.layer].winChance = new Decimal(player[this.layer].winChance).div(1.2)
                player[this.layer].winChance = new Decimal(player[this.layer].winChance).mul(player[this.layer].power5).div(100)
                win = new Decimal(Math.random() * 100)
                if (new Decimal(win).lte(player[this.layer].winChance)) player[this.layer].win = new Decimal(1)
                else player[this.layer].win = new Decimal(0)
            },
            display() {
                return "5"+"\n\
                Counte pick chance: " + format(player[this.layer].pickChance5)+"%" +"\n\
                Hero power: " + format(player[this.layer].power5) + "%"
            },
        },
    },
    update(diff) {
        let data = player[this.layer]
        if (data.progress1.gte(0.1)) {
            data.energyGain1 =  new Decimal(5).pow(data.progress1.times(10).sub(1)) * diff
            if (hasUpgrade("z", 11)) data.energyGain1 = new Decimal(data.energyGain1).mul(3)
            if (hasUpgrade("z", 25)) data.energyGain1 = new Decimal(data.energyGain1).mul(5)
            data.energy = data.energy.plus(data.energyGain1)
        }
        if (data.progress2.gte(0.1)) {
            data.poopChance = new Decimal(Math.random())
            data.energyGain2 =  new Decimal(5).pow(data.progress2.times(10).sub(1)).times(3) * diff
            if (hasUpgrade("z", 11)) data.energyGain2 = new Decimal(data.energyGain2).mul(3)
            if (hasUpgrade("z", 25)) data.energyGain1 = new Decimal(data.energyGain1).mul(5)
            data.energy = data.energy.plus(data.energyGain2)
            data.poopGain = new Decimal(0.03).times(data.progress2.times(10)) * diff
            if (hasUpgrade("z", 21)) data.poopGain = new Decimal(data.poopGain).div(3)
            data.progress3 = data.progress3.plus(data.poopGain)
        }
        if (data.progress2.lte(0) && data.progress3.gte(0)) {
            let poopDic = new Decimal(0.001)
            if (hasUpgrade("z", 21)) poopDic = new Decimal(poopDic).mul(3)
            data.progress3 = new Decimal(data.progress3.sub(poopDic))
        }
        if (data.poopChance.lte(data.progress3.div(100))) {
            data.energy = data.energy.div(2)
            data.progress3 = new Decimal(0)
        }
        if (new Decimal(data.play).eq(1)) {
            let gameSpeed = new Decimal(1)
            if (hasUpgrade("z", 12)) gameSpeed = new Decimal(gameSpeed).mul(1.5)
            if (hasUpgrade("z", 23)) gameSpeed = new Decimal(gameSpeed).mul(1.5)
            data.playTime = new Decimal(data.playTime).plus(gameSpeed * diff )
            if (new Decimal(data.playTime).gte(0) && new Decimal(data.playTime).lte(3)) data.playText = new String("Подбор игроков...")
            if (new Decimal(data.playTime).gte(3)) {
                data.playText = new String("Выбор героя...")
                data.play = new Decimal(0)
                data.playTime = new Decimal(0)
                data.pick = new Decimal(1)
                data.pickChance1 = new Decimal(Math.floor((Math.random() * 60 ) + 20))
                data.power1 = new Decimal(Math.floor((Math.random() * 60 ) + 40))
                data.pickChance2 = new Decimal(Math.floor((Math.random() * 60 ) + 20))
                data.power2 = new Decimal(Math.floor((Math.random() * 60 ) + 40))
                data.pickChance3 = new Decimal(Math.floor((Math.random() * 60 ) + 20))
                data.power3 = new Decimal(Math.floor((Math.random() * 60 ) + 40))
                data.pickChance4 = new Decimal(Math.floor((Math.random() * 60 ) + 20))
                data.power4 = new Decimal(Math.floor((Math.random() * 60 ) + 40))
                data.pickChance5 = new Decimal(Math.floor((Math.random() * 60 ) + 20))
                data.power5 = new Decimal(Math.floor((Math.random() * 60 ) + 40))
            }
        }
        if (new Decimal(data.play2).eq(1)) {
            let gameSpeed = new Decimal(1)
            if (hasUpgrade("z", 12)) gameSpeed = new Decimal(gameSpeed).mul(1.5)
            if (hasUpgrade("z", 23)) gameSpeed = new Decimal(gameSpeed).mul(1.5)
            data.playTime2 = new Decimal(data.playTime2).plus(gameSpeed * diff)
            if (new Decimal(data.playTime2).lte(3) && new Decimal(data.cpick).eq(0))  data.playText = new String("Вас не контрПикнули")
            if (new Decimal(data.playTime2).lte(3) && new Decimal(data.cpick).eq(1))  data.playText = new String("Вас контрПикнули")
            if (new Decimal(data.playTime2).gte(3) && new Decimal(data.playTime2).lte(6)) data.playText = new String("Лайнинг...")
            if (new Decimal(data.playTime2).gte(6) && new Decimal(data.playTime2).lte(9) && new Decimal(data.line).eq(0))  data.playText = new String("Вы проиграли Лайн")
            if (new Decimal(data.playTime2).gte(6) && new Decimal(data.playTime2).lte(9) && new Decimal(data.line).eq(1))  data.playText = new String("Вы выиграли Лайн")
            if (new Decimal(data.playTime2).gte(9) && new Decimal(data.playTime2).lte(12) && new Decimal(data.late).eq(0))  data.playText = new String("Вы плохо играете в лейте")
            if (new Decimal(data.playTime2).gte(9) && new Decimal(data.playTime2).lte(12) && new Decimal(data.late).eq(1))  data.playText = new String("Вы хорошо играете в лейте")
            if (new Decimal(data.playTime2).gte(12) && new Decimal(data.playTime2).lte(15) && new Decimal(data.win).eq(0))  data.playText = new String("Вы проиграли, -" + format(data.MMRGain) +"MMR")
            if (new Decimal(data.playTime2).gte(12) && new Decimal(data.playTime2).lte(15) && new Decimal(data.win).eq(1))  data.playText = new String("Вы Выиграли, +" + format(data.MMRGain) + "MMR")
            if (new Decimal(data.playTime2).gte(15)) {
                if (new Decimal(data.win).eq(1)) data.MMR = new Decimal(data.MMR).plus(data.MMRGain)
                if (new Decimal(data.win).eq(0)) data.MMR = new Decimal(data.MMR).sub(data.MMRGain)
                data.play2 = new Decimal(0)
                data.pick = new Decimal(0)
                data.line = new Decimal(0)

                data.late = new Decimal(0)
                data.win = new Decimal(0)
                data.playTime2 = new Decimal(0)
            }
        }
    },
    upgrades: {
        11: {
            unlocked() {return true},
            title: "Energy drink",
            description: "x3 to energy",
            cost: new Decimal(1),
            currencyInternalName() { return "MMR" },
            currencyLocation() { return player[this.layer] },
        },
        12: {
            unlocked() {return true},
            title: "Turbo rating",
            description: "x1.5 to game speed",
            cost: new Decimal(2),
            currencyInternalName() { return "MMR" },
            currencyLocation() { return player[this.layer] },
            currencyDisplayName() { return "MMR" },
        },
        13: {
            unlocked() {return true},
            title: "Harder games",
            description: "x5 to games requiments and to MMR gain",
            cost: new Decimal(3),
            currencyInternalName() { return "MMR" },
            currencyLocation() { return player[this.layer] },
            currencyDisplayName() { return "MMR" },
            onPurchase() {
                player[this.layer].MMRGain = new Decimal(5)
            }
        },
        14: {
            unlocked() {return true},
            title: "INT money",
            description: "Money 5th upgrade boost better",
            cost: new Decimal(5),
            currencyInternalName() { return "MMR" },
            currencyLocation() { return player[this.layer] },
            currencyDisplayName() { return "MMR" },
        },
        15: {
            unlocked() {return true},
            title: "Harder games 2",
            description: "x5 to games requiments and to MMR gain",
            cost: new Decimal(10),
            currencyInternalName() { return "MMR" },
            currencyLocation() { return player[this.layer] },
            currencyDisplayName() { return "MMR" },
            onPurchase() {
                player[this.layer].MMRGain = new Decimal(25)
            }
        },
        21: {
            unlocked() {return hasUpgrade("z", 15)},
            title: "Clisma",
            description: "divide poopChanceGain by 3",
            cost: new Decimal(25),
            currencyInternalName() { return "MMR" },
            currencyLocation() { return player[this.layer] },
            currencyDisplayName() { return "MMR" },
        },
        22: {
            unlocked() {return hasUpgrade("z", 15)},
            title: "IQ empower",
            description: "x2.2 to IQ",
            cost: new Decimal(25),
            currencyInternalName() { return "MMR" },
            currencyLocation() { return player[this.layer] },
            currencyDisplayName() { return "MMR" },
        },
        23: {
            unlocked() {return hasUpgrade("z", 15)},
            title: "Turbo Voin",
            description: "another x1.5 to game speed",
            cost: new Decimal(50),
            currencyInternalName() { return "MMR" },
            currencyLocation() { return player[this.layer] },
            currencyDisplayName() { return "MMR" },
        },
        24: {
            unlocked() {return hasUpgrade("z", 15)},
            title: "Harder games v3",
            description: "x5 to games requiments and x4 to MMR gain",
            cost: new Decimal(75),
            currencyInternalName() { return "MMR" },
            currencyLocation() { return player[this.layer] },
            currencyDisplayName() { return "MMR" },
            onPurchase() {
                player[this.layer].MMRGain = new Decimal(100)
            }
        },
        25: {
            unlocked() {return hasUpgrade("z", 15)},
            title: "sleep",
            description: "x5 to energy gain",
            cost: new Decimal(100),
            currencyInternalName() { return "MMR" },
            currencyLocation() { return player[this.layer] },
            currencyDisplayName() { return "MMR" },
        },
    },
})
