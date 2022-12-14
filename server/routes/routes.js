const {Router} = require('express');
const User = require("../models/User");
const config = require("config")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {check, validationResult} = require("express-validator");
const router = Router();

router.post("/signUp",
    [
        check("email", "Invalid email").isEmail(),
        check("password", "Password must contain at least 8 characters").isLength({min: 8})
    ],
    async(req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status("400").json({
                    errors: errors.array(),
                    message: "Invalid data"
                });
            }
            const {email, password, bio} = req.body;
            const applicant = await User.findOne({email});
            if (applicant) {
                return res.status(400).json({message: "That user already exists"});
            }
            const hashPassWord = await bcrypt.hash(password, 12);
            const user = new User({
                email,
                password: hashPassWord,
                bio
            });
            await user.save();
            res.status(201).json({message: "User user has been successfully created"});
        } catch(e) {
            res.status(500).json({message: "An error occured"});
        }
    }
);
router.post("/signIn",
    [
        check("email", "Invalid email").normalizeEmail().isEmail(),
        check("password", "Invalid password").exists()
    ],
    async(req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status("400").json({
                    errors: errors.array(),
                    message: "Invalid data"
                });
            }
            const {email, password} = req.body;
            const user = await User.findOne({email});
            if (!user) {
                return res.status(400).json({message: "User isn't exists"});
            }
            const isEqual = await bcrypt.compare(password, user.password);
            if (!isEqual) {
                return res.status(400).json({message: "Incorrect password"});
            }
            const token = jwt.sign(
                {
                  userId: user._id,
                  userEmail: user.email,
                },
                config.get("jwtSecret"),
                { expiresIn: "2h" }
            );
            res.status(200).json({token, userId: user._id});
        } catch(e) {
            res.status(500).json({message: "An error occured"});
        }
    }
);
router.get("/bio/:userId",
    async(req, res) => {
        try {
            const id = req.params.userId;
            const user = await User.findById(id);
            if (!user) {
                return res.status(400).json({message: "User didn't found"});
            }
            res.status(200).json({
                email: user.email,
                bio: user.bio
            });
        } catch(e) {
            res.status(500).json({message: "An error occured"});
        }
    }
);

module.exports = router;