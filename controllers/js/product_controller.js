var app = require('ballroom');
var rc = require('rhoconnect_helpers');

app.controllerName('Product');
app.registerHandler('sync');

// Add your custom routes here
app.get('/my_custom_route', {}, function (req, resp){
  resp.send(true);
});

app.post('/my_custom_route2', {'login_required':false, "source_required":false, "client_required":false}, function (req, resp){
   resp.send(true);
});
