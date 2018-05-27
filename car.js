var http = require('http');

var datamodel =
        {'3FADP4BJ5FM141037': {'make':'toyota', 'model':'highlander',
                         'year': 2017},
         '1FMCU03188KA05514': {'make':'bmw', 'model':'x2',
                         'year': 2018} };

http.createServer(function (req, res) {

    var requrl = req.url;
    var idx = requrl.indexOf('/car/');
    if (idx != -1) {
        var vin = requrl.substring(idx + 5);

        res.writeHead(200, {'Content-Type': 'text/plain'});
        if (vin.length == 0)
            res.end('Specify a car model');
        else
            res.end(vin + ':' + JSON.stringify(datamodel[vin]));
    } else {
          res.end('Illegal Request');
    }

}).listen(3000);
