'use strict';
const Mapping = require('./Mapping');
const MapperUtilities = require('./Mapper-Utilities');

module.exports = class Mapper {
    constructor(mappings = new Map()){
        if(mappings instanceof Map){
            this.mappings = mappings
        }
        else {
            this.mappings = new Map();
        }
    }

    addMapping(name, mapping){
        this.mappings.set(name, mapping);
    }

    map(payload, mappingName){
        if(this.mappings instanceof Map && this.mappings.has(mappingName)){
            return MapperUtilities.map(payload, this.mappings.get(mappingName));
        }
        else {
            throw `No mapping definition with the name "${mappingName}" could be found`;
        }
    }
}