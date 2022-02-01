const Food = require('../models/food')

exports.selected_food = function (req, res, next) {
  Food.findOne({_id: req.params.id })
    .exec(function (err, food) {
      if (err) { return next(err); }
      res.json({food});
    })
};

exports.food_list = function (req, res, next) {
  Food.find()
    // .sort([['species', 'ascending']])
    .exec(function (err, list_foods) {
      if (err) { return next(err); }
      res.json({food_list: list_foods});
    })
};
