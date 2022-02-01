const Cart = require('../models/cart')

exports.cart_list = function (req, res, next) {
  Cart.find()
    .exec(function (err, list_cart) {
      if (err) { return next(err); }
      res.json({cart_list: list_cart});
  })
};
