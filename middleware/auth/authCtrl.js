// /*jshint unused:false*/

// 'use strict';

// var Promise = require('bluebird');
// var jwt = require('jsonwebtoken');
// var bcrypt = require('bcrypt');

// module.exports.authCtrl = function (connection) {

//   return function (request, response) {
    
//     query('SHOW DATABASES')
//       .then(function (result) {
//         console.log('show databases was successfully called');
//         result.each(function (row) {
//           if (row.Database === 'nodeAdmin') {
//             res.send(true);
//           }
//         });
//         return query('CREATE DATABASE nodeAdmin');
//       })
//       .then(function (result) {
//         console.log('create database nodeadmin successfully called.');
//         return query('USE nodeAdmin');
//       })
//       .then(function (result) {
//         console.log('use nodeadmin query executed successfully.');
//         return query(queries.databaseTable);
//       })
//       .then(function (result) {
//         console.log('Creation of database table successful');
//         return query(queries.usersTable);
//       })
//       .then(function (result) {
//         console.log('Users table successfully created');
//         return query(queries.insertDB);
//       })
//       .then(function(result) {
//         return hash(req.body.password, 10);
//       })
//       .then(function (pass) {
//         console.log('dbID query and password hash successful');
//         queries.insertUser = 'INSERT INTO users (username, password, database_id) VALUES ("' + req.body.username + '", "' + req.body.password + '", "' + 1 + '")';
//         return query(queries.insertUser);
//       })
//       .then(function (result) {
//         console.log('User successfully added to newly created database');
//         res.status(200).send('hello');
//       })
//       .catch(function(e) {
//         console.error(e);
//         res.status(500).send(e);
//       })

// };









//      connection.query('CREATE DATABASE nodeAdmin', function(err, result) {
//        if (err) {
//          errorHandler(err);
//        }
//        connection.query('USE nodeAdmin', function(err, result) {
//          if (err) {
//            errorHandler(err);
//          }
//          connection.query(queries.databaseTable, function(err, result) {
//            if (err) {
//              errorHandler(err);
//            }
//            connection.query(queries.usersTable, function(err, result) {
//              if (err) {
//                errorHandler(err);
//              }
//              connection.query(queries.insertDB, function(err, result) {
//                if (err) {
//                  errorHandler(err);
//                }
//                connection.query(queries.dbId, function(err, result) {
//                  if (err || !result) {
//                    errorHandler(err);
//                  }
//									var dbId = result[0].id;
//									bcrypt.hash(req.body.password, 10, function (err, pass) {
//										if (err) {
//											errorHandler(err);
//										}
//										console.log('dbId: ', dbId);
//										queries.insertUser = 'INSERT INTO users (username, password, database_id) VALUES ("' + req.body.username + '", "' + pass + '", "' + dbId + '")';
//										connection.query(queries.insertUser, function(err, result) {
//											if (err) {
//												errorHandler(err);
//											}
//
//											var token = jwt.sign({username: req.body.username}, 'Rwue0IHNM563p0Aa50dcsO8qxeZNFYr9');
//											res.status(200).json({token: token});
//										});
//									});
//                });
//              });
//            });
//          });
//        });
//      });
//





//    res = response;
//    var queries = {
//      databaseTable: 'CREATE TABLE db (id INT NOT NULL AUTO_INCREMENT, mysql_user VARCHAR(255) NOT NULL, mysql_password VARCHAR(255), mysql_host VARCHAR(255) NOT NULL, PRIMARY KEY (id))',
//      usersTable: 'CREATE TABLE users (id INT NOT NULL AUTO_INCREMENT, username VARCHAR(255) NOT NULL, display_name VARCHAR(255),     database_id INT NOT NULL, password VARCHAR(255) NOT NULL, notification1 BOOL, PRIMARY KEY (id), FOREIGN KEY (database_id) REFERENCES db(id))',
//      insertDB: 'INSERT INTO db (mysql_user, mysql_password, mysql_host) VALUES ("' + req.body.mysqlUser + '", "' + req.body.mysqlPassword + '", "' + req.body.host + '")',
//      dbId: 'SELECT id FROM db WHERE mysql_user = "' + req.body.mysqlUser + '"'
//    };
//    var dbInterface = {
//
//      init: function (req, res) {
//        this.createNodeAdmin();
//      },
//      query: connection.query,
//
//      dbId: '',
//
//      errorHandler: function (err) {
//        dbInterface.res.status(500).json({
//          error: err
//        });
//      },
//
//      createNodeAdmin: function () {
//        this.query('CREATE DATABASE nodeAdmin', this.useNodeAdmin());
//      },
//
//      useNodeAdmin: function (err, result) {
//        if (err) {
//          this.errorHandler(err);
//        }
//        this.query('USE nodeAdmin', this.createDbTable(err, result));
//      },
//
//      createDbTable: function (err, result) {
//        if (err) {
//          this.errorHandler(err);
//        }
//        this.query(queries.databaseTable, this.createUsersTable(err, result));
//      },
//
//      createUsersTable: function (err, result) {
//        if (err) {
//          this.errorHandler(err);
//        }
//        this.query(queries.usersTable, this.addDb(err, result));
//      },
//
//      addDb: function (err, result) {
//        if (err) {
//          this.errorHandler(err);
//        }
//        this.query(queries.insertDB, this.getDbId(err, result));
//      },
//
//      getDbId: function (err, result) {
//        if (err) {
//          this.errorHandler(err);
//        }
//        this.query(queries.dbId, this.hashPass(err, result));
//      },
//
//      // hashPass: function (err, result) {
//      //   // this.dbId = result[0].id;
//      //   bcrypt.hash(req.body.password, 10, this.addUser(err, pass));
//      // },
//
//      addUser: function (err, pass) {
//        if (err) {
//          this.errorHandler(err);
//        }
//        this.queries.insertUser = 'INSERT INTO users (username, password, database_id) VALUES ("' + req.body.username + '", "' + req.body.password + '", "' + this.dbId + '")';
//        this.query(queries.insertUser, this.sendToken(err, result));
//      },
//
//      sendToken: function (err, result) {
//        if (err) {
//          this.errorHandler(err);
//        }
//        var token = jwt.sign({
//          username: req.body.username
//        }, 'Rwue0IHNM563p0Aa50dcsO8qxeZNFYr9');
//        this.res.status(200).json({
//          token: token
//        });
//      },
//    };
//    dbInterface.init(req, res);
//  };
