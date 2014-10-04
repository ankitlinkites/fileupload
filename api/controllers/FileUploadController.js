/*jshint node:true */
 
var fs = require('fs');
var mkdirp = require('mkdirp');

var FileUploadController = {

	/**
	* define index view here
	*/

	uploadimage: function (req, res) {
		res.header("Access-Control-Allow-Origin", "*");
  		res.header("Access-Control-Allow-Headers", "X-Requested-With");
        var file = req.files.uploadimage;
		var filename = file.name;
		var dirPath = "/images/"+req.body.appid;
		var extention =filename.split('.');
		var filePath = dirPath + '/' + new Date().getTime()+"."+extention[extention.length - 1];
		try {
		  	mkdirp.sync("./assets"+dirPath, 0755);					  	
		} catch (e) {
		  	console.log(e);
		}
		fs.readFile(file.path, function (err, data) {
		  	if (err) {
				res.json({'error': 'could not read file'});
		 	} else {
		 		var starttime = new Date().getTime();
		 		fs.writeFileSync("./assets"+filePath, data,"binary");
		 		var endtime = new Date().getTime();
				// fs.writeFile("./assets"+filePath, data, function (err) {
				// 	var endtime = new Date().getTime();
			 //  		if (err) {
				// 		res.json({'error': 'could not write file to storage'});
			 //  		} else {
		  // 				File.create({appid: req.body.appid, filename: req.body.imagename, filepath:filePath}, function(error, file) {
					// 			if (error) {
					// 				res.send(500, { message: "DB Error", error : error});
					// 			} else {
					// 				res.send({message: "success", image : file, starttime:starttime, endtime : endtime});
					// 			}
					// 		});							  			
		  // 			}
				// });


  				File.create({appid: req.body.appid, filename: req.body.imagename, filepath:filePath}, function(error, file) {
					if (error) {
						res.send(500, { message: "DB Error", error : error});
					} else {
						res.send({message: "success", image : file, starttime:starttime, endtime : endtime});
					}
				});		
		  	}
		});
	}
};
module.exports = FileUploadController;

module.exports.blueprints = {
 
  // Expose a route for every method,
  // e.g.
  // `/auth/foo` =&gt; `foo: function (req, res) {}`
  actions: true,
 
  // Expose a RESTful API, e.g.
  // `post /auth` =&gt; `create: function (req, res) {}`
  rest: true,
 
  // Expose simple CRUD shortcuts, e.g.
  // `/auth/create` =&gt; `create: function (req, res) {}`
  // (useful for prototyping)
  shortcuts: true
 
};