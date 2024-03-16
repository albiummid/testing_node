const Vault = require("../database/models/Vault");
const vaultTransaction = require("../database/models/VaultTransaction");

async function getBeanVault() {
    return await Vault.findOne({
        currency: "Bean",
    });
}
async function getDiamondVault() {
    return Vault.findOne({
        currency: "Diamond",
    });
}
async function getVIPDiamondVault() {
    return Vault.findOne({
        currency: "VIP Diamond",
    });
}
async function initVault() {
    //
    if (!(await getBeanVault())) {
        await Vault.create({
            currency: "Bean",
            title: "Bean Vault",
            current_balance: 0,
        });
    }
    if (!(await getDiamondVault())) {
        await Vault.create({
            currency: "Diamond",
            title: "Diamond Vault",
            current_balance: 0,
        });
    }
    if (!(await getVIPDiamondVault())) {
        await Vault.create({
            currency: "VIP Diamond",
            title: "VIP Diamond Vault",
            current_balance: 0,
        });
    }
    console.log("⚡ Vault Initialized");
}
async function insertAmountOnVault(vault_id, amount, note) {
    const vault = await Vault.findById(vault_id);
    vault.current_balance += amount;
    await vault.save();
    return await vaultTransaction.create({
        current_balance: vault.current_balance,
        previous_balance: vault.current_balance - amount,
        kind: "Increment",
        note,
        vault_id,
    });
}

module.exports = {
    getBeanVault,
    getDiamondVault,
    getVIPDiamondVault,
    initVault,
    insertAmountOnVault,
};
