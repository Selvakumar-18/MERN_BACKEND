const express= require ('express')
const app= express();
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')
const Employee = require('./models/user.employee')
const jwt = require('jsonwebtoken');
const { default: axios } = require('axios');
const { response, request } = require('express');


app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/Attendace')


///Register page
app.post('/hello',async (req,res)=>
{
  console.log(req.body)
  try{
     await User.create({
      name:req.body.name,
      email:req.body.email,
      password:req.body.password
    })
    res.json({status:'ok'})
  } 
  catch(err){
    // res.json({status:'error',error:'Duplicate email'})
    return res.status(400).send({
      message: 'Fill all the fields'
   });
  }      
})

///Login page
app.post('/hello/login',async (req,res)=>
{
  console.log("excecuted post");
    const user= await User.findOne({
      email:req.body.email, 
      password:req.body.password
    })
    console.log(user);
    if(user){
      console.log(user);
      const token = jwt.sign(
        {
          name: user.name,
          email: user.email,
        },
        'secret123'
      )
      res.json({status:'ok'})
      return res.json({status:'ok',user: token})
    }
    else{
      console.log("else executed");
      // res.error({status:'error',user:false})
      return res.status(400).send({
        message: 'This is an error!'
     });
    }   
})

// Employee detail add in database
app.post('/hello/login/employee',async(req,res)=>{
  console.log(req.body)
  try{
      await Employee.create({
      id:req.body.id,
      name:req.body.name,
    })

    res.status(200).send({message: 'Employee Added Successfully' });
    // res.json({status:'ok'})
  }
  catch(err){
    return res.status(400).send({
      message:'something error please check'
    });
  }
})

// GET the employee details

app.get('/hello/login/employee',async(req, res)=>{
  // console.log("print the values");
  try{
    const response =await Employee.find();
    res.json(response);
    console.log(response);
    }

  catch(err){
    return res.status(400).send({
      message:'Not fetched'
    });
  }
});

app.listen(4000,()=>
{
  console.log("server started")
})




