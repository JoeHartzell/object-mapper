'use strict';
const Mapping = require('../../lib/Mapping');

module.exports = new Mapping({
    id: 'studentId',
    displayId: {
        field: 'displayStudentId'
    },
    district: { 
        field: 'studentDistrict',
        definition: new Mapping({
            id: 'id',
            name: (source) => source.districtName
        },{}) 
    },
    lastName: (source) => source.legalLastName,
    firstName: 'legalFirstName',
}, {})

