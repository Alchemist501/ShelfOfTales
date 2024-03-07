const express = require('express')
const catchAsync = require('./../utils/catchAsync')
exports.getOverview = catchAsync(async (req, res, next) => {
  let cond;
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    cond = 'profile'
  }else{
    cond = 'login'
  }
    res.status(200).render('index', {
      title: 'ShelfOfTales',
      cond
    });
    next();
  });
exports.login = catchAsync(async (req,res,next)=>{
  res.status(200).render('login',{
    title: 'login',
  });
  next();
})
exports.forget = catchAsync(async (req,res,next)=>{
  res.status(200).render('forget',{
    title: 'forget'
  });
  next();
})
exports.register= catchAsync(async (req,res,next)=>{
  res.status(200).render('register',{
    title: 'register'
  });
  next();
})
exports.profile = catchAsync(async (req,res,next)=>{
  res.status(200).render('profile',{
    title:'profile'
  });
  next();
})