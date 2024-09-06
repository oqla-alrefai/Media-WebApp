const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt")
const User = require("../models/User")


const register = async (req, res) => {
    try {
        hashedPassword = bcrypt.hashSync(req.body.password,10)
        const user = new User({
          username: req.body.username,
          email: req.body.email,
          password: hashedPassword,
        });
        const {password, ...data} = user._doc
        await user.save()
        res.status(200).json({
            data,
            message: "User has been registered successfully"
        })
    } catch (error) {
        res.status(500).json({
            error: error,
            message: "Error occured registering user"
        })
        console.log(error);
    }
}


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json("Email and password are required");
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json("User not found");
        }

        const passwordCheck = await bcrypt.compare(password, user.password);
        if (!passwordCheck) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const { password: pwd, ...usr } = user._doc;

        // Generate token
        const token = jwt.sign({ id: user._id, username:user.username, email:user.email }, 'your_secret_key', { expiresIn: '1h' });

        res.status(200).json({
            usr,
            token,
            message: "User logged in successfully"
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: "Error occurred logging in user"
        });
        console.log(error);
    }
};


module.exports = { register, login };
