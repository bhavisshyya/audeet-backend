import easyinvoice from "easyinvoice";
import Invoice from "../models/invoiceModel.js";
import User from "../models/userModel.js";

export const generateInvoice = async (req, res, next) => {
   const { sender, client, information, products } = req.body;
   let data = {
      // Customize enables you to provide your own templates
      customize: {
         //  "template": fs.readFileSync('template.html', 'base64') // Must be base64 encoded html
      },
      images: {
         // The logo on top of your invoice
         logo: "https://i.ibb.co/1QDN23p/logo.png",
         // The invoice background
      },
      // Your own data
      sender: sender,
      // Your recipient
      client: client,
      information: information,
      // The products you would like to see on your invoice
      // Total values are being calculated automatically
      products: products,
      // The message you would like to display on the bottom of your invoice
      "bottom-notice": "Kindly pay your invoice within due date.",
      // Settings to customize your invoice
      settings: {
         currency: "INR", // See documentation 'Locales and Currency' for more info. Leave empty for no currency.
         // locale: "as-IN", // Defaults to en-US, used for number formatting (See documentation 'Locales and Currency')
         // "margin-top": 25, // Defaults to '25'
         // "margin-right": 25, // Defaults to '25'
         // "margin-left": 25, // Defaults to '25'
         // "margin-bottom": 25, // Defaults to '25'
         // "format": "A4", // Defaults to A4, options: A3, A4, A5, Legal, Letter, Tabloid
         // "height": "1000px", // allowed units: mm, cm, in, px
         // "width": "500px", // allowed units: mm, cm, in, px
         // "orientation": "landscape", // portrait or landscape, defaults to portrait
      },
      // Translate your invoice to your preferred language
      translate: {
         // "invoice": "FACTUUR",  // Default to 'INVOICE'
         // "number": "Nummer", // Defaults to 'Number'
         // "date": "Datum", // Default to 'Date'
         // "due-date": "Verloopdatum", // Defaults to 'Due Date'
         // "subtotal": "Subtotaal", // Defaults to 'Subtotal'
         // "products": "Producten", // Defaults to 'Products'
         // "quantity": "Aantal", // Default to 'Quantity'
         // "price": "Prijs", // Defaults to 'Price'
         // "product-total": "Totaal", // Defaults to 'Total'
         // "total": "Totaal", // Defaults to 'Total'
         vat: "gst", // Defaults to 'vat'
      },
   };

   const invoice = await easyinvoice.createInvoice(data);
   const newInv = new Invoice({ invoiceCode: invoice.pdf, type: "sales" });
   const si = await newInv.save();
   const user = await User.findById(req.user.userId);
   user.invoices.push(si._id);
   await user.save();
   res.status(201).json({ success: true, invoice });
};

// let data = {
//       // Customize enables you to provide your own templates
//       customize: {
//          //  "template": fs.readFileSync('template.html', 'base64') // Must be base64 encoded html
//       },
//       images: {
//          // The logo on top of your invoice
//          logo: "https://i.ibb.co/1QDN23p/logo.png",
//          // The invoice background
//       },
//       // Your own data
//       sender: {
//          company: "Sample Corp",
//          address: "Sample Street 123",
//          zip: "1234 AB",
//          city: "Sampletown",
//          country: "Samplecountry",
//          //"custom1": "custom value 1",
//          //"custom2": "custom value 2",
//          //"custom3": "custom value 3"
//       },
//       // Your recipient
//       client: {
//          company: "Client Corp",
//          address: "Clientstreet 456",
//          zip: "4567 CD",
//          city: "Clientcity",
//          country: "Clientcountry",
//          // "custom1": "custom value 1",
//          // "custom2": "custom value 2",
//          // "custom3": "custom value 3"
//       },
//       information: {
//          // Invoice number
//          number: "2021.0001",
//          // Invoice data
//          date: "12-12-2021",
//          // Invoice due date
//          "due-date": "31-12-2021",
//       },
//       // The products you would like to see on your invoice
//       // Total values are being calculated automatically
//       products: [
//          {
//             quantity: 2,
//             description: "Product 1",
//             "tax-rate": 6,
//             price: 33.87,
//          },
//          {
//             quantity: 4.1,
//             description: "Product 2",
//             "tax-rate": 6,
//             price: 12.34,
//          },
//          {
//             quantity: 4.5678,
//             description: "Product 3",
//             "tax-rate": 21,
//             price: 6324.453456,
//          },
//       ],
//       // The message you would like to display on the bottom of your invoice
//       "bottom-notice": "Kindly pay your invoice within due date.",
//       // Settings to customize your invoice
//       settings: {
//          currency: "INR", // See documentation 'Locales and Currency' for more info. Leave empty for no currency.
//          // "locale": "nl-NL", // Defaults to en-US, used for number formatting (See documentation 'Locales and Currency')
//          // "margin-top": 25, // Defaults to '25'
//          // "margin-right": 25, // Defaults to '25'
//          // "margin-left": 25, // Defaults to '25'
//          // "margin-bottom": 25, // Defaults to '25'
//          // "format": "A4", // Defaults to A4, options: A3, A4, A5, Legal, Letter, Tabloid
//          // "height": "1000px", // allowed units: mm, cm, in, px
//          // "width": "500px", // allowed units: mm, cm, in, px
//          // "orientation": "landscape", // portrait or landscape, defaults to portrait
//       },
//       // Translate your invoice to your preferred language
//       translate: {
//          // "invoice": "FACTUUR",  // Default to 'INVOICE'
//          // "number": "Nummer", // Defaults to 'Number'
//          // "date": "Datum", // Default to 'Date'
//          // "due-date": "Verloopdatum", // Defaults to 'Due Date'
//          // "subtotal": "Subtotaal", // Defaults to 'Subtotal'
//          // "products": "Producten", // Defaults to 'Products'
//          // "quantity": "Aantal", // Default to 'Quantity'
//          // "price": "Prijs", // Defaults to 'Price'
//          // "product-total": "Totaal", // Defaults to 'Total'
//          // "total": "Totaal", // Defaults to 'Total'
//          vat: "gst", // Defaults to 'vat'
//       },
//    };
