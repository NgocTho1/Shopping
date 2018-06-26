var mongoose = require('mongoose')
var cate = require('../model/cate.js');


var Cate = [{
    name : 'Chăm sóc da mặt',
    url : 'cham-soc-da-mat'
}, {
    name : 'Son môi',
    url : 'son-moi'
}, {
    name : 'Tai nghe',
    url : 'tai-nghe'
}, {
    name : 'Sạt dự phòng',
    url : 'sat-du-phong'
},]

module.exports = cate.create(Cate, function(err) {
    if(err) throw err;
})