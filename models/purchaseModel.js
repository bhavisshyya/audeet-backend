import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema(
   {
      billNo: {
         type: Number,
         required: true,
      },
      billDate: {
         type: String,
         required: true,
      },
      supplier: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Supplier",
      },
      yourGstin: {
         type: String,
         required: true,
      },
      supplyState: {
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

export default mongoose.model("Purchase", purchaseSchema);
