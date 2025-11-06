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
    public id: UUID;
    constructor(){
        this.id = createRandomGuid();
    }
    //or

    constructor(id: `${string}-${string}-${string}-${string}-${string}`){
        this.id = parseGuid(id);
    }

    // or
    constructor(id: `${string}-${string}-${string}-${string}-${string}`, version: UUIDVersion){
        this.id = parseGuid(id, version);
    }
}

```
## Types Included
| Type | Description|
|---|---|
| UUID| Generic type encompassing all versions of Guid&lt;UUIDVersion&gt; available|
| UUIDVersion| Currently supported versions of UUID for parsing by library (4-7)|

## Methods Included
 | Method | Description|
 |---|---|
 | createRandomGuid(): UUIDv4| Creates a random Guid using crypto.randomUUID() and returns it strictly typed|
 | parseGuid(val: string, version: UUIDVersion = 4): Guid&lt;UUIDVersion&gt; | Attempts to parse the value with versioned UUID format|


### ESLINTER USERS
This comes with an extension to the ruleset that is Highly Recommended to prevent runtime 'as-casting' to Guid
'no-as-uuid':'error'