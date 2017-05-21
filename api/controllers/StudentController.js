'use strict';

var util = require('util');
var studentService = require('../services/StudentService.js');

module.exports = {
  getAllStudents: getAllStudents,
  getAllStudentsByIDs: getAllStudentsByIDs,
  getStudentByBSUId: getStudentByBSUId,
  getStudentBySearch: getStudentBySearch,
  getAllResDeskUsers: getAllResDeskUsers
};

function getAllStudents(req, res) {
  studentService.getAll(function(response) {
    res.status(response.status).json(response);
  });
}

function getAllStudentsByIDs(req, res) {
  studentService.getAllByIDs(req.swagger.params.data.value.idArray, function(response) {
    res.status(response.status).json(response);
  });
}

function getStudentByBSUId(req, res){
  studentService.getByID(req.swagger.params.bsu_id.value, function(response){
    res.status(response.status).json(response);
  });
}

function getStudentBySearch(req, res){
  studentService.getByQuery(req.query, function(response){
    res.status(response.status).json(response);
  });
}

function getAllResDeskUsers(req, res){
  studentService.getAllResDeskUsers(function(response){
    res.status(response.status).json(response);
  });
}
