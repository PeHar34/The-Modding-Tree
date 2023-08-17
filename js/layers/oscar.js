addLayer("o", {
    name: "Oscar",
    symbol: "o",
    position: 0,
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        setBuyableAmount: new Decimal(0)
    }},
    layerShown() { return player[this.layer].unlocked || new Decimal(player.w.points).gte(1e33) },
    color: "#D3D3D3",
    requires: new Decimal(1e37),
    row: "3",
    canReset() { return false },
    resource: "motivation points",
    baseResource: "minutes",
    autoPrestige() { return false },
    doReset(resettingLayer) {
        if(layers[resettingLayer].row <= this.row) return;
            let keep = []

            layerDataReset(this.layer, keep) 
    },
    resetsNothing() { return false },
    baseAmount() {return player.w.points},
    type: "normal",
    exponent() {
        exponent = 2
        return exponent
    },
    gainMult() {
        mult = new Decimal(1)
        return mult
    },
    directMult() {
        mult = new Decimal(1)
        return mult
    },
    canBuyMax() {return false},
})