import mongoose from "mongoose";
import validator from "validator";

const customerSchema = new mongoose.Schema(
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
         type: string,
         validate: validator.isEmail,
      },
      gstin: {
         type: string,
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
         type: Bool,
      },
      isCustomer: {
         type: String, // if false -> supplier
         enum: ["customer", "supplier"],
      },
   },
   { timestamps: true },
);

export default mongoose.model("Customer", customerSchema);
