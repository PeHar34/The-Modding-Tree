addLayer("w", {
    name: "Waiting",
    symbol: "w",
    position: 1,
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    layerShown() { return player[this.layer].unlocked || hasUpgrade("d", 41) },
    color: "#008B8B",
    requires: new Decimal(86400),
    row: "2",
    resource: "Minutes",
    baseResource: "Seconds",
    doReset(resettingLayer) {
        if(layers[resettingLayer].row <= this.row) return;
            let keep = []
            let keepBuyables = []

            layerDataReset(this.layer, keep) 
    },
    baseAmount() {return player.d.points},
    type: "custom",
    resetDescription: "Reset all your seconds for",
    getResetGain() {
        return new Decimal(player.d.points).div(86400)
    },
    getNextAt(canMax=false) {return 86400},
    canReset() { return false },
    exponent() {
        exponent = 1
        return exponent
    },
    gainMult() {
        mult = new Decimal(1)
        return mult
    },
    canBuyMax() {return false },
    buyables: {
        
    },
    upgrades:{
        
    },
    milestones: {
        
    },
})