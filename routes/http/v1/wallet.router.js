const {
    handleGetUserWallets,
    handleTransferBean,
    handleTransferDiamond,
    handleTransferVIPDiamond,
    handleInsertBeanFromVault,
    handleInsertDiamondFromVault,
    handleInsertVIPDiamondFromVault,
} = require("../../../controllers/http/wallet.controller");

const router = require("express").Router();

router.get("/user/:userId", handleGetUserWallets);
router.post("/bean/transfer", handleTransferBean);
router.post("/diamond/transfer", handleTransferDiamond);
router.post("/vip-diamond/transfer", handleTransferVIPDiamond);
router.post("/bean/insert-from-vault", handleInsertBeanFromVault);
router.post("/diamond/insert-from-vault", handleInsertDiamondFromVault);
router.post("/vip-diamond/insert-from-vault", handleInsertVIPDiamondFromVault);

module.exports = router;
