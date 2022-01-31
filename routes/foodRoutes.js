const express = require("express");
router = express.Router();
food_controller = require("../controllers/foodController");
const Food = require('../models/food')

// router.get("/", food_controller.foodController)
router.get("/", food_controller.food_list)
router.get("/:id/update", food_controller.selected_food)

router.post("/new", (req, res) => {
  // console.log(req.body)
  // console.log(req.user)
  const newFood = new Food({
    name: req.body.name,
    units: req.body.units,
    category: req.body.category,
    location: req.body.location,
    quantity: req.body.quantity,
    price: req.body.price,
    photo: req.body.photo,
    seller: req.user,
  });
  newFood.save();
  res.send("New food saved");
});

router.patch("/:id/patch", (req, res) => {
  console.log(req.body)
  // console.log(req.user)

  Food.findByIdAndUpdate(req.params.id,
    {
      name: req.body.name,
      units: req.body.units,
      category: req.body.category,
      location: req.body.location,
      quantity: req.body.quantity,
      price: req.body.price,
      photo: req.body.photo,
      seller: req.user,
    }, {}, (err) => {
      if (err) { console.log(err); }
      // console.log("Updated cart instance")
    });

  // const newFood = new Food({
  //   name: req.body.name,
  //   units: req.body.units,
  //   category: req.body.category,
  //   location: req.body.location,
  //   quantity: req.body.quantity,
  //   price: req.body.price,
  //   photo: req.body.photo,
  //   seller: req.user,
  // });
  // newFood.findOneAndUpdate();
  res.send("Food updated");
});


router.delete("/:id/delete", (req, res) => {
  Food.findByIdAndRemove(req.body.food._id, (err, item) => {
      if (err) return res.status(500).send(err);
      const response = {
          message: "Successfully deleted",
          deleted_item: item
      };
      return res.status(200).send(response);
  });

});


module.exports = router;
