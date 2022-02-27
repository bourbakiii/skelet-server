import express from "express";

const PORT = 5000;

const app = express().use(express.json());

app.post('/', (req,res)=>{
    // console.log('Queries -');
    // console.log(req.query);
    console.log('Body');
    console.log(req.body);
    res.status(200).json('Сервер работаfет');
});
app.listen(PORT, ()=>console.log('SERVER STARTED SUCCESSFULL ' + PORT));