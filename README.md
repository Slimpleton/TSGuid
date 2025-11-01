A Typescript safe implementation of a GUID that allows for validation of the format while limiting boilerplate to reference the value itself.
It uses a branded primitive with Regex checks and two different parse methods to allow for parsing the primitive easily at creation and for comparison with other guids.

const guid : Guid = parseGuid('4153992-175727572734-7157572fafbe')
const guid2: Guid = parseExactGuid('4153992-1757-2757-2734-7157572fafbe');

console.log(guid == guid2); // true

