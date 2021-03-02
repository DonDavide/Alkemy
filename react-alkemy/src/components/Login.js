
import Form from './Form'
import React, { Component } from 'react';



class Login extends Component{
  constructor(){
  super();
  this.state={
    user: "",
    fullName:"",
    mailNewUser:"",
    passwordNewUser:"",
    newUser:"",
    password:"",
    message:"",
    isLog:false,
    userId: "",
    confirmPassword: ""
  }
}
onChange(e){
  this.setState({
      [e.target.name] : e.target.value
      
  })}
  onClick(e){
    this.setState({
      newUser : this.state.newUser==""? e.target.id : ""
      
  })}
submit(e){
    if(this.state.user===""||this.state.password===""){
      this.setState({
        message : "All fields on this form are required"
    })
    
    }else{
      console.log("ok");
    window.fetch("http://localhost:3000/api/users", {
    method: 'POST',
    body: JSON.stringify(this.state),
    headers:{
      'Content-Type': 'application/json'
    }
    }).then(res => res.json())
        .then(response=>{
            console.log(response);
            this.setState({
                message : response.meta.message,
                user : response.meta.state!=null?response.data.email:"",
                isLog:response.meta.state,
                userId: response.meta.state!=null?response.data.id:""
            })
        })
        .catch(error => console.error('Error:', error))
        .then(() => console.log('Success:', this.state));
      }}
      submit2(e){
        if(this.state.mailNewUser===""||this.state.passwordNewUser===""||this.state.fullName==""){
          this.setState({
            message : "All fields on this form are required"
        })
        }else if(this.state.passwordNewUser!=this.state.confirmPassword){
        this.setState({
            message : "The password and its confirmation must be the same"
        })
        }else{
          console.log("ok");
          console.log(this.state);
        window.fetch("http://localhost:3000/api/usersCreate", {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers:{
          'Content-Type': 'application/json'
        }
        }).then(res => res.json())
            .then(response=>{
                console.log(response);
                if(response.meta.status==222){
                    this.setState({
                        message : response.meta.message,
                    }) 
                }else{
                this.setState({
                    message : response.meta.message,
                    user : response.meta.state!=null?response.data.email:"",
                    isLog:response.meta.state,
                    userId: response.meta.state!=null?response.data.id:""
                })}
            })
            .catch(error => console.error('Error:', error))
            .then(() => console.log('Success:', this.state));
          }}
    

render() {
  return (
      <div className="container">
        {this.state.isLog===false?
        
        <div>
      
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input 
     value={this.state.user}
     onChange={this.onChange.bind(this)}
     name="user"
     type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Email"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input
       value={this.state.password}
       onChange={this.onChange.bind(this)}
       name="password"
       type="password" className="form-control" id="exampleInputPassword1"/>
  </div>
  <button 
   onClick={this.submit.bind(this)}
   type="submit" className="btn btn-primary">Submit</button>
   <button
   id = "1"         
   onClick={this.onClick.bind(this)}
    type="button" style={{marginLeft: 10 + "px"}} className="btn btn-success">New user form</button>
   {this.state.newUser!=""?<div>
    <div className="form-group" key="conceptDiv">
    <label htmlFor="fullName">Full Name</label>
    <input 
        value={this.state.fullName}
        onChange={this.onChange.bind(this)}
        name="fullName"
        type="text" className="form-control" id="fullName" aria-describedby="fullNameHelp" placeholder="Enter Full Name"/>
  </div>
  <div className="form-group" key="emailDiv">
    <label htmlFor="mailNewUser">Email</label>
    <input 
        value={this.state.mailNewUser}
        onChange={this.onChange.bind(this)}
        name="mailNewUser"
        type="email" className="form-control" id="mailNewUser" aria-describedby="emailHelp" placeholder="Enter Email"/>
  </div>
  <div className="form-group" key="passwordlDiv">
    <label htmlFor="passwordNewUser">Password</label>
    <input 
        value={this.state.passwordNewUser}
        onChange={this.onChange.bind(this)}
        name="passwordNewUser"
        type="password" className="form-control" id="passwordNewUser" aria-describedby="emailHelp"/>
  </div>
  <div className="form-group" key="confirmpasswordlDiv">
    <label htmlFor="password">Confirm password</label>
    <input 
        value={this.state.confirmPassword}
        onChange={this.onChange.bind(this)}
        name="confirmPassword"
        type="password" className="form-control" id="confirmPassword" aria-describedby="emailHelp"/>
  </div>
  <button
        onClick={this.submit2.bind(this)}
        className="btn btn-primary">New User</button></div>:null}
  <p className="text-danger">{this.state.message}</p>
</div>

:null}
{this.state.isLog===true?<Form idUser={this.state.userId}/>:null}

      
      </div>
  );
}
}
export default Login;
