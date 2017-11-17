var express = require('express');
var fs = require("fs");
var recursive = require("recursive-readdir");
var app = express();

app.use(express.static("views"));

app.get('/api/dir',function(req,res){
    listDir('views\\',[]).then((result)=>{
        res.send(result);
    })
})

app.get('/api/dir/:query',function(req,res){
    var filter = JSON.parse(req.params.query);
    listDir('views\\',[]).then((result)=>{
        res.send(result);
    })
})

function listDir(folder,ignore){
    return new Promise(function (resolve, reject) {
        recursive(folder, ignore, function (err, files) {
            if (err) return reject(err);
            
            var filesOut = {};
            files.forEach(function(file){
                var fOut = file.split("\\");
                fOut.shift();
                var category = fOut.shift()
                filesOut[fOut.join("\\")] = {"category":category}
            })

            resolve(filesOut);
        });
    })
}


app.listen(8080);
console.log('Listening on port 8080...');