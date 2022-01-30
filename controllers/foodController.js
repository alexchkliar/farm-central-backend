const Food = require('../models/food')

exports.selected_food = function (req, res, next) {
  console.log(req.params)
  Food.findOne({_id: req.params.id })
    // .sort([['species', 'ascending']])
    .exec(function (err, food) {
      if (err) { return next(err); }
      // Successful, so render.
      // console.log(list_foods)
      res.json({food});
    })
};

exports.food_list = function (req, res, next) {
  Food.find()
    // .sort([['species', 'ascending']])
    .exec(function (err, list_foods) {
      if (err) { return next(err); }
      // Successful, so render.
      // console.log("hey")
      res.json({food_list: list_foods});
    })
};
