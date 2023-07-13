import Item from "../models/itemModel.js";
import Expance from "../models/expanceModel.js";
import User from "../models/userModel.js";

export const createExpance = async (req, res, next) => {
   const { billNo, billDate, customer, yourGstin, items, isPaid } = req.body;

   if (
      !billNo ||
      !billDate ||
      !customer ||
      !yourGstin ||
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
   const newExpance = new Expance(obj);
   const savedExpance = await newExpance.save();
   const user = await User.findById(req.user.userId);
   user.expances.push(savedExpance._id);
   await user.save();

   res.status(201).json({
      success: true,
      message: "Expance created successfully",
      savedExpance,
   });
};

export const getAllExpance = async (req, res, next) => {
   const user = await User.findById(req.user.userId).populate("expances");
   console.log(user);
   const expances = user.expances;
   res.status(200).json({ success: true, expances });
};

export const getSingleExpance = async (req, res, next) => {
   const expance = await Expance.findById(req.params.id);
   res.status(200).json({ success: true, expance });
};
