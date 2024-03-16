const router = require("express").Router();

router.get("/status/generate-204", (req, res) => {
    console.log("🔥 Server running blazing fast 😎");
    res.status(204).json({
        success: true,
        status: 204,
    });
});

module.exports = router;
