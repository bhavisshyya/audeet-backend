import Item from "../models/itemModel.js";
import Purchase from "../models/purchaseModel.js";
import User from "../models/userModel.js";

export const createPurchase = async (req, res, next) => {
   const { billNo, billDate, supplier, yourGstin, supplyState, items, isPaid } =
      req.body;

   if (
      !billNo ||
      !billDate ||
      !supplier ||
      !yourGstin ||
      !supplyState ||
      !items ||
      isPaid === undefined
   )
      return next("please fill all the required fields");
   let itemsId = [];
   const savedItems = await Item.insertMany(items);

   savedItems.forEach((it) => {
      itemsId.push(it);
   });
   const obj = req.body;
   obj.items = itemsId;
   const newPurchase = new Purchase(obj);
   const savedPurchase = await newPurchase.save();
   const user = await User.findById(req.user.userId);
   user.purchases.push(savedPurchase._id);
   await user.save();

   res.status(201).json({
      success: true,
      message: "purchase created successfully",
      savedPurchase,
   });
};

export const getAllPurchase = async (req, res, next) => {
   const user = await User.findById(req.user.userId).populate("purchases");
   console.log(user);
   const purchases = user.purchases;
   res.status(200).json({ success: true, purchases });
};

export const getSinglePurchase = async (req, res, next) => {
   const purchase = await Purchase.findById(req.params.id);
   res.status(200).json({ success: true, purchase });
};
