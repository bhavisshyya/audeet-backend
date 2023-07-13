import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
   {
      itemName: {
         type: String,
      },
      itemCode: {
         type: String,
         required: true,
      },
      unitPrice: {
         type: Number,
         required: true,
      },
      quantity: {
         type: Number,
         default: 1,
      },
      gstPercent: {
         type: Number,
      },
      totalAmount: {
         type: Number,
         required: true,
      },
   },
   { timestamps: true },
);

export default mongoose.model("Item", itemSchema);
