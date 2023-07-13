import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
      },
      password: {
         type: String,
         minlength: [6, "length of password should be greater than 6"],
         select: true,
      },
      phoneNo: {
         type: String,
         validate: validator.isMobilePhone,
      },
      businessName: {
         type: [String],
      },
      isAdmin: {
         type: Boolean,
         default: false,
      },
      email: {
         type: String,
         required: true,
      },
      gst: {
         type: String,
      },
      pan: {
         type: String,
      },
      customers: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer",
         },
      ],
      suppliers: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Supplier",
         },
      ],
      purchases: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Purchase",
         },
      ],
      expances: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Expance",
         },
      ],
   },
   { timestamps: true },
);

// hashing password
userSchema.pre("save", async function (next) {
   if (!this.isModified("password")) return;
   const salt = await bcrypt.genSalt(10);
   this.password = await bcrypt.hash(this.password, salt);
});

// JSON Token
userSchema.methods.createJWT = function () {
   return jwt.sign(
      { userId: this._id, isAdmin: this.isAdmin },
      process.env.JWT_KEY,
      {
         expiresIn: "3d",
      },
   );
};

// compare password
userSchema.methods.comparePassword = async function (userPassword) {
   const isMatch = bcrypt.compare(userPassword, this.password);
   return isMatch;
};

export default mongoose.model("User", userSchema);
