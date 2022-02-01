const User = require('../models/user')

exports.selected_user = function (req, res, next) {
  User.findOne({_id: req.params.id })
    .exec(function (err, user) {
      if (err) { return next(err); }
      res.json({user});
    })
};
