import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
      },
      //   password: {
      //      type: String,
      //      minlength: [6, "length of password should be greater than 6"],
      //      select: true,
      //   },
      phoneNo: {
         type: String,
         validate: validator.isMobilePhone,
      },
      businessName: {
         type: [string],
      },
      isAdmin: {
         type: Boolean,
         default: false,
      },
      otp: {
         type: String,
         // required: true,
      },
   },
   { timestamps: true },
);

// // JSON Token
// userSchema.methods.createJWT = function () {
//    return jwt.sign(
//       { userId: this._id, isAdmin: this.isAdmin },
//       process.env.JWT_KEY,
//       {
//          expiresIn: "3d",
//       }
//    );
// };

export default mongoose.model("User", userSchema);
