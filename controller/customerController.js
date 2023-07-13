import Customer from "../models/customerModel.js";
import User from "../models/userModel.js";

export const addCustomer = async (req, res, next) => {
   const customer = new Customer({
      ...req.body,
   });
   await customer.save();

   const userId = req.user.userId;

   const user = await User.findById(userId);
   user.customers.push(customer);
   await user.save();

   res.status(201).json({
      success: true,
      message: "Customer added successfully",
      customer,
   });
};

export const getCustomer = async (req, res, next) => {
   const customerId = req.params.id;

   const customer = await Customer.findById(customerId);
   if (!customer) {
      return next({
         message: "Customer not found",
      });
   }

   res.status(200).json({
      success: true,
      message: "Customer found",
      customer,
   });
};
