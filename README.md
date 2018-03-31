# object-mapper (WIP)
This is a library for mapping either collections of objects or a single object, to a new object. It's intended to be very simplistic to use and implement, while still providing the end user with the required configurations/control that they need. This is also intended to work with all javascript objects. 

# Usage
In order to map one object to another you must first define mappings. Mappings tell the Mapper instance how to map the source object to the destination object. The mappings are very simple to construct and follow the below pattern. 

### Mapping
The mapping class defines how one object should be mapped to another. The keys inside of a mapping definition are the keys you would like to generate for your destination object. Whereas the values of those keys are instructions on where the value should come from on the source object. 

### Property-to-Property
If you are mapping one field to another field with no modifications you can simply provide the source field as a string. 
```
new Mapping({
    id: '_id'
})

//would output (destination)
{
    id: 1
}

//from (source)
{
    _id: 1
}
```
The above mapping is saying to create a destination object with an "id" property that contains the value from the source field "_id" 

### Function-to-Property
If you need to do more complex mappings, or would like to have a function executed as the property mapping, this is also possible. 
```
new Mapping({
    id: (record) => record._id
}
```
This would produce the same output as above. The function takes a parameter for "record", this is the source object that the mapping definition is currently mapping. The function must return the value that you would like to produce for the destination field. 

### Mapping-to-Property 
If you would like to have a nested mapping, this is also possible. If your source object contains other objects that you would also like to map, you can define a nested mapping to handle this. The nested property must have an Object as it's definition. This object should contain two properties: field and definition. The field property tells the mapper which property on the source object we are mapping from. The definition is the mapping that you would like to use for the nested field. 
Example Mapping:
```
new Mapping({
    id: (record) => record._id,
    name: 'name',
    nested: {
        field: 'nested',
        definition: new Mapping({
            id: '_id',
            anotherField: 'another-field'
        })
    }
})
```
This source object
```
{
    _id: 1,
    name: 'Joe',
    nested: {
        _id: 1
        'another-field': "I'm nested!"
    }
}
```
would produce the following output, using the aforementioned mapping.
```
{
    id: 1,
    name: "Joe"
    nested: {
        id: 1,
        anotherField: "I'm nested!"
    }
}
```

### Mapper
The Mapper class is the object that handles converting the source objects to the destination objects using the Mappings that were defined. The Mapper class holds a set of Mappings that can then be referenced by name when doing the mappings. Below is an example.
```
let mappings = new Map();
mappings.set('person', PersonMapping);
mappings.set('person-mapping-2', PersonMapping2);

let mapper = new Mapper(mappings);
```
We are using the javascript [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) object to hold a key and value pair of Mappings for the Mapper. So when it comes time to do the actual mapping, it becomes just simply providing the string for the mapping name. 
```
mapper.map(payload, 'person');
```
This is instructing the Mapper to use the 'person' mapping that was defined above. The first parameter of the map method is the payload that you wish to transform. 

# Examples 
There are so far two examples under the tests folder. 

# Options 
WIP

