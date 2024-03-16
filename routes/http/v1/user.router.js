const {
    handleGetUserByUID,
    handleUpdateUsersBasicInfo,
    handleGetUserList,
} = require("../../../controllers/http/user.controller");

const router = require("express").Router();

router.get("/find-by-id/:id", handleGetUserByUID);
router.get("/list", handleGetUserList);
router.post("/update-basic-info/:id", handleUpdateUsersBasicInfo);

module.exports = router;
