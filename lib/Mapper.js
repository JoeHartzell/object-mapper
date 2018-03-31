'use strict';
const _ = require('lodash');
const Mapping = require('./Mapping');
const utils = require('./mapper-utils');

let Mapper = class Mapper {
    constructor(mappings = new Map()){
        this.mappings = mappings
    }

    addMapping(name, mapping){
        this.mappings.set(name, mapping);
    }

    map(payload, mappingName){
        utils.mapSingle();
        let mapSingle = function(){

        }

        let mapCollection = function(){

        }

        let mapString = function(){

        }

        let mapFunction = function(){

        }

        if(_.isArray(payload)){
            return _.reduce(obj, (previous, next) => 
                previous.concat(map(next, this.definition)), 
            []);
        }
        else {
            return map(payload, this.definition);
        }
    }
}

let mapSingle = function(){

}

let map = function(source, mapping){
    let definition = mapping.definition;
    let options = mapping.options;
    let destination = {};

    Object.keys(definition).forEach(key => {
        let srcKey = definition[key];

        if(_.isFunction(srcKey)){
            destination[key] = srcKey(source);
        }
        else if(_.isString(srcKey)){
            destination[key] = source[srcKey];
        }
        else if(_.isObject(srcKey) && srcKey.field){
            if(srcKey.definition){
                let innerMapper = new Mapper(srcKey.definition);
                destination[key] = innerMapper.map(source[srcKey.field]);
            }
            else{
                destination[key] = source[srcKey.field]
            }
        }
    })

    return destination;
}

module.exports = Mapper;