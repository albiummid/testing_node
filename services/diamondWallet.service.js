const Transaction = require("../database/models/Transaction");
const WalletDiamond = require("../database/models/WalletDiamond");
const vaultTransaction = require("../database/models/vaultTransaction");
const ErrorHandler = require("../utils/errorHandler");
const { getDiamondVault, getVIPDiamondVault } = require("./vault.service");

module.exports = {
    transferDiamond: async function (providerId, consumerId, amount) {
        const providerDW = await WalletDiamond.findOne({ owner: providerId });
        const consumerDW = await WalletDiamond.findOne({ owner: consumerId });
        if (!providerDW || !consumerDW) {
            throw new ErrorHandler("Wallet missing !", 500);
        }
        if (providerDW.current_diamonds < amount) {
            throw new ErrorHandler("Insufficiant Balance", 400);
        }
        providerDW.current_diamonds -= amount;
        consumerDW.current_diamonds += amount;
        await providerDW.save();
        await consumerDW.save();
        return await Transaction.create({
            amount,
            consumer: consumerId,
            provider: providerId,
            currency: "Bean",
            kind: "General",
        });
    },
    transferVIPDiamond: async function (providerId, consumerId, amount) {
        const providerDW = await WalletDiamond.findOne({ owner: providerId });
        const consumerDW = await WalletDiamond.findOne({ owner: consumerId });
        if (!providerDW || !consumerDW) {
            throw new ErrorHandler("Wallet missing !", 500);
        }
        if (providerDW.currnet_vip_diamonds < amount) {
            throw new ErrorHandler("Insufficiant Balance", 400);
        }
        providerDW.currnet_vip_diamonds -= amount;
        consumerDW.currnet_vip_diamonds += amount;
        await providerDW.save();
        await consumerDW.save();
        return await Transaction.create({
            amount,
            consumer: consumerId,
            provider: providerId,
            currency: "Bean",
            kind: "General",
        });
    },
    insertDiamondFromVault: async function (consumerId, amount) {
        const diamondVault = await getDiamondVault();
        const consumerDiamondWallet = await WalletDiamond.findOne({
            owner: consumerId,
        });
        if (diamondVault.current_balance < amount) {
            throw new ErrorHandler("Insufficiant Balance in vault", 400);
        }
        diamondVault.current_balance -= amount;
        consumerDiamondWallet.current_diamonds += amount;
        await diamondVault.save();
        await consumerDiamondWallet.save();

        const trx = await Transaction.create({
            amount,
            consumer: consumerId,
            provider: providerId,
            currency: "Diamond",
            kind: "Vault",
        });

        return await vaultTransaction.create({
            current_balance: diamondVault.current_balance,
            previous_balance: diamondVault.current_balance + amount,
            kind: "Decrement",
            reference_transaction: trx._id,
            vault_id: diamondVault._id,
        });
    },
    insertVIPDiamondFromVault: async function (consumerId, amount) {
        const vipDiamondVault = await getVIPDiamondVault();
        const consumerDiamondWallet = await WalletDiamond.findOne({
            owner: consumerId,
        });
        if (vipDiamondVault.current_balance < amount) {
            throw new ErrorHandler("Insufficiant Balance in vault", 400);
        }
        vipDiamondVault.current_balance -= amount;
        consumerDiamondWallet.currnet_vip_diamonds += amount;
        await vipDiamondVault.save();
        await consumerDiamondWallet.save();

        const trx = await Transaction.create({
            amount,
            consumer: consumerId,
            provider: providerId,
            currency: "VIP Diamond",
            kind: "Vault",
        });

        return await vaultTransaction.create({
            current_balance: vipDiamondVault.current_balance,
            previous_balance: vipDiamondVault.current_balance + amount,
            kind: "Decrement",
            reference_transaction: trx._id,
            vault_id: vipDiamondVault._id,
        });
    },
};
