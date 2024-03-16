const {
    handleGetBeanVault,
    handleGetDiamondVault,
    handleGetVIPDiamondVault,
    handleInsertAmountOnVault,
} = require("../../../controllers/http/vault.controller");

const router = require("express").Router();

router.get("/bean", handleGetBeanVault);
router.get("/diamond", handleGetDiamondVault);
router.get("/vip-diamond", handleGetVIPDiamondVault);
router.post("/insert-amount", handleInsertAmountOnVault);

module.exports = router;
