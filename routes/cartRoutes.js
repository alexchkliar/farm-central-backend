require('dotenv').config()
const router = require("express").Router();
const passport = require("passport");
const CartProduct = require('../models/cart')
const Favorite = require('../models/favorite')
const Order = require('../models/order')
const Food = require('../models/food')
cart_controller = require("../controllers/cartController");
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)
// const url = require('url');

router.post("/add", (req, res) => {
  const newCartProduct = new CartProduct({
    food: req.body.food,
    shopper: req.body.shopper,
  });
  newCartProduct.save();
  res.send("Product added to cart");
});

router.post("/create_order", (req, res) => {
  const newOrder = new Order({
    items: req.body.items,
    buyer: req.body.buyer,
  });
  newOrder.save();
  res.send("Order registered");
});

router.delete("/remove", (req, res) => {
  CartProduct.findOneAndDelete( {food: req.body.food._id, shopper: req.body.shopper._id}, (err) => {
    if (err) { console.log(err) }
  });
  res.send("Product removed from cart")
});

router.get("/fetch", cart_controller.cart_list)

router.patch("/adjust", (req, res) => {
  req.body.cartItems.forEach(item => {

    Food.findByIdAndUpdate(item.foodObj._id, { quantity: item.foodObj.quantity - item.itemCartQuantity }, {}, (err) => {
      if (err) { console.log(err); }
    });

  });
  res.send("Adjusted cart content")
});

router.delete("/wipe", (req, res) => {
  CartProduct.deleteMany( { shopper: req.body.shopper._id }, (err) => {
    if (err) { console.log(err) }
  });
  res.send("Wiped cart content")
});

router.post("/create-checkout-session", async (req, res) => {
  let success_redirect
  let cancel_redirect

  if (req.get('host') === "localhost:5000") {
    success_redirect = `${process.env.URL_BASE_CLIENT}/cart_cleanup`
    cancel_redirect = `${process.env.URL_BASE_CLIENT}/cart`
  } else {
    success_redirect = `https://farmcentral.store/cart_cleanup`
    cancel_redirect = `https://farmcentral.store/cart`
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map(item => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.foodName,
            },
            unit_amount: item.foodPrice * 100,
          },
          quantity: item.itemCartQuantity,
        }
      }),
      success_url: success_redirect,
      cancel_url: cancel_redirect,
    })

    res.json({ url: session.url })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }

});

module.exports = router
