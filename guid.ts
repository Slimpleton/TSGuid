type Guid = string & { readonly __brand: unique symbol };
const _CHAR_CHECK: RegExp = /^[({]?[0-9a-fA-F]{8}-?([0-9a-fA-F]{4}-?){3}[0-9a-fA-F]{12}[})]?$/;
const _EXACT_GUID_FORMAT: RegExp = /^[({]?[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}[})]?$/;

function isGuid(value: string): value is Guid {
    return _CHAR_CHECK.test(value);
}

function isExactGuid(value: string): value is Guid {
    return _EXACT_GUID_FORMAT.test(value);
}

function parseGuid(value: string): Guid {
    if (!isGuid(value))
        throw new Error('Invalid guid received');
    return value;
}

function parseExactGuid(value: string): Guid {
    if (!isExactGuid(value))
        throw new Error('Invalid guid received');
    return value;
}

export type { Guid };
export { parseExactGuid, parseGuid };