var mongoose = require('mongoose');
var province = require('../../model/address/province.js');

var Province = [ new province({
    _id : 1,
    province : 'Bến Tre'
}), new province({
    _id : 2,
    province : 'Tiền Giang'
}), new province({
    _id : 3,
    province : 'Vĩnh Long'
}), new province({
    _id : 4,
    province : 'Long An'
}), new province({
    _id : 5,
    province : 'Bình Dương'
})
]

module.exports = province.create( Province, err => {
    if(err) throw err;
})