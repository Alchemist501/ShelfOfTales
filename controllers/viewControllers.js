const express = require('express')
const catchAsync = require('./../utils/catchAsync')
exports.getOverview = catchAsync(async (req, res, next) => {
    res.status(200).render('index', {
      title: 'ShelfOfTales'
    });
    next();
  });
exports.login = catchAsync(async (req,res,next)=>{
  res.status(200).render('login',{
    title: 'login'
  });
  next();
})
exports.forget = catchAsync(async (req,res,next)=>{
  res.status(200).render('forget',{
    title: 'Forget'
  });
  next();
})
exports.register= catchAsync(async (req,res,next)=>{
  res.status(200).render('register',{
    title: 'register'
  });
  next();
})