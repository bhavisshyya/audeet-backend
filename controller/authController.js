import User from "../models/userModel.js";

export const register = async (req, res, next) => {
   const { name, email, phoneNo, businessName, gst, pan, password } = req.body;
   if (!name) return next("name is required");
   if (!phoneNo) return next("phone Number is required");
   if (!email) return next("email is required");
   if (phoneNo.length !== 10) return next("enter a 10 digit mobile number");

   const phoneNoCheck = await User.findOne({ phoneNo });
   if (phoneNoCheck) return next("This phone number is already been used");

   // hash password in User Model

   const user = new User(req.body);

   await user.save();
   const token = user.createJWT();

   res.status(201).json({
      success: true,
      message: "user registered",
      token,
      user: {
         name: user.name,
         phoneNo: user.phoneNo,
         email: user.email,
         businessName: user.businessName,
         gst: user.gst,
         pan: user.pan,
      },
   });
};

export const login = async (req, res, next) => {
   const { phoneNo, password } = req.body;

   if (!password) return next("password is required");

   if (!phoneNo) return next("phoneNo is required");

   let user = await User.findOne({ phoneNo }).select("+password");

   if (!user) return res.status(200).json("wrong phone Number or password");

   const check = await user.comparePassword(password);

   if (!check) return res.status(200).json("wrong phone Number or password");

   const token = user.createJWT();

   user.password = undefined;

   user = { ...user._doc, token };

   res.status(200).json({
      message: "logged in successfully",
      success: true,
      token,
      user,
   });
};
