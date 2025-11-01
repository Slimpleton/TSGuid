type Guid = string & { readonly __brand: unique symbol };
const _CHAR_CHECK: RegExp = /^[0-9a-fA-F]{8}-?[0-9a-fA-F]{4}-?[0-9a-fA-F]{4}-?[0-9a-fA-F]{4}-?[0-9a-fA-F]{12}$/;
const _EXACT_GUID_FORMAT: RegExp = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}?$/;

function normalizeValue<T extends string | Guid>(s: T): T {
    return s.replace(/-/g, "").toLowerCase() as T;
}

function isGuid(value: string): value is Guid {
    return _CHAR_CHECK.test(value);
}

function isExactGuid(value: string): value is Guid {
    return _EXACT_GUID_FORMAT.test(value);
}

/**
 * Attempts to parse the {@link value} with loose Guid format {@link _EXACT_GUID_FORMAT}
 * @param value string to parse
 * @returns Valid Normalized GUID
 */
function parseGuid(value: string): Guid {
    if (!isGuid(value))
        throw new Error('Invalid guid received');
    return normalizeValue(value);
}


/**
 * Attempts to parse the {@link value} with loose Guid format {@link _EXACT_GUID_FORMAT}
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
    if (!isExactGuid(value))
        throw new Error('Invalid guid received');
    return normalizeValue(value);
}

function createRandomGuid(): Guid {
    return normalizeValue(parseExactGuid(crypto.randomUUID()));
}

export type { Guid };
export { parseExactGuid, parseGuid, createRandomGuid, tryParseGuid };