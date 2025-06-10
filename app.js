 const express= require("express")
 const bodyparser = require("body-parser")
 
 const app=express();
 app.set("view engine","ejs")
 app.use(express.static("public"))
 app.use(express.urlencoded({extended:true}))
 
//  var example="working";
 var items =[];
app.get("/",(req,res)=>{
    res.render("list",{exej:items})
})
app.post("/",(req,res)=>{

    var item=req.body.todo;
    console.log(item)
         items.push(item);
    res.redirect("/")
    
   
})
 app.listen(3000,()=>{
    console.log("server started")
 })