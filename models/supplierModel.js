import mongoose from "mongoose";
import validator from "validator";

const supplierSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
      },
      phoneNo: {
         type: String,
         minlength: [10, "enter a 10 digit mobile number"],
         validate: validator.isMobilePhone,
      },
      email: {
         type: String,
         validate: validator.isEmail,
      },
      gst: {
         type: String,
      },
      state: {
         type: String,
      },
      address: {
         type: String,
      },
      amount: {
         type: Number,
      },
      toBeCollected: {
         type: Boolean,
         default: "false",
      },
   },
   { timestamps: true },
);

export default mongoose.model("Supplier", supplierSchema);
