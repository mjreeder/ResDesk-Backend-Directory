var responseFormater = require('../../helpers/format-response.js');
var _ = require('lodash');

var getAll = function (callback) {
  student.query('SELECT * FROM student', [], function (error, students) {
    if (error) {
      callback(responseFormater.fail("Error getting all students", null, 500));
    } else {
      callback(responseFormater.success("All students", students));
    }
  });
}

var getAllByIDs = function (idArray, callback) {
  student.query('SELECT * FROM student WHERE bsu_id IN (?)', [idArray], function (error, students) {
    if (error) {
      console.log(error);
      callback(responseFormater.fail("Error getting all students with IDs", null, 500));
    } else {
      callback(responseFormater.success("All students by IDs", students));
    }
  });
}

var getByID = function (id, callback) {
  student.query('SELECT * FROM student WHERE bsu_id = ?', [id], function (error, student) {
    if (error) {
      callback(responseFormater.fail("Error getting specified student", null, 500));
    } else {
      callback(responseFormater.success("Student", student));
    }
  });
}

var getByQuery = function (searchObject, callback) {
  var students = [];


  var getStudentsPromise;
  if (searchObject.hasOwnProperty('any')) {
    getStudentsPromise = new Promise(function (resolve, reject) {
      var searchStr = searchObject.any;

      var dbColumns = ['bsu_id', 'entry_name', 'name_last', 'name_first', 'name_preferred', 'room_space_description', 'phone_mobile_cell', 'email', 'term_detail'];
      var query = 'SELECT * FROM student WHERE';

      var first = true;
      var searchArr = [];
      for (var i = 0; i < dbColumns.length; i++) {
        var field = 'UPPER(' + dbColumns[i] + ')';
        if (i == dbColumns.length - 1) {
          query += ' ' + field + ' LIKE UPPER(?)';
        } else {
          query += ' ' + field + ' LIKE UPPER(?) OR';
        }
        searchArr.push('%' + searchStr + '%');
      }

      student.query(query, searchArr, function (error, result) {
        if (error) {
          reject(responseFormater.fail("Error searching students", error, 500));
        } else {
          resolve(result);
        }
      });

    });
  } else {
    getStudentsPromise = new Promise(function (resolve, reject) {
      var innerQueryArray = [];

      Object.keys(searchObject).forEach(function (key, index) {
        var innerPromise = new Promise(function (resolve2, reject2) {
          var query = 'SELECT * FROM student WHERE ' + key + ' LIKE ?';

          var wildcardSearchObject = "%" + searchObject[key] + "%";
          student.query(query, [wildcardSearchObject], function (error, result) {
            if (error) {
              reject2(responseFormater.fail("Error getting specified student", error, 500));
            } else {
              resolve2(result);
            }
          });
        });
        innerQueryArray.push(innerPromise);
      });

      Promise.all(innerQueryArray)
        .then(function (data) {
          resolve(data);
        }, function (error) {
          reject(error);
        });
    });
  }



  getStudentsPromise.then(function (response) {
    response = _.flatten(response);
    var students = _.uniq(response, function (x) {
      return x.bsu_id;
    });
    callback(responseFormater.success("Student", students));
  }, function (error) {
    console.log(error);
    callback(error);
  });
}


var getAllResDeskUsers = function (callback) {
  var query = "SELECT * FROM student WHERE position IS NOT NULL";

  student.query(query, function (error, students) {
    if (error) {
      callback(responseFormater.fail("Error getting all ResDesk users", null, 500));
    } else {
      callback(responseFormater.success("All ResDesk users", students));
    }
  });
}


module.exports = {
  "getAll": getAll,
  "getAllByIDs": getAllByIDs,
  "getByID": getByID,
  "getByQuery": getByQuery,
  "getAllResDeskUsers": getAllResDeskUsers
}
