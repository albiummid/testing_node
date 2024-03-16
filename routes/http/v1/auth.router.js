const {
    handleSignInWithGoogle,
    handleSignInWithFacebook,
    handleUserLogout,
} = require("../../../controllers/http/auth.controller");

const router = require("express").Router();

router.post("/signIn/google", handleSignInWithGoogle);
router.post("/signIn/facebook", handleSignInWithFacebook);
router.get("/signout", handleUserLogout);

module.exports = router;
