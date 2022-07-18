const express = require('express');
const productsRouter = express.Router();
const products = require('./../data/product.json')

productsRouter.route("/").get((req,res) => {
    res.render("products",{
        products,
    }
    );
});

productsRouter.route("/:ID").get((req,res) => {
    const id = req.params.ID;
    res.render("product",{
        product: products[id],
    });
});


module.exports = productsRouter;