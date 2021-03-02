const db = require("../database/models");
const Op = db.Sequelize.Op;

var APIController = {
    users : (req, res, next) => { 
    db.User.findOne({
        where : {
            email : "daviddonati730@gmail.com",
            password : "contraseña123"
        }
    })
    .then( (result)=>{
        let respuesta = {
            meta:{
                status : 200,
                state : "OK",
                total : result.length,
                url : "/api/operations"                
            },
            data : result
        }
        res.json(respuesta) 
    }).catch(function(error){
        console.log(error);
    })
    },
    usersPost : (req, res, next) => {
        res.send('users')
    },
    operations : (req, res, next) => { 
        idUser = 1;
        
        let showIncome = db.Operation.findAll({where : {userId : idUser, type : "Income"} });
        let showEgress = db.Operation.findAll({where : {userId : idUser, type : "Egress"} });
        let showOperation = db.Operation.findAll({where : {
            userId : idUser
        },
            order: [
                ['createdAt', 'DESC']
                ],
            limit : 10,
        
         include:[{association : "category"}, {association : "user"}]});
        Promise.all ([showIncome, showEgress, showOperation])
        .then( ([showIncome, showEgress, showOperation])=>{
            let respuesta = {
                meta:{
                    status : 200,
                    state : "OK",
                    total : showOperation.length,
                    url : "/api/operations",
                    totalIncome : showIncome.length>0?(showIncome.map((property, i) =>property.amount)).reduce(function(a, b){ return a + b; }):showIncome,
                    totalEgress : showEgress.length>0?(showEgress.map((property, i) =>property.amount)).reduce(function(a, b){ return a + b; }):showEgress               
                },
                data : showOperation
            }
            res.json(respuesta);
        }).catch(function(error){
            console.log(error);
        })
    },
    operationsPost : (req, res, next) => { 
        var idUser = req.params.id
        idUser = 1;
        
        let showIncome = db.Operation.findAll({where : {userId : idUser, type : "Income"} });
        let showEgress = db.Operation.findAll({where : {userId : idUser, type : "Egress"} });
        let showOperation = db.Operation.findAll({where : {
            userId : idUser
        },
            order: [
                ['createdAt', 'DESC']
                ],
            limit : 10,
        
         include:[{association : "category"}, {association : "user"}]});
        Promise.all ([showIncome, showEgress, showOperation])
        .then( ([showIncome, showEgress, showOperation])=>{
            let respuesta = {
                meta:{
                    status : 200,
                    state : "OK",
                    total : showOperation.length,
                    url : "/api/operations",
                    totalIncome : showIncome.length>0?(showIncome.map((property, i) =>property.amount)).reduce(function(a, b){ return a + b; }):showIncome,
                    totalEgress : showEgress.length>0?(showEgress.map((property, i) =>property.amount)).reduce(function(a, b){ return a + b; }):showEgress               
                },
                data : showOperation
            }
            res.json(respuesta); 
        }).catch(function(error){
            console.log(error);
        })
        

    },
    categories : (req, res, next) => {
        db.Category.findAll({ order: [
            ['category', 'ASC'],
            ]})
        .then( (result)=>{
            let respuesta = {
                meta:{
                    status : 200,
                    state : "OK",
                    total : result.length,
                    url : "/api/categories"                
                },
                data : result
            }
            res.json(respuesta) 
        }).catch(function(error){
            console.log(error);
        })
    },
    operationsDestroy : (req, res, next) => {
        console.log("se borro");
        next()
    }
}
module.exports = APIController;