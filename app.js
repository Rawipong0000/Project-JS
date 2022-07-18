const express = require('express');
const chalk = require('chalk')
const debug = require('debug')('app');
const morgan = require('morgan');
const app = express();
const PORT = process.env.PORT;
const path = require('path');
const productRouter = express.Router();

app.use(morgan('combined'))
app.use(express.static(path.join(__dirname,"/public/")));
app.set("views","./src/views");
app.set("view engine", "ejs");

productRouter.route("/").get((req,res) => {
    res.send("Im Product");
});

productRouter.route("/1").get((req,res) => {
    res.send("Im Product1");
});

app.use("/prodocts",productRouter);

app.get("/",(req,res) =>{
    res.render('index',{username: 'Rawipong', customer:["A","B","c"]});
})


app.listen(PORT, ()=>{
    debug("listening port" + chalk.green(PORT));
})
