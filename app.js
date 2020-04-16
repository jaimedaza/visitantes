const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/visitantes', {
	useNewUrlParser: true,	
});

const visitorSchema = new mongoose.Schema({

  date: { type: Date, default: Date.now },
  name: String
  
});

const Visitor = mongoose.model('Visitor', visitorSchema);


app.get('/', (req, res) => { 

	let name = req.query.name;

	if(name === undefined){
		name = "Anónimo";
	}

	const person = new Visitor({		
		name: name
	});

	person.save(function(error){
		console.log(error);
		return error;
	});

	res.send('<h1>El visitante fue almacenado con éxito</h1>');

});

app.listen(3000, () => console.log('Listening on port 3000!'));
