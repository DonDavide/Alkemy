const db = require("../database/models");
const bcrypt = require("bcrypt")
const Op = db.Sequelize.Op;

const userMiddleware = {
    operationsPostMid : async (req, res, next) => { 
        var idUser = req.params.id
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
                next() }}) }
}

module.exports = userMiddleware;