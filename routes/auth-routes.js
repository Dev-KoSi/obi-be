const express = require("express");
const { signUpUser, signInUser } = require("../controllers/auth-ctrls");

const router = express.Router();

router.post('/signup', signUpUser);
router.post('/login', signInUser);

module.exports = router;    