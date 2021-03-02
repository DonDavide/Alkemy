import React, { Component } from 'react';

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
var pWidth = 100;
var operations = [{
}];
var totalIncome = 0;
var totalEgress = 0;
var categories= [];
class Form extends Component {
    constructor(props){
        super(props);
        this.state = {
            categoryId : "",
            concept : "",
            date : "",
            amount : "",
            type : "",
            categories: [],
            operations: [],
            totalIncome: 0,
            totalEgress: 0,
            idUser: props.idUser,
            idProduct:"",
            conceptEdit: "",
            amounEdit: "",
            edit: "",
            message: ""
        }
    }
    onChange(e){
        this.setState({
            [e.target.name] : e.target.value
            
        })
    }
    onClick(e){
      this.setState({
        edit : e.target.id,
        message : ""
        
    })
    this.state.edit !="undefined"? console.log(this.state.edit) : console.log("no hay")
  }
    
    submit(e){
      if(this.state.categoryId == ""||
      this.state.concept == ""||
      this.state.date == ""||
      this.state.amount == ""||
      this.state.type == ""){
        this.setState({
          message : "All fields on this form are required"
      })
      }else{
        
        fetch("http://localhost:3000/api/operations/"+ this.state.idUser, {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers:{
          'Content-Type': 'application/json'
        }
        }).then(res => res.json())
            .then(response=>{
                this.setState({operations : response.data, totalEgress: response.meta.totalEgress,
                  totalIncome: response.meta.totalIncome})
                console.log(this.state.operations);
            })
            .catch(error => console.error('Error:', error))
            .then(() => console.log('Success:', this.state));
            
            this.setState({
              message : "",
              categoryId : "",
              concept : "",
              date : "",
              amount : "",
              type : "",
          });}}
    update(e){
      if(this.state.categoryId == ""||
      this.state.concept == ""||
      this.state.date == ""||
      this.state.amount == ""){
        this.setState({
          message : "All the fields of the edit form are required"
      })}else{
        window.fetch("http://localhost:3000/api/update/"+this.state.edit, {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers:{
          'Content-Type': 'application/json'
        }
        }).then(res => res.json())
            .then(response=>{
                this.setState({operations : response.data, totalEgress: response.meta.totalEgress,
                  totalIncome: response.meta.totalIncome, edit :"",  categoryId : "",
                  concept : "",
                  date : "",
                  amount : "",
                  type : "",
                  message :""})
                console.log(this.state.operations);
            })
            .catch(error => console.error('Error:', error))
            .then(() => console.log('Success:', this.state));
            
        }}
      delete(e){
        var idDelete=(e.target.value);
        fetch("http://localhost:3000/api/delete/"+ idDelete, {
          method: 'POST',
          body: JSON.stringify(this.state),
          headers:{
            'Content-Type': 'application/json'
          }
          })
        .then(res => res.json())
            .then(response=>{
                this.setState({operations : response.data, totalEgress: response.meta.totalEgress,
                  totalIncome: response.meta.totalIncome})
                console.log(this.state.operations);
            })
            .catch(error => console.error('Error:', error))
            .then(() => console.log('Success:', this.state));
            
        }

