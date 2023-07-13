import mongoose from "mongoose";

const expanceSchema = new mongoose.Schema(
   {
      billNo: {
         type: Number,
         required: true,
      },
      billDate: {
         type: String,
         required: true,
      },
      customer: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Customer",
      },
      yourGstin: {
         type: String,
         required: true,
      },
      items: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Item",
         },
      ],
      discountPercent: {
         type: Number,
      },
      extraCharges: {
         type: Number,
      },
      isPaid: {
         type: Boolean,
         required: true,
      },
      dueDate: {
         type: String,
         required: true,
      },
   },
   { timestamps: true },
);

export default mongoose.model("Expance", expanceSchema);
