import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema(
   {
      invoiceCode: {
         type: String,
         required: true,
      },
      type: {
         type: String,
         required: true,
      },
   },
   { timestamps: true },
);

export default mongoose.model("Invoice", invoiceSchema);
