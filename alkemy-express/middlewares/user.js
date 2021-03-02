const db = require("../database/models");
const bcrypt = require("bcrypt")
const Op = db.Sequelize.Op;

const userMiddleware = {
    operationsPostMid : async (req, res, next) => { 
        var idUser = req.body.idUser
        await db.Operation.create({
            categoryId : req.body.categoryId,
            concept : req.body.concept,
            date : req.body.date,
            amount : req.body.amount,
            type : req.body.type,
            userId : idUser
        }).then(function(resultado){
            if (resultado){
                console.log('Operation regist');
                next() }})
            },

     operationsDestroy : async (req, res, next) => {
        await db.Operation.destroy({where : {
            Id : req.params.id
        }}) 
        .then(function(resultado){
            if (resultado){
                console.log('Operation deleted');
                next() }})
            
    },
    operationsUpdate: async (req, res, next) => {
        await db.Operation.update({
            categoryId : req.body.categoryId,
            concept : req.body.concept,
            date : req.body.date,
            amount : req.body.amount,      
        },{
            where :  {id: req.params.id}
        }).then(function(resultado){
            if (resultado){
                console.log('Operation Update');
                next() }}) 
            },
    usersSearch : async (req, res, next) => { 
            console.log(req.body);
        await db.User.findOne({
            where : {
                email : req.body.mailNewUser,
            }
        })
        .then( (result)=>{
            if(result==null){
                next()
                console.log("Creating new user");  
            }else{
            let respuesta = {
                meta:{
                    status : 222,
                    state : false,
                    total : result.length,
                    url : "/api/operations",
                    message : "The email entered has already been registered"                
                },
                data : null
            }
            res.json(respuesta)
            console.log(respuesta);} 
        }).catch(function(error){
            console.log(error);
        })
        },
        userCreate : (req, res, next) => { 
            console.log(req.body.passwordNewUser);
            console.log(req.body.fullName);
            db.User.create({
                fullName : req.body.fullName,
                email : req.body.mailNewUser,
                password : req.body.passwordNewUser
            }).then(function(resultado){
                if (resultado){
                    console.log('Operation regist');
                    next() }})
                },      

            
    }

module.exports = userMiddleware;