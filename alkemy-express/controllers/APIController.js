const db = require("../database/models");
const Op = db.Sequelize.Op;

var APIController = {
    usersLogin : (req, res, next) => { 
        console.log(req.body);
    db.User.findOne({
        where : {
            email : req.body.user,
            password : req.body.password
        }
    })
    .then( (result)=>{
        if(result==null){
            let respuesta={
                
                    meta:{
                        status : 200,
                        state : false,
                        url : "/api/users",
                        message : "Invalid username or password"                
                    },
                    data : result
            }
            console.log(respuesta);
            res.json(respuesta)   
        }else{
        let respuesta = {
            meta:{
                status : 200,
                state : true,
                total : result.length,
                url : "/api/operations",
                message : "OK"                
            },
            data : result
        }
        res.json(respuesta)
        console.log(respuesta);} 
    }).catch(function(error){
        console.log(error);
    })
    },
    usersLoginNew : (req, res, next) => { 
        console.log(req.body);
    db.User.findOne({
        where : {
            email : req.body.mailNewUser,
            password : req.body.passwordNewUser
        }
    })
    .then( (result)=>{
        if(result==null){
            let respuesta={
                
                    meta:{
                        status : 200,
                        state : false,
                        url : "/api/users",
                        message : "Invalid username or password"                
                    },
                    data : result
            }
            console.log(respuesta);
            res.json(respuesta)   
        }else{
        let respuesta = {
            meta:{
                status : 200,
                state : true,
                total : result.length,
                url : "/api/operations",
                message : "OK"                
            },
            data : result
        }
        res.json(respuesta)
        console.log(respuesta);} 
    }).catch(function(error){
        console.log(error);
    })
    },

    operations : (req, res, next) => { 
        idUser = req.params.id;
        
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
        var idUser = req.body.idUser;
        
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
        console.log("Daleted");
        next()
    }
}
module.exports = APIController;