type Guid = string & { readonly __brand: unique symbol };
const _CHAR_CHECK: RegExp = /^[0-9a-fA-F]{8}-?[0-9a-fA-F]{4}-?[0-9a-fA-F]{4}-?[0-9a-fA-F]{4}-?[0-9a-fA-F]{12}$/;
const _EXACT_GUID_FORMAT: RegExp = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}?$/;

function _normalizeValue<T extends string | Guid>(s: T): T {
    return s.replace(/-/g, "").toLowerCase() as T;
}

function _isGuid(value: string): value is Guid {
    return _CHAR_CHECK.test(value);
}

function _isExactGuid(value: string): value is Guid {
    return _EXACT_GUID_FORMAT.test(value);
}

/**
 * Attempts to parse the {@link value} with loose Guid format {@link _EXACT_GUID_FORMAT}
 * @param value string to parse
 * @returns Valid Normalized GUID
 */
function parseGuid(value: string): Guid {
    if (!_isGuid(value))
        throw new Error('Invalid guid received');
    return _normalizeValue(value);
}


/**
 * Attempts to parse the {@link value} with Guid format {@link _EXACT_GUID_FORMAT}
 * @param value string to parse
 * @returns Valid Normalized GUID or {@link undefined}
 */
function tryParseGuid(value: string): Guid | undefined {
    try {
        return parseGuid(value);
    } catch {
        return undefined;
    }
}


/**
 * Attempts to parse the {@link value} with strict Guid format {@link _EXACT_GUID_FORMAT}
 * @param value string to parse
 * @returns Valid Normalized GUID
 */
function parseExactGuid(value: string): Guid {
    value = value.toLowerCase();
    if (!_isExactGuid(value))
        throw new Error('Invalid guid received');
    return _normalizeValue(value);
}

/**
 * Creates a random UUID using {@link crypto.randomUUID} and normalizes it
 * @returns Random {@link Guid}
 */
function createRandomGuid(): Guid {
    return _normalizeValue(parseExactGuid(crypto.randomUUID()));
}

export type { Guid };
export { parseExactGuid, parseGuid, createRandomGuid, tryParseGuid };