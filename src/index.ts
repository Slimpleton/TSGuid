type Guid<V extends UUIDVersion = UUIDVersion> = string & { readonly __brand: unique symbol; readonly __uuidVersion: V };
type UUIDVersion = 4 | 5 | 6 | 7;

// Specific UUID types
type UUIDv4 = Guid<4>;
type UUIDv5 = Guid<5>;
type UUIDv6 = Guid<6>;
type UUIDv7 = Guid<7>;

// Union type for any UUID
type UUID = UUIDv4 | UUIDv5 | UUIDv6 | UUIDv7;

const UUID_REGEX: Record<UUIDVersion, RegExp> = {
    4: /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/,
    5: /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-5[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/,
    6: /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-6[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/,
    7: /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-7[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/,
};


function _normalizeValue<T extends string>(s: T): T {
    // Only handle UUIDs without dashes
    if (s.length === 32) {
        const normalizedChars = new Array(36);

        // Positions where dashes go
        const dashPositions = [8, 13, 18, 23];
        let srcIndex = 0;

        for (let i = 0; i < 36; i++) {
            normalizedChars[i] = dashPositions.includes(i) ? '-' : s[srcIndex++].toLowerCase();
        }

        return normalizedChars.join() as T;
    }

    return s.toLowerCase() as T;
}

function _isGuid<V extends UUIDVersion>(value: string, version: UUIDVersion): value is Guid<V> {
    return UUID_REGEX[version].test(value);
}

/**
 * Attempts to parse the {@link value} with Guid format {@link _UUID_V4_FORMAT}
 * @param value string to parse
 * @returns Valid Normalized GUID or {@link undefined}
 */
function tryParseGuid(value: string, version: UUIDVersion = 4): Guid<UUIDVersion> | undefined {
    try {
        return parseGuid(value, version);
    } catch {
        return undefined;
    }
}


/**
 * Attempts to parse the {@link value} with strict Guid format {@link _UUID_V4_FORMAT}
 * @param value string to parse
 * @returns Valid Normalized GUID
 */
function parseGuid(value: string, version: UUIDVersion = 4): Guid<UUIDVersion> {
    if (!_isGuid(value, version))
        throw new Error('Invalid guid received');
    return _normalizeValue(value);
}

/**
 * Creates a random UUID using {@link crypto.randomUUID} and normalizes it
 * @returns Random {@link Guid}
 */
function createRandomGuid(): UUIDv4 {
    return _normalizeValue(parseGuid(crypto.randomUUID(), 4)) as UUIDv4;
}

export type { UUID, UUIDVersion };
export { parseGuid, createRandomGuid, tryParseGuid };