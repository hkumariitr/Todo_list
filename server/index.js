const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //req.body

//Routes

//create a todo
app.post("/todos", async(req,res)=>{
    try {
        const {description} =req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) values($1) returning * ",
        [description]
        );
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})
//get all todos

app.get("/todos",async (req,res)=>{
    try {
        const alltodos = await pool.query("Select * from todo");
        res.json(alltodos.rows);
    } catch (err) {
        console.error(err);
    }
})
//get a todo

app.get("/todos/:id",async(req,res)=>{
    try {
    const {id}= req.params;
    const todo = await pool.query("Select * from todo where todo_id = $1",[id]);
    res.json(todo.rows[0]);
        
    } catch (err) {
        console.error(err.message);
        
    }
    
})
 
//update a todo

app.put("/todos/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        const {description} =req.body;
        const updateTodo = await pool.query("UPDATE todo SET description = $1 Where todo_id = $2",
        [description,id]
        );
        res.json("Todo was updated")
    } catch (err) {
        console.error(err.message);
        
    }
})

//delete a todo

app.delete("/todos/:id",async(req,res)=>{
    try {
        const {id}= req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1",
        [id]
        );
        res.json("todo item deleted");
    } catch (err) {
        console.error(err.message);
        
    }
})

app.listen(3000,()=>{
    console.log("server has started on port 3000");
})