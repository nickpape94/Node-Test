const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const itemValidator = require("../validator/itemValidator");
const Item = require("../models/itemModel");

const userLogin = require("../validator/userLogin");

// @route   POST item/addItem
// @desc    Creates Item
// @access  Public
router.post("/addItem", (req, res) => {

    const response = itemValidator.validateItemInput(req.body);

    if (response.isValid) {

        const item = new Item({
            "item": req.body.item,
            "content": req.body.content
        });

        item.save().then(() => res.send("Item Saved")).catch((err) => res.send(err));

    } else {
        res.status(404).json(response.errors);
    }
});

// @route   POST item/getItem
// @desc    return item
// @access  Public
router.post("/getItem", (req, res) => {

    const errors = {};

    Item.findOne({ item: req.body.item }).then(items => {
        if (!items) {
            errors.noItems = "No items";
            res.status(404).json(errors);
        }
        res.json(items);
    }).catch(err => res.status(404).json({ noItems: "There are no items" }));
});

// @route   DELETE item/deleteItem
// @desc    Deletes item
// @access  Public
router.delete("/deleteItem", (req, res) => {
    Item.deleteOne({ item: req.body.item }).then(
        ({ ok, n }) => res.send(`${n} item deleted`),
        (err) => res.send(err))
        .catch(err => res.status(404).json({ noItems: "No items" }));
});

// @route   PUT item/updateItem
// @desc    Updates item content
// @access  Public
router.put("/updateItem", (req, res) => {
    Item.updateOne(
        { item: req.body.item },
        { $set: { "content": "content2" } }).then(
        () => res.send("Item updated"),
        (err) => res.send(err))
});



module.exports = router;

