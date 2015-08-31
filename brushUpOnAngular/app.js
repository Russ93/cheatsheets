var MongoJS, app, secret, dbs, express, session, bodyParser, http;

express = require('express');
session = require('express-session');
bodyParser = require('body-parser');
sha256 = require('js-sha256').sha256;

http = require('http');

MongoJS = require("mongojs");
ObjectId = MongoJS.ObjectId

app = express();

secret = 'z7pzz2#+av6%)x@&uqd@e8rh4)q%&tjk@xa6q8vw8ce%4!i02u'

app.use(express.static('www'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ 'extended': true })); // for parsing application/x-www-form-urlencoded
app.use(session({
  'secret': secret,
  'resave': false,
  'saveUninitialized': true,
  // 'store': new RedisStore({}),
}));

dbs = {
  'channeladvisor': MongoJS('mongodb://localhost/channeladvisor', ["amazon_orders", "amazon_response", "products", "verification"]),
  'users': MongoJS('mongodb://localhost/users', ["adjustments", "customers", "ofp", "portlight", "sessions", "time_cards", "verification"]),
  'random': MongoJS('mongodb://localhost/random', ["manus", "counter", "search_term", "retail_scraper", "email_templates", "manu_addresses"])
};

app.post('/login',function (req, res){
  dbs.users.portlight.find({'username': req.body.username},function (err, u){
    if( u.password === sha256(u.id+secret+req.body.password) ){
      req.session.user = {
        "username": u.username,
        "firstname": u.firstname,
        "lastname": u.lastname,
        "theme": u.theme,
      }
      console.log("Logged in");
      res.redirect('localhost:9001');
    }
    else{
      res.redirect('localhost:9001?error="login"');
    }
  })
});


// app.all('*', function (req, res, next){
//   if(req.session.user){ next(); }
//   else{ res.json({ 'err': "You're not logged in." }); }
// });

app.post('/:db/:collection/:action', function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  req.body.q = req.body.q ? req.body.q : {}
  req.body.p = req.body.p ? req.body.p : {}
  if(req.body.q._id){ req.body.q._id = ObjectId(req.body.q._id) }
  return dbs[req.params.db][req.params.collection][req.params.action](req.body.q, req.body.p).skip(req.body.s).limit(req.body.l, function(err, result) {
    return res.json({
      'err': err,
      'result': result
    });
  });
});

app.get('/:db/:collection/find', function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  req.query = JSON.parse(req.query.query);
  req.query.q = req.query.q ? req.query.q : {};
  req.query.p = req.query.p ? req.query.p : {};
  if(req.query.q._id){ req.query.q._id = ObjectId(req.query.q._id) }
  console.log(req.query);
  return dbs[req.params.db][req.params.collection].find(req.query.q, req.query.p).skip(req.query.s||0).limit(req.query.l||50, function(err, result) {
    return res.json({
      'err': err,
      'result': result
    });
  });
});


app.all('/:db/:collection/:action', function(req, res) {
  var coll = dbs[req.params.db][req.params.collection];
  var cb = function(err, result) {
    return res.json({
      'err': err,
      'result': result
    });
  }

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");

  req.query = JSON.parse(req.query.query);
  req.query.q = req.query.q ? req.query.q : {};
  if(req.query.q._id){ req.query.q._id = ObjectId(req.query.q._id) }

  if(req.query.p){ return coll[req.params.action](req.query.q, req.query.p, cb); }
  else if(req.query.wc){ return coll[req.params.action](req.query.q, req.query.p, req.query.wc, cb); }
  else { return coll[req.params.action](req.query.q, cb); }


});

http.createServer(app).listen(3000);