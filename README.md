# Typescript Guid
A Typescript safe implementation of a GUID that allows for validation of the format while limiting boilerplate to reference the value itself.
Uses types not classes to be more lightweight / reusable

## Installation and Usage
### Installation

```
npm i @slimpleton13/ts-guid --save
```

### Basic Usage

```typescript
export class Xyz{
    public id: Guid;
    constructor(){
        this.id = createRandomGuid();
    }
    //or
    constructor(id: string){
        this.id = parseGuid(id);
    }
    //or
    constructor(id: `${string}-${string}-${string}-${string}-${string}`){
        this.id = parseExactGuid(id);
    }
}

```

## Methods Included
 | Method | Description|
 |---|---|
 | createRandomGuid(): Guid| Creates a random Guid using crypto.randomUUID() and returns it strictly typed|
 | parseGuid(val: string): Guid| Attempts to parse the value with loose Guid format|
 | parseExactGuid(val: string): Guid| Attempts to parse the value with strict Guid format|

### ESLINTER USERS
This comes with an extension to the ruleset that is Highly Recommended to prevent runtime 'as-casting' to Guid
'no-as-guid':'error'