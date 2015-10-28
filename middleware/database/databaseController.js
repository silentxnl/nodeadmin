var mysql = require('mysql');
var client = require('../auth/clientdb.js');



module.exports = {

  getDatabases: function(req, res) {
    console.log('database is stored', req.app.locals);
  },

  connect: function(req, res) {
    var db = client.getClientDB();
    db.query('SHOW DATABASES', function(err, row) {
      row && res.end(JSON.stringify(row));
    });
  },

  createDatabase: function(req, res) {
    var connection = client.getClientDB();
    var DatabaseName = req.body.name;
    if (DatabaseName && typeof DatabaseName === 'string' && connection.query) {
      connection.query('CREATE DATABASE ?? ', [DatabaseName], function(err, result) {

        if (!err) {
          res.end(null, JSON.stringify(result));
        } else {
          res.end(JSON.stringify(err), null);
        }
      });
    }
  },

  deleteDatabase: function(req, res) {
    var connection = client.getClientDB();
    var DatabaseName = req.body.name;

    if (DatabaseName && typeof DatabaseName === 'string' && connection.query) {
      connection.query('DROP DATABASE ?? ', [DatabaseName], function (err, result) {

        if (!err) {
          res.end(null, JSON.stringify(result));
        } else {
          res.end(JSON.stringify(err), null);
        }
      });
    }
  },

  getTables: function(req, res) {
    var db = req.params.database;
    var connection = client.getClientDB();

    connection.query('USE ' + db, function(err, result) {
      if (err) {
        console.log(err);
        res.status(500).send(err.toString());
      }
      connection.query('SHOW TABLES', function(err, result) {
        if (err) {
          console.log(err)
          res.status(500).send(err.toString());
        }
        res.status(200).json(result);
      });
    });
  },

  dropTable: function(req, res) {
    var db = req.params.database;
    var table = req.params.table;
    var connection = client.getClientDB();

    connection.query('USE ' + db, function(err, result) {
      if (err) {
        console.log(err);
        res.status(500).send(err.toString());
      }
      connection.query('DROP TABLE ' + table, function(err, result) {
        if (err) {
          console.log(err);
          res.status(500).send(err.toString());
        }
        res.status(200).send(true);
      });
    });
  },

  getRecords: function(req, res) {
    var db = req.params.database,
      table = req.params.table;
    var connection = client.getClientDB();

    connection.query('USE ' + db, function(err, result) {
      if (err) {
        console.log(err);
      }
      connection.query('SELECT * FROM ' + table + '; DESCRIBE ' + table, function(err, result) {
        if (err) {
          console.log(err);
        }
        console.log(result);
        res.status(200).json(result);
      });
    });
  },

  getPerformanceStats: function(req, res) {
    var db = 'performance_schema';
    var table = 'performance_timers';
    var connection = client.getClientDB();

    connection.query('USE ' + db, function(err, result) {
      if (err) {
        console.log(err);
      }
      connection.query('SELECT * FROM ' + table, function(err, result) {

        res.status(200).json(result);
      });
    });
  },

  getInfoStats: function(req, res) {
    var db = 'information_schema';
    var table = 'processlist'
    var connection = client.getClientDB();

    connection.query('SELECT * FROM ' + db + '.' + table, function(err, result) {
      if (err) {
        console.log(err);
      }
      res.status(200).json(result);
    });
  },

  queryClientDB: function(req, res) {
    var connection = client.getClientDB()

    connection.query(req.body.data.query, function(err, result) {
      if (err) {
        console.log(err, result);
        res.status(400).json(err);
      } else {
        res.status(200).json(result);
      }
    });
  }

};