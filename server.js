var express = require('express');
var bodyParser = require('body-parser');
var users = require('./users.json');

var app = module.exports = express();

app.use(bodyParser.json());

app.get('/api/users', function(req,res,next) {
  if(req.query.age){
    var userAge = users.filter(function(value) {
      return(value.age == req.query.age);
    });
    res.json(userAge);
  } else if (req.query.language) {
    var userLang = users.filter(function(value) {
      return(value.language == req.query.language);
    });
    res.json(userLang);
  } else if (req.query.city) {
    var userCity = users.filter(function(value) {
      return(value.city == req.query.city);
    });
    res.json(userCity);
  } else if (req.query.state) {
    var userState = users.filter(function(value) {
      return(value.state == req.query.state);
    });
    res.json(userState);
  } else if (req.query.gender) {
    var userGend = users.filter(function(value) {
      return(value.gender == req.query.gender);
    });
    res.json(userGend);
  } else {
    res.json(users);
  }
});
app.get('/api/users/language/:id', function(req,res,next) {
  var languageArr = users.filter(function(value) {
    return (value.language === req.params.id);
    });
      res.json(languageArr);
});
app.get('/api/users/admin',function(req,res,next) {
  var adminArr = users.filter(function(value) {
    return(value.type === 'admin');
  });
    res.json(adminArr);
});
app.get('/api/users/user',function(req,res,next) {
  var userArr = users.filter(function(value) {
    return(value.type === 'user');
  });
    res.json(userArr);
});
app.get('/api/users/moderator',function(req,res,next) {
  var moderatorArr = users.filter(function(value) {
    return(value.type === 'moderator');
  });
    res.json(moderatorArr);
});
app.get('/api/users/:id',function(req,res,next) {
  var userId = users.filter(function(value) {
    return (value.id == req.params.id);
  });
    res.json(userId);
});
var idNum = 100;
app.post('/api/users',function(req,res,next) {
  idNum++;
  req.body.id= idNum;
  users.push(req.body);
  var goodUser = users.filter(function(value) {
    return (value.id === idNum);
  });
    res.json(goodUser);
});
app.post('/api/users/admin', function(req,res,next) {
  idNum++;
  req.body.id = idNum;
  req.body.type = "admin";
  users.push(req.body);
  var goodUser = users.filter(function(value) {
    return (value.id === idNum);
  });
    res.json(goodUser);
});
app.put('/api/users/language/:id',function(req,res,next) {
  var languageArr = users.filter(function(value) {
    return (value.id == req.params.id);
  });
  languageArr[0].language = req.body.language;
  res.json(languageArr);
});
app.post('/api/users/forums/:id',function(req,res,next) {
  var userId = users.filter(function(value) {
    return (value.id == req.params.id);
  });
  userId[0].add = req.body.add;
  res.json(userId);
});
app.delete('/api/users/forums/:id',function(req,res,next) {
  var userId = users.filter(function(value) {
    return (value.id == req.params.id);
  });
  delete userId[0].add;
  res.json(userId);
});
app.delete('/api/users/:id',function(req,res,next) {
  var userId = users.filter(function(value) {
    return(value.id == req.params.id);
  });
  var number= users.indexOf(userId[0]);
  users.splice(number,1);
  res.json(users);
});
app.put('/api/users/:id',function(req,res,next) {
  var userId = users.filter(function(value) {
    return (value.id == req.params.id);
  });
  userId[0].first_name = req.body.first_name;
  userId[0].last_name = req.body.last_name;
  userId[0].email = req.body.email;
  userId[0].gender = req.body.gender;
  userId[0].language = req.body.language;
  userId[0].age = req.body.age;
  userId[0].city = req.body.city;
  userId[0].state = req.body.state;
  userId[0].type = req.body.type;
  userId[0].favorites = req.body.favorites;
  res.json(userId);
});



app.listen(3000,function() {
  console.log("Daddy's here");
});
