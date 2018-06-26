var mongoose = require('mongoose');
var dictrict = require('../../model/address/dictrict.js');

var Province = [ new dictrict({
    _id : 1,
    dictrict : 'Bến Tre',
    idProvince : 1
}),new dictrict({
    _id : 2,
    dictrict : 'Châu Thành',
    idProvince : 1
}),new dictrict({
    _id : 3,
    dictrict : 'Chợ Lách',
    idProvince : 2
}),new dictrict({
    _id : 4,
    dictrict : 'Mỏ Cày Nam',
    idProvince : 2
}),new dictrict({
    _id : 5,
    dictrict : 'Giồng Trôm',
    idProvince : 3
}),new dictrict({
    _id : 6,
    dictrict : 'Mỹ Tho',
    idProvince : 3
}),new dictrict({
    _id : 7,
    dictrict : 'Gò Công',
    idProvince : 4
}),new dictrict({
    _id : 8,
    dictrict : 'Tân Phước',
    idProvince : 4
}),new dictrict({
    _id : 9,
    dictrict : 'Cái Bè',
    idProvince : 5
}),new dictrict({
    _id : 10,
    dictrict : 'Cai Lậy',
    idProvince : 5
})
]

module.exports = dictrict.create( Province, err => {
    if(err) throw err;
})