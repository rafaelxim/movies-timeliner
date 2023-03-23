const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    res.send('Hello this is movies route');
});

module.exports = router;
