 const express= require("express")
 const bodyparser = require("body-parser")
 
 const app=express();
 app.set("view engine","ejs")
 app.use(express.static("public"))
 app.use(bodyparser.urlencoded({extended:true}))
 
//  var example="working";
 var items =[];
 var idCounter=1;

app.get("/",(req,res)=>{
    res.render("list",{exej:items,alertMsg: null  })
})
app.post("/add",(req,res)=>{
    const {todo,priority}=req.body;
   if (!todo || todo.trim() === "") {
        return res.render("list", {
            exej: items,       // existing list
            alertMsg: " Todo field cannot be empty."
        });
    }
     else{
         items.push({ id: idCounter++, todo, priority });
        res.redirect("/");
     }
 
})

app.get("/filter", (req, res) => {
  const filter = req.query.priority || "";
  const filteredTodos = filter
    ? items.filter((todo) => todo.priority === filter)
    : items;
  res.render("list", { exej: filteredTodos ,alertMsg: null });
});

app.get("/edit/:id", (req, res) => {
  const todo = items.find((t) => t.id === parseInt(req.params.id));
  res.render("edit", { task:todo });
});

app.post("/update/:id", (req, res) => {
  const { task, priority } = req.body;
  const todow = items.find((t) => t.id === parseInt(req.params.id));
  if (todow) {
    todow.todo = task;
    todow.priority = priority;
  }
  res.redirect("/");
});

app.post("/delete/:id", (req, res) => {
  items = items.filter((t) => t.id !== parseInt(req.params.id));
  res.redirect("/");
});



 app.listen(3000,()=>{
    console.log("server started")
 })
