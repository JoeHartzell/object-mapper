const Mapping   = require('./configs/schema');
const Mapper    = require('../lib/Mapper');

let mapper = new Mapper(Mapping);

let destObj = mapper.map([{
    studentId: 1,
    displayStudentId: 4500,
    legalLastName: 'Hartzell',
    legalFirstName: 'Joe',
    studentDistrict: {
        id: 1,
        districtName: 'Armstrong'
    }
},
{
    studentId: 2,
    displayStudentId: 4501,
    legalLastName: 'Gearhart',
    legalFirstName: 'Laura',
    studentDistrict: {
        id: 1,
        districtName: 'Armstrong'
    }
}]);

console.log(destObj);



