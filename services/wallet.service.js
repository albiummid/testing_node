const Transaction = require("../database/models/Transaction");
const WalletBean = require("../database/models/WalletBean");
const WalletDiamond = require("../database/models/WalletDiamond");
const vaultTransaction = require("../database/models/VaultTransaction");
const {
    getDiamondVault,
    getVIPDiamondVault,
    getBeanVault,
} = require("./vault.service");
const uuid = require("uuid").v4;
const ErrorHandler = require("../utils/errorHandler");
module.exports = {
    getUserWallets: async function (uid) {
        const bean_wallet = await WalletBean.findOne({
            owner: uid,
        });
        const diamond_wallet = await WalletDiamond.findOne({
            owner: uid,
        });
        return {
            bean_wallet,
            diamond_wallet,
        };
    },
    transferBean: async function (providerId, consumerId, amount) {
        const providerBW = await WalletBean.findOne({ owner: providerId });
        const consumerBW = await WalletBean.findOne({ owner: consumerId });
        if (!providerBW || !consumerBW) {
            throw new ErrorHandler("Wallet missing !", 500);
        }
        if (providerBW.current_beans < amount) {
            throw new ErrorHandler("Insufficiant Balance", 400);
        }
        providerBW.current_beans -= amount;
        consumerBW.current_beans += amount;
        await providerBW.save();
        await consumerBW.save();
        return await Transaction.create({
            amount,
            consumer: consumerId,
            provider: providerId,
            currency: "Bean",
            kind: "General",
            trx_id: uuid(),
        });
    },
    insertBeanFromVault: async function (consumerId, amount) {
        const beanVault = await getBeanVault();
        const consumerBeanWallet = await WalletBean.findOne({
            owner: consumerId,
        });
        if (beanVault.current_balance < amount) {
            throw new ErrorHandler("Insufficiant Balance in vault", 400);
        }
        beanVault.current_balance -= amount;
        consumerBeanWallet.current_beans += amount;
        await beanVault.save();
        await consumerBeanWallet.save();

        const trx = await Transaction.create({
            amount,
            consumer: consumerId,
            provider: beanVault._id,
            currency: "Bean",
            kind: "Vault",
            trx_id: uuid(),
        });

        await vaultTransaction.create({
            current_balance: beanVault.current_balance,
            previous_balance: beanVault.current_balance + amount,
            kind: "Decrement",
            reference_transaction: trx._id,
            vault_id: beanVault._id,
        });
        return trx;
    },
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
            currency: "Diamond",
            kind: "General",
            trx_id: uuid(),
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
            currency: "VIP Diamond",
            kind: "General",
            trx_id: uuid(),
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
            provider: diamondVault._id,
            currency: "Diamond",
            kind: "Vault",
            trx_id: uuid(),
        });

        await vaultTransaction.create({
            current_balance: diamondVault.current_balance,
            previous_balance: diamondVault.current_balance + amount,
            kind: "Decrement",
            reference_transaction: trx._id,
            vault_id: diamondVault._id,
        });

        return trx;
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
            provider: vipDiamondVault._id,
            currency: "VIP Diamond",
            kind: "Vault",
            trx_id: uuid(),
        });

        await vaultTransaction.create({
            current_balance: vipDiamondVault.current_balance,
            previous_balance: vipDiamondVault.current_balance + amount,
            kind: "Decrement",
            reference_transaction: trx._id,
            vault_id: vipDiamondVault._id,
        });
        return trx;
    },
};
