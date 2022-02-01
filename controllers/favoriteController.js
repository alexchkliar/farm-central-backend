const Favorite = require('../models/favorite')

exports.favorite_list = function (req, res, next) {
  Favorite.find()
    .exec(function (err, list_favorite) {
      if (err) { return next(err); }
      res.json({favorite_list: list_favorite});
  })
};
