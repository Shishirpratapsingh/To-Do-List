const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");



const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



var items = ["buy food","cook food"];
var workItems=[];



app.get("/", function (req, res) {
    let day = date();
    res.render("list", { listTitle: day , newListItems : items});
});



app.post("/" , function(req, res ){    
    var item = req.body.newItem;
    if( req.body.list === "Work list"){
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
})



app.get("/work", function(req,res){
    res.render("list", {listTitle: "Work list" , newListItems: workItems });
})



app.post("/work" , function(req, res){
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
})



app.get("/about" , function(req,res){
    res.render("about");
});



app.listen(3000, function () {
  console.log("the server is up");
});
