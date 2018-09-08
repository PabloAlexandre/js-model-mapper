# JS Model Mapper
A simple data mapper for javascript. You can use to format a data to your API or format the response from your API too.

## Installation

`npm install js-model-mapper` or `yarn js-model-mapper`

## Usage

You can use JS Model Mapper for many cases in your application. Bellow we have some examples:

### Simple mapper

If you want to ignore some fields of your object, you can use a mapper to just collect the relevant fields for you.

```javascript
const parse = mapper([
  'name', 
  'surname'
]);
const output = parse({ 
  name: 'John', 
  surname: 'Snow', 
  nonRelevantItem: 'No ones care'
});

/*
  output will be: { 
    name: 'John', 
    surname: 'Snow',
  }
*/;
```

If you have an optional field in your object and just need to send if this field exists, you can specify in your mapper this property and this behavior will occurs.

```javascript
const parse = mapper([
  'name', 
  'surname', 
  'createdAt'
]);

let output = parse({ 
  name: 'John', 
  surname: 'Snow', 
});

/* 
  output will be: { 
    name: 'John', 
    surname: 'Snow',
  };
*/

output = parse({ 
  name: 'John', 
  surname: 'Snow', 
  createdAt: '1979-01-01T00:00:00.000Z'
});

/* 
  output will be: { 
    name: 'John', 
    surname: 'Snow', 
    createdAt: '1979-01-01T00:00:00.000',
  };
*/
```

If your property is a nested property, you can pass the property path:

```javascript
const parse = mapper(['author.name']);
const output = parse({ 
  author: { 
    name: 'Martin Fowler',
    age: 20,
  },
});

/* 
  output will be: { 
    author: { 
      name: 'Martin Fowler'
    } 
  }
*/
```

### Mapper with rename

Sometimes, you need to rename a property from an object to another name in output object. If you need this, you can provide a object in mapper options. If you send a property `from` with original field name and a property `name` with target property name, the mapper will rename this field.

```javascript
const parse = mapper([{
  name: 'title',
  from: 'bookName',
}]);

const output = parse({ 
  bookName: 'Fahrenheit 451',
});

/*
  output will be: {
    title: 'Fahrenheit 451',
  };
*/
```

In some cases, maybe you need to rename from a nested property to a non nested property in your final object. 

```javascript
const parse = mapper([{
  name: 'publisher',
  from: 'publisher.name',
}]);

const output = parse({ 
  publisher: {
    name: 'Ballantine Books',
  },
});

/*
  output will be: {
    publisher: 'Ballantine Books',
  };
*/
```

If you need to get a non nested property and map to a nested property, this will works too:

```javascript
const parse = mapper([{
  name: 'publisher.name',
  from: 'publisherName',
}]);

const output = parse({ 
  publisherName: 'Ballantine Books',
});

/*
  output will be: {
    publisher: {
      name: 'Ballantine Books',
    },
  };
*/
```

### Mapper with transformation

In some cases, you can need to transform your mapped field. An example is a scenario when you need to convert the date to an ISO-8601 format.

```javascript
const parse = mapper([{
  name: 'createdAt',
  transform: fieldValue => fieldValue.toISOString();
}]);

const output = parse({ 
  createdAt: new Date(),
});

/*
  output will be: {
    createdAt: (new Date()).toISOString(),
  };
*/
```

** Note: When you don't send `from` property, the value of `from` will be the value of `name` property.

If for some reason, you need to have access of full object to transform your data, you can access as a second args in transform function.

```javascript
const parse = mapper([{
  name: 'fullName',
  from: 'name',
  transform: (fieldValue, obj) => `${fieldValue} ${obj.surname}`,
}]);

const output = parse({ 
  name: 'John',
  surname: 'Snow',
});

/*
  output will be: {
    fullName: 'John Snow',
  };
*/
```

### Mapper when applicable

In some scenarios, you can need to conditionate the field before apply. If you have, for example, a message available to some countries, you need to compare a country field before apply the property in a final object.

```javascript
const worldCupChampions = [
  'Uruguay', 
  'Italy', 
  'Germany', 
  'Brazil', 
  'England', 
  'Argentina', 
  'France', 
  'Spain',
];

const parse = mapper([{
  name: 'message',
  shouldApply: {
    field: 'country',
    condition: fieldValue => worldCupChampionsArray.includes(fieldValue)
  },
}]);

const output = parse({ 
  country: 'Brazil',
  message: 'You have won a Football World Cup!'
});

/*
  output will be: {
    message: 'You have won a Football World Cup!',
  };
*/
```

**Note: If you need to transform this field, the transformation will be applied only if condition is satisfied.

## Contributing