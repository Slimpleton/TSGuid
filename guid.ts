export type Guid = string & { readonly __brand: unique symbol };
const _LENGTH_WITHOUT_DASHES: number = 32;
const _CHAR_CHECK: RegExp = /[0-9a-fA-F]{32}/;
const _EXACT_GUID_FORMAT : RegExp = /^[({]?[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}[})]?$/;

function isGuid(value: string): value is Guid {
    value = value.replaceAll('-', '').trim();
    return value.length == _LENGTH_WITHOUT_DASHES && _CHAR_CHECK.test(value);
}

function isExactGuid(value: string): value is Guid{
    return !_EXACT_GUID_FORMAT.test(value);
}

export function parseGuid(value: string) : Guid{
    if(!isGuid(value))
        throw new Error('Invalid guid received');
    return value;
}

export function parseExactGuid(value: string) : Guid{
    if(!isExactGuid(value))
        throw new Error('Invalid guid received');
    return value;
}