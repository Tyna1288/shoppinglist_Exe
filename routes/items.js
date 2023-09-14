

const express = require("express");
const ExpressError = require("../expressError");
const router = new express.Router();


const items = [];

/** GET /items: get list of items */

router.get("/", function(req, res) {
  return res.json(items);
});

/** POST /items: add to the list of items */

router.post("/", function (req, res) {
  const newItem = { name: req.body.name, price: req.body.price }
  items.push(newItem)
  return res.status(201).json({ item: newItem })
});

/** GET /items: display single item name and price */

router.get("/:name", function (req, res) {
  const foundItem = items.find(item => item.name === req.params.name)
  if (foundItem === undefined) {
    throw new ExpressError("Item not found", 404)
  }
  return res.json({ item: foundItem });
});

/** PATCH./items: modify single item name and price */

router.patch("/:name", function (req, res) {
  const foundItem = items.find(item => item.name === req.params.name)
  if (foundItem === undefined) {
    throw new ExpressError("Item not found, 404")
  }
  foundItem.name.price = req.body.name.price
  return res.json({ item: foundItem });
});

/** DELETE /items/[name]: delete item, return status */

router.delete("/:name", function(req, res) {
  const foundItem = items.find(item => item.name === +req.params.name);
  if (foundItem === -1) {
    throw new ExpressError("Item not found, 404")
  }
  items.splice(foundItem, 1);
  return res.json({ message: "Deleted" });
});


module.exports = router;
