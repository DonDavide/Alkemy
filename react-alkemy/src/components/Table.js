/*import React, { Component } from 'react';
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
var pWidth = 45;


class Tbody extends Component {
    constructor(props){
        super(props);
		this.state = {
			id: props.id,
			type: props.type,
			concept: props.concept,
			category: props.category,
			amount: props.amount,
			date: props.date
        }
    }
	delete(e){
		var idDelete=(e.target.value);
		console.log(this.state.id)
        window.fetch("http://localhost:3000/api/delete/"+idDelete
        ).then(res => res.json())
		this.setState({id : response.data, totalEgress: response.meta.totalEgress,
			totalIncome: response.meta.totalIncome})
		
            .catch(error => console.error('Error:', error))
            .then(() => console.log('Success:', this.state));
            
        }
	render(props) {
    return (
    <tbody key = {this.state.id}>
		<tr key={this.state.id}>
			<td>{this.state.type}</td>
			<td>{this.state.concept}</td>
            <td>{this.state.category}</td>
			<td>$ {toThousand(this.state.amount)}</td>
			<td>{this.state.date}</td>
			<td>
			<button
				
				 type="button" className="btn btn-warning" style={{width: pWidth +"%"}}>Warning</button>
			<button
				onClick={this.delete.bind(this)}
			 	value= {this.state.id} type="button" className="btn btn-danger" style={{width: pWidth +"%", marginLeft:"30px"}}>Danger</button>
			</td>
		</tr>
	</tbody>
     );
    }
}
    

    export default Tbody;*/