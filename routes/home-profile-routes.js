const express = require('express');
const authMiddleware = require('../middleware/auth-mdlware');
const { sendMessage, getMessages } = require('../controllers/home-profile-ctrls');

const router = express.Router();

router.get('/home', authMiddleware, (req, res) => {
    const {username, userId} = req.userInfo;

    res.status(200).json({
        success : true,
        prompt : `You are welcome to the home page.`,
        username,
        userId
    });
});

router.post('/sendmsg', sendMessage);

router.post('/getmsg', getMessages);

module.exports = router;