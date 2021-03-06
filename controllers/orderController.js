const Order = require('../models/order')

exports.order_list = function (req, res, next) {
  Order.find()
    // .sort([['species', 'ascending']])
    .exec(function (err, list_orders) {
      if (err) { return next(err); }
      // Successful, so render.
      res.json({order_list: list_orders});
    })
};
