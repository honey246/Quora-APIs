const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");


app.use(express.urlencoded({ extended : true})); //express parse middleware 
app.use(methodOverride('_method'));

app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public"))); //to add css,js to ejs

let posts = [
    {
        id : uuidv4(), 
        username : "shyam",
        content : "you can do anything by hard work",
    },
    {
        id : uuidv4(),
        username : "ram",
        content : "i got my first job",
    },
    {
        id : uuidv4(),
        username : "goranshi",
        content : "Hark Work is key to Success!",
    },
];

app.get("/posts" ,(req,res)=>{ //allpost
    res.render("index.ejs" , {posts});
});

app.get("/posts/new",(req,res)=>{ //form path
    res.render("new.ejs");
});

app.post("/posts",(req,res)=>{ //submission path
    let {username , content} = req.body;
    let id = uuidv4();
    posts.push({id , username , content});
    res.redirect("/posts"); //to connect form path to allpost path
});

app.get("/posts/:id", (req,res)=>{
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);//match id with post and return those array
    res.render("show.ejs" , { post });
});

app.patch("/posts/:id" , (req,res) =>{
    let { id } = req.params;
    let newcontent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newcontent;
    console.log(post);
    console.log(newcontent);
    res.redirect("/posts");
})

app.get("/posts/:id/edit", (req,res)=>{
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs" , { post });
})

app.delete("/posts/:id", (req,res)=>{ //when click on delete, form gives delete request to api(/posts/id) 
    let { id } = req.params;          //then it filter from array posts and created a new array, when we redirect 
    posts = posts.filter((p) => id !== p.id); //new filter post will print
    res.redirect("/posts");
});

app.listen(port,()=>{
    console.log("listening to port : 8080");
});