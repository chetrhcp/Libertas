path = require('path');

var mod = {};
module.exports = mod;

mod.parseFile = function(files){
	var uploadPath = files[''].path;
	uploadPath = path.basename(uploadPath);
	return JSON.stringify({name:uploadPath});
}

