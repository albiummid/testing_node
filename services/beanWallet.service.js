const Transaction = require("../database/models/Transaction");
const WalletBean = require("../database/models/WalletBean");
const vaultTransaction = require("../database/models/vaultTransaction");
const ErrorHandler = require("../utils/errorHandler");
const { getBeanVault } = require("./vault.service");

module.exports = {
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
            provider: providerId,
            currency: "Bean",
            kind: "Vault",
        });

        await vaultTransaction.create({
            current_balance: beanVault.current_balance,
            previous_balance: beanVault.current_balance + amount,
            kind: "Decrement",
            reference_transaction: trx._id,
            vault_id: beanVault._id,
        });
    },
};
