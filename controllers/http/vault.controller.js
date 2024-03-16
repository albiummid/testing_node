const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const {
    getBeanVault,
    getVIPDiamondVault,
    getDiamondVault,
    insertAmountOnVault,
} = require("../../services/vault.service");
const resHTTP = require("../../utils/resHTTP");

module.exports = {
    handleGetBeanVault: catchAsyncErrors(async (req, res) => {
        const data = await getBeanVault();
        resHTTP("Bean Vault", data, res, 200);
    }),
    handleGetDiamondVault: catchAsyncErrors(async (req, res) => {
        const data = await getDiamondVault();
        resHTTP("Diamond Vault", data, res, 200);
    }),
    handleGetVIPDiamondVault: catchAsyncErrors(async (req, res) => {
        const data = await getVIPDiamondVault();
        resHTTP("VIPDiamond Vault", data, res, 200);
    }),
    handleInsertAmountOnVault: catchAsyncErrors(async (req, res) => {
        const data = await insertAmountOnVault(
            req.body.vault_id,
            Number(req.body.amount)
        );
        resHTTP("VIPDiamond Vault", data, res, 200);
    }),
};
