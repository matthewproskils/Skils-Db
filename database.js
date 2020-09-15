const fs = require("fs");
const crypto = require('crypto')
function def(val, type){
	if(val == void(0)){
		throw new Error(type + ' is undefined')
	}
}
function DB(file){
	def(file, 'file')
	this.file = './' + file + '.json';
	try{
		if(!fs.existsSync(this.file)){
			fs.writeFile(this.file, '{}', (err) => {
				if(err) throw err
			})
		}
		if(JSON.stringify(JSON.parse(fs.readFileSync(this.file))).trim() == ''){
			fs.writeFile(this.file, '{}', (err) => {
				if(err) throw err
			})
		}
	}catch(err) {
		throw err
	}

	this.get = (key) => {
		def(key, 'key')
		return JSON.parse(fs.readFileSync(this.file))[key]
		def(get)
	}

	this.set = (key, val) => {
		def(key, 'key')
		def(val, 'value')
		let storage = JSON.parse(fs.readFileSync(this.file))
		storage[key] = val
		fs.writeFile(this.file, JSON.stringify(storage), (err) => {
			if(err) throw err
		})
	}

	this.encrypt = (secret, val) => {
		def(secret, 'key')
		def(val, 'val')
		return crypto.createHmac('sha256', secret).update(val).digest('hex');
	}
	this.delete = (key) => {
		def(key, 'key')
		let storage = JSON.parse(fs.readFileSync(this.file))
		delete storage[key]
		fs.writeFile(this.file, JSON.stringify(storage), (err) => {
			if(err) throw err
		})
	}

	this.clear = () => {
		fs.writeFile(this.file, '{}', (err) => {
			if(err) throw err
		})		
	}
}
module.exports = DB