    componentDidMount(){
        fetch('http://localhost:3000/api/categories')
        .then(response =>{
                return response.json();
                
        })
        .then(response=>{
            this.setState({categories : response.data});
        })
        .catch(function(error){console.log(error)})

        fetch('http://localhost:3000/api/operations/'+ this.state.idUser)
        .then(response =>{
                return response.json();
        })
        .then(response=>{
            console.log(response)
            this.setState({operations : response.data, totalEgress: response.meta.totalEgress,
                            totalIncome: response.meta.totalIncome,  categoryId : "",
                            concept : "",
                            date : "",
                            amount : "",
                            type : "",})
            console.log(this.state.operations);
        })
        .catch(function(error){console.log(error)})
        
        }
    render(){
        operations = this.state.operations;
        categories=this.state.categories;
        totalIncome = this.state.totalIncome;
        totalEgress = this.state.totalEgress;
    return (        
<div>
{this.state.edit ==0 ? <div>
<div className="form-group" key="conceptDiv">
    <label htmlFor="concept">Concept</label>
    <input 
        value={this.state.concept}
        onChange={this.onChange.bind(this)}
        name="concept"
        type="text" className="form-control" id="concept" aria-describedby="conceptHelp" placeholder="Enter Concept"/>
  </div>
  {this.state.message != "" ? <p className="text-danger">All fields on this form are required</p>:null}
  <div className="form-group" key="amountDiv">
    <label htmlFor="amount">Amount</label>
    <input 
        value={this.state.amount}
        onChange={this.onChange.bind(this)}
        name="amount"
        type="number" className="form-control" id="amount" aria-describedby="emailHelp"/>
  </div>
  {this.state.message  == "All fields on this form are required"  ? <p className="text-danger">All fields on this form are required</p>:null}
  <div className="form-group" key="typetDiv">
    <label htmlFor="type">Type</label>
  <select key="select1" className="form-control" id="type" name="type" 
    value = {this.state.type}
    onChange={this.onChange.bind(this)}>
      <option value="">Select income or egress</option>
      <option value="Income">Income</option>
      <option value="Egress">Egress</option>
    </select>
    </div>
    {this.state.message == "All fields on this form are required" ? <p className="text-danger">All fields on this form are required</p>:null}
  <div className="form-group" key="categoryDiv">
    <label htmlFor="categoryId">Category</label>
  <select key="select2" className="form-control" id="categoryId" name="categoryId" 
    value = {this.state.categoryId}
    onChange={this.onChange.bind(this)}>
      <option value="" key = "option1">Select a category</option>
      {categories.map((property, i) =>
      <option key ={property.category+i} value={property.id}>{property.category}</option>)}
    </select>
    </div>
    {this.state.message  == "All fields on this form are required" ? <p className="text-danger">All fields on this form are required</p>:null}
  <div className="form-group" key="dateDiv">
    <label htmlFor="date">Date</label>
        <input value={this.state.date}
        onChange={this.onChange.bind(this)}
        name="date"
        type="date" className="form-control" id="date"/>
  </div>
  {this.state.message  == "All fields on this form are required"  ? <p className="text-danger">All fields on this form are required</p>:null}
  <button
        onClick={this.submit.bind(this)}
        className="btn btn-primary">Submit</button><br></br>
        </div> : <div></div>}

<h1 className="h2 mb-2 text-gray-800" key = "popi">Operations</h1>
<h1 className="h3 mb-2 text-gray-800" key = "pipi">Total : $ {toThousand(totalIncome-totalEgress)}</h1>
<h2 className="h5 mb-2 text-gray-800" key = "pepe">Total Income : $ {toThousand(totalIncome)}</h2>
<h2 className="h5 mb-2 text-gray-800" key = "popa">Total Egress : $ {toThousand(totalEgress)}</h2>
	<div className="card shadow mb-4">
							<div className="table-responsive-sm">
              {this.state.message == "All the fields of the edit form are required" ? <p className="text-danger">All the fields of the edit form are required</p>:null}
								<table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0" key="tablekey">
									<thead>
										<tr>
											<th>Type</th>
											<th>Concept</th>
											<th>Category</th>
											<th>Amount in $</th>
											<th>Date</th>
                      <th>EDIT</th>
                      <th>DELETE</th>
										</tr>
									</thead>
                  {operations.map((operation, i) =>
                    <tbody key= {i+ operation.concept + operation.category.category}>
		                      <tr key= {i+ operation.id+operation.category.category}>
			                <td>{operation.type}</td>
			                <td>{operation.id != this.state.edit? operation.concept: <input 
                          value={this.state.concept}
                          onChange={this.onChange.bind(this)}
                          name="concept"
                          type="text" className="form-control" id="concept" aria-describedby="categoryHelp"placeholder={operation.concept}/> 
                          }</td>
                      <td>{operation.id != this.state.edit? operation.category.category: <select key="select2" className="form-control" id="categoryId" name="categoryId" 
                            value = {this.state.categoryId}
                             onChange={this.onChange.bind(this)} placeholder={operation.category.category}>
                            <option value="" key = "option1">Select a category</option>
                            {categories.map((property, i) =>
                            <option key ={property.category+i} value={property.id}>{property.category}
                            </option>)}  
                            </select>}
                            </td>
			                <td>{operation.id != this.state.edit? toThousand(operation.amount): <input 
                            value={this.state.amount}  placeholder={operation.amount}
                            onChange={this.onChange.bind(this)}
                            name="amount"
                            type="number" className="form-control" id="amount" aria-describedby="amountHelp"/>}
                            </td>
			                <td>{operation.id != this.state.edit? operation.date : <input value={this.state.date}
                            onChange={this.onChange.bind(this)}
                            name="date"
                            type="date" className="form-control" id="date"/>}
                            </td>
			                <td>
                      {operation.id != this.state.edit?<button id = {operation.id} onClick={this.onClick.bind(this)}
                      value= {operation.id} type="button" className="btn btn-warning btn-sm" style={{width: pWidth +"%"}}>Edit</button> :<div><button
                      id = "0"         
                      onClick={this.update.bind(this)}
                     value= {operation.id}  
                     type="button" className="btn btn-success btn-sm" style={{width: pWidth +"%"}}>Confirm</button>
                     <button
                      id = "0" 
                      onClick={this.onClick.bind(this)}
                     value= {operation.id}  
                     type="button" className="btn btn-warning btn-sm" style={{width: pWidth +"%"}}>Cancel</button>
                        </div>}
                      </td>
                      <td>
			                <button 
                      onClick={this.delete.bind(this)}
                      value= {operation.id} 
                      type="button" className="btn btn-danger btn-sm" style={{width: pWidth +"%"}}>Delete</button>
			                </td>
		                  </tr>
	                  </tbody>)}

								  </table>
						</div>
					</div>
</div>

  )}
}

export default Form;