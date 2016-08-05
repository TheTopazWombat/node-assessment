var express = require('express');
var bodyParser = require('body-parser');

var app = module.exports = express();
var users = require('./users.json');
app.use(bodyParser.json());




app.get('/api/users', function(req, res, next) {
  if (req.query.language) {
      var results = [];
      users.forEach(function(currentVal) {
          if (currentVal.language == req.query.language) {
              results.push(currentVal);
          }
      });
      res.json(results);
  } else if (req.query.age){
    var results = [];
    users.forEach(function(currentVal) {
        if (currentVal.age == req.query.age) {
            results.push(currentVal);
        }
    });
    res.json(results);
  } else if (req.query.city) {
    var results = [];
    users.forEach(function(currentVal) {
        if (currentVal.city == req.query.city) {
            results.push(currentVal);
        }
    });
    res.json(results);
  } else if (req.query.state) {
    var results = [];
    users.forEach(function(currentVal) {
        if (currentVal.state == req.query.state) {
            results.push(currentVal);
        }
    });
    res.json(results);
  } else if (req.query.gender) {
    var results = [];
    users.forEach(function(currentVal) {
        if (currentVal.gender == req.query.gender) {
            results.push(currentVal);
        }
    });
    res.json(results);
  }
  else {
      res.json(users);
  }
});

app.get('/api/users/:privilege', function(req, res, next) {
  var results = [];
  if (req.params.privilege === "admin" || req.params.privilege === "user" || req.params.privilege === "moderator"){
    for (var i = 0; i < users.length; i++) {
    if (users[i].type === req.params.privilege) {
      results.push(users[i]);
    }
  }
    res.status(200).json(results);
  }
  else {
    next();
  }
});

app.post('/api/users', function(req, res, next) {
  var idCount = users.length + 1;
  var newUser = req.body;
  newUser.id = idCount;
  users.push(newUser);
  res.status(200).json('good job mang');
  console.log(newUser);
});

app.post('/api/users/:admin', function(req, res, next) {
  if (req.params.admin === "admin") {
    var newUser = req.body;
    var idCount = users.length + 1;
    newUser.id = idCount;
    users.push(newUser);
    res.status(200).json('good job mang');
    console.log(newUser);
  }
});

app.post('/api/users/language/:id', function (req, res, next) {
  var user;
  if (req.params.id) {
    for (var i = 0; i < users.length; i++) {
    if (users[i].id == req.params.id) {
      users[i].language = req.body.language;
      console.log(users[i]);
      user = users[i];
    }
  }
  res.status(200).json(user);
}
});

app.get('/api/users/:id', function(req, res, next) {
  console.log(req.params.id);
  var flag = false;
  var user;
  {
    for (var i = 0; i < users.length; i++) {
    if (req.params.id == users[i].id) {
      res.status(200).json(users[i]);
      flag = true;
      console.log(users[i]);
      user = users[i];
    }
  }
}
  if (!flag) {
    res.status(404).json(user);
  }
});

app.post('/api/users/forums/:id', function(req, res, next) {
  var user;
  for (var i = 0; i < users.length; i++) {
    if (req.params.id == users[i].id) {
      users[i].favorites.push(req.body.add);
      console.log(users[i].favorites);
      user = users[i];
    }
  }
  res.status(200).json(user);
//   for (var i = 0; i < users.length; i++) {
//     if (req.params.id == users[i].id) {
//   }
// }
});

app.delete('/api/users/forums/:id', function(req, res, next) {
  console.log(req.query.favorite);
  var user;
  for (var i = 0; i < users.length; i++) {
    if (req.params.id == users[i].id) {
      for (var k = 0; k < users[i].favorites.length; k++) {
        if (users[i].favorites[k] === req.query.favorite) {
          users[i].favorites.splice(k, 1);
          console.log(users[i].favorites);
          user = users[i];
        }
      }
    }
  }
  res.status(200).json(user);
});

app.delete('/api/users/:id', function(req, res, next) {
  var user;
  for (var i = 0; i < users.length; i++) {
    if (req.params.id == users[i].id) {
      users.splice(i, 1);
      user = users[i];
    }
  }
  res.status(200).json('we killed him');
});

app.put('/api/users/:id', function(req, res, next) {
  var id = parseInt(req.params.userId);
  users.forEach(function(currentVal, index){
    if(currentVal.id ===id){
      for(var prop in req.body){
        console.log(prop);
        console.log(currentVal);
        currentVal[prop] = req.body[prop];
      }
      res.status(200).json(currentVal);
    }
  });
});



var port  = 3000;
app.listen(port, function() {
  console.log('listening on port ', port);
});
