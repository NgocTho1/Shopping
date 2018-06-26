var mongoose = require('mongoose');
var ward = require('../../model/address/ward.js');

var Ward = [ new ward({
    ward : 'Phường 1',
    idDictrict : 1
}),new ward({
    ward : 'Phường 2',
    idDictrict : 1
}),new ward({
    ward : 'Phường 3',
    idDictrict : 1
}),new ward({
    ward : 'Phường 4',
    idDictrict : 1
}),new ward({
    ward : 'Phường 5',
    idDictrict : 1
}),new ward({
    ward : 'An Thới 1',
    idDictrict : 2
}),new ward({
    ward : 'An Thới 2',
    idDictrict : 2
}),new ward({
    ward : 'An Thới 3',
    idDictrict : 2
}),new ward({
    ward : 'An Thới 4',
    idDictrict : 2
}),new ward({
    ward : 'An Thới 5',
    idDictrict : 2
}),new ward({
    ward : 'An Định 1',
    idDictrict : 3
}),new ward({
    ward : 'An Định 2',
    idDictrict : 3
}),new ward({
    ward : 'An Định 3',
    idDictrict : 3
}),new ward({
    ward : 'An Định 4',
    idDictrict : 3
}),new ward({
    ward : 'An Định 5',
    idDictrict : 3
}),new ward({
    ward : 'Phú Túc 1',
    idDictrict : 4
}),new ward({
    ward : 'Phú Túc 1',
    idDictrict : 4
}),new ward({
    ward : 'Phú Túc 2',
    idDictrict : 4
}),new ward({
    ward : 'Phú Túc 3',
    idDictrict : 4
}),new ward({
    ward : 'Phú Túc 4',
    idDictrict : 4
}),new ward({
    ward : 'Phú Túc 5',
    idDictrict : 4
}),new ward({
    ward : 'Phú Đức 1',
    idDictrict : 5
}),new ward({
    ward : 'Phú Đức 2',
    idDictrict : 5
}),new ward({
    ward : 'Phú Đức 3',
    idDictrict : 5
}),new ward({
    ward : 'Phú Đức 4',
    idDictrict : 5
}),new ward({
    ward : 'Phú Đức 5',
    idDictrict : 5
}),new ward({
    ward : 'Phú Sơn 1',
    idDictrict : 6
}),new ward({
    ward : 'Phú Sơn 2',
    idDictrict : 6
}),new ward({
    ward : 'Phú Sơn 3',
    idDictrict : 6
}),new ward({
    ward : 'Phú Sơn 4',
    idDictrict : 6
}),new ward({
    ward : 'Phú Sơn 5',
    idDictrict : 6
}),new ward({
    ward : 'An Thạnh 1',
    idDictrict : 7
}),new ward({
    ward : 'An Thạnh 2',
    idDictrict : 7
}),new ward({
    ward : 'An Thạnh 3',
    idDictrict : 7
}),new ward({
    ward : 'An Thạnh 4',
    idDictrict : 7
}),new ward({
    ward : 'An Thạnh 5',
    idDictrict : 7
}),new ward({
    ward : 'Bình Hòa 1 ',
    idDictrict : 8
}),new ward({
    ward : 'Bình Hòa 2',
    idDictrict : 8
}),new ward({
    ward : 'Bình Hòa 3',
    idDictrict : 8
}),new ward({
    ward : 'Bình Hòa 4',
    idDictrict : 8
}),new ward({
    ward : 'Bình Hòa 5',
    idDictrict : 8
}),new ward({
    ward : 'Phú Thuận 1',
    idDictrict : 9
}),new ward({
    ward : 'Phú Thuận 2',
    idDictrict : 9
}),new ward({
    ward : 'Phú Thuận 3',
    idDictrict : 9
}),new ward({
    ward : 'Phú Thuận 4',
    idDictrict : 9
}),new ward({
    ward : 'Phú Thuận 5',
    idDictrict : 9
}),new ward({
    ward : 'Châu Hưng 1',
    idDictrict : 10
}),new ward({
    ward : 'Châu Hưng 2',
    idDictrict : 10
}),new ward({
    ward : 'Châu Hưng 3',
    idDictrict : 10
}),new ward({
    ward : 'Châu Hưng 4',
    idDictrict : 10
}),new ward({
    ward : 'Châu Hưng 5',
    idDictrict : 10
})
]


module.exports = ward.create( Ward, err => {
    if(err) throw err;
})