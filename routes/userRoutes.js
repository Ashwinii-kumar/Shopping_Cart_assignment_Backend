const express=require('express');
const router=express.Router();
// const {auth}=require('../middleware/auth');
const {rateLimiter}=require('../middleware/rateLimiter');

const {signup}=require('../controllers/authControllers/signup');
const {login}=require('../controllers/authControllers/login');
const {logout}=require('../controllers/authControllers/logout');

router.post('/signup',signup);
router.post('/login',rateLimiter,login);
router.get('/logout',logout);



module.exports=router;

