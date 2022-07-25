const express = require('express');
const chalk = require('chalk')
const debug = require('debug')('app');
const morgan = require('morgan');
const app = express();
const PORT = process.env.PORT;
const path = require('path');
const productsRouter = require('./src/router/productsRouter');
const {MongoClient} = require('mongodb');

app.use(morgan('combined'))
app.use(express.static(path.join(__dirname,"/public/")));
app.set("views","./src/views");
app.set("view engine", "ejs");

async function main(){
    const uri = "mongodb+srv://admin:OKAbkr71298@node34452-env-8320495.th1.proen.cloud:11405/MyProject?retryWrites=true&w=majority";
 

    const client = new MongoClient(uri);
 
    try {
        await client.connect();
 
        await  listDatabases(client);
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

app.use("/products",productsRouter);

app.get("/",(req,res) =>{
    res.render('index',{username: 'Rawipong', customer:["A","B","c"]});
})


app.listen(PORT, ()=>{
    debug("listening port" + chalk.green(PORT));
})

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};
