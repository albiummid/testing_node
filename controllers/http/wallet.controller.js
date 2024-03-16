const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const {
    insertBeanFromVault,
    transferBean,
    transferDiamond,
    transferVIPDiamond,
    insertDiamondFromVault,
    insertVIPDiamondFromVault,
    getUserWallets,
} = require("../../services/wallet.service");

const resHTTP = require("../../utils/resHTTP");
module.exports = {
    handleGetUserWallets: catchAsyncErrors(async (req, res) => {
        const data = await getUserWallets(req.params.userId);
        resHTTP("User's Wallets", data, res, 200);
    }),
    handleTransferBean: catchAsyncErrors(async (req, res) => {
        const data = await transferBean(
            req.body.providerId,
            req.body.consumerId,
            Number(req.body.amount)
        );

        resHTTP("Transfer successed", data, res, 200);
    }),
    handleTransferDiamond: catchAsyncErrors(async (req, res) => {
        const data = await transferDiamond(
            req.body.providerId,
            req.body.consumerId,
            Number(req.body.amount)
        );

        resHTTP("Transfer successed", data, res, 200);
    }),
    handleTransferVIPDiamond: catchAsyncErrors(async (req, res) => {
        const data = await transferVIPDiamond(
            req.body.providerId,
            req.body.consumerId,
            Number(req.body.amount)
        );

        resHTTP("Transfer successed", data, res, 200);
    }),
    handleInsertBeanFromVault: catchAsyncErrors(async (req, res) => {
        const data = await insertBeanFromVault(
            req.body.consumerId,
            Number(req.body.amount)
        );
        resHTTP("Inserted beans from vault succeed", data, res, 200);
    }),
    handleInsertDiamondFromVault: catchAsyncErrors(async (req, res) => {
        const data = await insertDiamondFromVault(
            req.body.consumerId,
            Number(req.body.amount)
        );
        resHTTP("Inserted beans from vault succeed", data, res, 200);
    }),
    handleInsertVIPDiamondFromVault: catchAsyncErrors(async (req, res) => {
        const data = await insertVIPDiamondFromVault(
            req.body.consumerId,
            Number(req.body.amount)
        );
        resHTTP("Inserted beans from vault succeed", data, res, 200);
    }),
};
