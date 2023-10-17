const bcrypt = require("bcrypt");
const User = require("../model/User");
const Otp = require("../model/Otp");
const otpGenerator = require("otp-generator");

exports.signup = async (req, res) => {
  try {
    const { userName, email, password, confirmPassword, otp } = req.body;

    if (!userName || !email || !password || !confirmPassword || !otp) {
      return res.status(400).json({
        success: false,
        message: "All fields are mandatory",
      });
    }

    if (password.length < 6) {
      return res.status(500).json({
        success: false,
        message: "Invalid password length",
      });
    }

    if (password !== confirmPassword) {
      return res.status(502).json({
        success: false,
        message: "Invalid password length",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser.length != 0) {
      return res.status(501).json({
        success: false,
        message: "User already exists",
      });
    }

    const recentOtp = await Otp.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);

    if (recentOtp.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Otp doesn't exists for this email",
      });
    } else if (otp !== recentOtp[0].otp) {
      return res.status(404).json({
        success: false,
        message: "Invalid Otp",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await User.create({
      userName,
      email,
      password: hashedPassword,
    });

    return res.status(200).json({
      success: true,
      message: "Signup successful",
    });
  } catch (error) {
    console.log("Error in signup", error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered. Please try again.",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are mandatory",
      });
    }

    const existingUser = await User.find({ email });

    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email id not registered please signup",
      });
    }


    if (await bcrypt.compare(password, existingUser.password)) {
      const loggedUser = {};
      loggedUser.userName = existingUser.userName;
      loggedUser.userId = existingUser._id;
      loggedUser.email = existingUser.email;
      return res.status(200).json({
        success: true,
        message: "Login success",
        user: loggedUser
      });
    } else {
      return res.status(406).json({
        success: false,
        message: "Incorrect Password",
      });
    }
  } catch (error) {
    console.log("Error while logging in", error);
    return res.status(500).json({
      success: false,
      message: "Error while logging in",
    });
  }
};

exports.sendOtp = async (req, res) => {

  const { email } = req.body;

  const existingEmail = await User.find({ email });

  if (existingEmail) {
    return res.status(409).json({
      success: false,
      message: "Email already registered"
    });
  }

  let createdOtp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false
  });

  const existingOtp = await Otp.find({ otp: createdOtp });

  while (existingOtp) {
    createdOtp = otpGenerator.generate(6, {
      upperCaseAlphabets: false
    })
  }

  const otpPayload = { email, createdOtp };

  await Otp.create(otpPayload);

  res.status(200).json({
    success: true,
    message: "Otp Sent Successfully",
    otp: createdOtp
  });



}