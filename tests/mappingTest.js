const PersonMapping     = require('./configs/person-mapping');
const PersonMapping2    = require('./configs/person-mapping-2');
const Mapper            = require('../lib/Mapper');

let mappings = new Map();
mappings.set('person', PersonMapping);
mappings.set('person-mapping-2', PersonMapping2);

let mapper = new Mapper(mappings);

let tests = function(){
    let test1 = function(){
        let payload = {
            _id: 1,
            'first-name': 'Joe',
            'last-name': 'Hartzell',
            'person-address': {
                _id: 1,
                'address-line-1': 'line 1 address',
                'address-line-2': 'some state, 14567',
                'address-state': {
                    _id: 1,
                    abbr: 'PA',
                    'state-name': 'Pennsylvania'
                }
            }
        }
        
        let mappedPayload = mapper.map(payload, 'person');
        console.log(mappedPayload);
    }

    let test2 = function(){
        let payload = {
            _id: 1,
            'first-name': 'Laura',
            'last-name': 'Gearhart',
            'person-addresses': [{
                _id: 1,
                'address-line-1': 'line 1 address',
                'address-line-2': 'some state, 14567',
                'address-state': {
                    _id: 1,
                    abbr: 'PA',
                    'state-name': 'Pennsylvania'
                }
            },
            {
                _id: 2,
                'address-line-1': 'line 1 address',
                'address-line-2': 'some state, 14567',
                'address-state': {
                    _id: 1,
                    abbr: 'PA',
                    'state-name': 'Pennsylvania'
                }
            }]
        };

        let mappedPayload = mapper.map(payload, 'person-mapping-2');
        console.log(mappedPayload);
    }

    test1();
    test2();
};

tests();





