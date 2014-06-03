var rc = require('rhoconnect_helpers');
var http = require('http');
var host = 'rhostore.herokuapp.com';

var Product = function(){

  this.login = function(resp){
    resp.send(true);
  };

  this.query = function(resp){
    var result = {};
    var str = '';

    http.request('http://' + host + '/products.json', function(res){
      res.on('data', function(chunk){
        str += chunk;
      });
      res.on('end', function(){
        var data = JSON.parse(str);
        for(var i in data){
          var item = data[i];
          result[item.product.id.toString()] = item.product;
        }
        resp.send(result);
      });
    }).end();
  };

  this.create = function(resp){
    var postData = JSON.stringify({ 'product': resp.params.create_object });
    var str = '';
    var options = {
      host: host,
      path: '/products.json',
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        'Content-Length': postData.length
      }
    };
    var req = http.request(options, function(res){
      res.on('data', function(chunk){
        str += chunk;
      });
      res.on('end', function(){
        var data = JSON.parse(str);
        resp.send(data.product.id.toString());
      });
    });
    req.write(postData);
    req.end();
  };

  this.update = function(resp){
    var objId = resp.params.update_object.id;
    var putData = JSON.stringify({ "product": resp.params.update_object });
    // Remove the id from the hash, we don't need it.
    delete putData.id;
    var options = {
      host: host,
      path: '/products/' + objId + '.json',
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Content-Length': putData.length
      }
    };
    var req = http.request(options, function(res){
      res.on('data', function(){});
      res.on('end', function(){
        resp.send(true);
      });
      res.on('error', function(){
        resp.send(false);
      });
    });
    req.write(putData);
    req.end();
  };

  this.del = function(resp){
    var objId = resp.params.delete_object.id;
    var options = {
      host: host,
      path: '/products/' + objId + '.json',
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    };
    var req = http.request(options, function(res){
      res.on('data', function(){});
      res.on('end', function(){
        resp.send(true);
      });
      res.on('error', function(){
        resp.send(false);
      });
    });
    req.end();
  };

  this.logoff = function(resp){
    resp.send(true);
  };

  this.storeBlob = function(resp){
    // TODO: Handle post requests for blobs here.
    // Reference the blob object's path with resp.params.path.
    new rc.Exception(
      resp, "Please provide some code to handle blobs if you are using them."
    );
  };
};

module.exports = new Product();     
