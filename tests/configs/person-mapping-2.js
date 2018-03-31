'use strict';
const { uniqBy } = require('lodash');
const Mapping = require('../../lib/Mapping');

module.exports = new Mapping({
    id: '_id',
    firstName: 'first-name',
    lastName: 'last-name',
    addressIds: (person) => person['person-addresses'].map(address => address._id),
    addresses: {
        field: 'person-addresses',
        definition: new Mapping({
            id: '_id',
            line1: 'address-line-1',
            line2: 'address-line-2',
            state: {
                field: 'address-state',
                definition: new Mapping({
                    id: '_id',
                    abrevation: 'abbr',
                    name: 'state-name'
                },{})
            } 
        },{})
    }
}, {})

