'use strict';
const {
    isArray,
    isFunction,
    isObject,
    isString
}       = require('lodash'),
Mapping = require('./Mapping');

module.exports = class MapperUtilities {
    constructor(){

    }

    static map(payload, mapping){
        let definition = mapping.definition;
        let options = mapping.options;

        if(isArray(payload))
            return this.mapCollection(payload, definition);
        else if(isObject(payload))
            return this.mapSingle(payload, definition);
        else 
            throw 'this payload cannot be mapped';
    }

    static mapSingle(payload, definition){
        //our final object for this instance
        let dest = {};

        Object.keys(definition).forEach(key => {
            let fieldDefinition = definition[key];
            if(isString(fieldDefinition))
                dest[key] = this.mapString(payload, fieldDefinition);
            else if(isFunction(fieldDefinition))
                dest[key] = this.mapFunction(payload, fieldDefinition);
            else if(isObject(fieldDefinition))
                dest[key] = this.mapObject(payload, fieldDefinition);
        })

        return dest;
    }

    static mapCollection(payload, definition){
        return payload.reduce((dests, source) => dests.concat(this.mapSingle(source, definition)), []);
    }

    static mapFunction(payload, func){
        return func(payload);
    }

    /**
     * 
     * @param {object} payload The source object to map from 
     * @param {string} definition The definition for the field we are mapping
     * 
     * @returns {*} The mapped field
     */
    static mapString(payload, sourceKey){
        return payload[sourceKey];
    }

    static mapObject(payload, fieldDefinition){
        if(fieldDefinition.field && fieldDefinition.definition && fieldDefinition.definition instanceof Mapping){
            return this.map(payload[fieldDefinition.field], fieldDefinition.definition);
        }
        else if(fieldDefinition.field) {
            return payload[fieldDefinition.field];
        }
    }
}