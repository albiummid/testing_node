const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const {
    signInWithGoogle,
    signInWithFacebook,
    logoutUser,
} = require("../../services/auth.service");
const resHTTP = require("../../utils/resHTTP");

module.exports = {
    handleSignInWithGoogle: catchAsyncErrors(async (req, res) => {
        const { properties } = req.body;
        const authData = await signInWithGoogle({ properties, req: req });
        resHTTP("You are logged in !", authData, res, 200);
    }),
    //
    handleSignInWithFacebook: catchAsyncErrors(async (req, res) => {
        const { properties } = req.body;
        const authData = await signInWithFacebook({ properties, req: req });
        resHTTP("You are logged in !", authData, res, 200);
    }),
    handleUserLogout: catchAsyncErrors(async (req, res) => {
        const signout = await logoutUser({ req });
        console.log(signout);
        resHTTP(
            "You are logged out..",
            {
                logout_success: signout,
            },
            res,
            200
        );
    }),
};
