import Supplier from "../models/supplierModel.js";
import User from "../models/userModel.js";

export const addSupplier = async (req, res, next) => {
   const supplier = new Supplier({
      ...req.body,
   });
   await supplier.save();

   const userId = req.user.userId;

   const user = await User.findById(userId);
   user.suppliers.push(supplier);
   await user.save();

   res.status(201).json({
      success: true,
      message: "supplier added successfully",
      supplier,
   });
};

export const getSupplier = async (req, res, next) => {
   const supplierId = req.params.id;

   const supplier = await Supplier.findById(supplierId);
   if (!supplier) {
      return next({
         message: "supplier not found",
      });
   }

   res.status(200).json({
      success: true,
      message: "supplier found",
      supplier,
   });
};
