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
         type: Bool, // if false -> supplier
      },
   },
   { timestamps: true },
);

export default mongoose.model("Customer", customerSchema);
