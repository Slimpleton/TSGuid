import { createRandomGuid, parseExactGuid, parseGuid } from "../src";

describe("Guid utilities", () => {
    describe("parseGuid", () => {
        it("accepts valid GUIDs with or without hyphens", () => {
            const validGuids = [
                "123e4567-e89b-12d3-a456-426614174000",
                "123e4567-e89b-12d3-a456-426614174000",
                "123e4567e89b12d3a456426614174000",
                "123E4567E89B12D3A456426614174000",
            ];

            for (const guid of validGuids) {
                expect(() => parseGuid(guid)).not.toThrow();
            }
        });

        it("rejects invalid GUIDs", () => {
            const invalids = ["", "xyz", "123", "g23e4567-e89b-12d3-a456-426614174000"];
            for (const val of invalids) {
                expect(() => parseGuid(val)).toThrow("Invalid guid received");
            }
        });
    });

    describe("parseExactGuid", () => {
        it("accepts only properly formatted GUIDs with hyphens", () => {
            const valid = "123e4567-e89b-12d3-a456-426614174000";
            expect(() => parseExactGuid(valid)).not.toThrow();
        });

        it("rejects GUIDs without hyphens", () => {
            const invalid = "123e4567e89b12d3a456426614174000";
            expect(() => parseExactGuid(invalid)).toThrow("Invalid guid received");
        });
    });

    describe("createRandomGuid", () => {
        it("creates a valid exact GUID", () => {
            const guid = createRandomGuid();
            // type-wise, guid is Guid (string)
            expect(typeof guid).toBe("string");
            // regex check after normalization
            expect(guid).toMatch(/^[0-9a-f]{32}$/);
        });

        it("creates unique GUIDs", () => {
            const g1 = createRandomGuid();
            const g2 = createRandomGuid();
            expect(g1).not.toBe(g2);
        });
    });

    describe("Guid equality", () => {
        it("should treat two GUIDs with the same underlying string as equal", () => {
            const guidString = "123e4567-e89b-12d3-a456-426614174000";

            const guid1 = parseGuid(guidString);
            const guid2 = parseGuid(guidString);

            // Runtime equality
            expect(guid1).toBe(guid2);

            // Also works with normal string comparison
            expect(guid1 === guid2).toBe(true);
        });
    });
});

describe("Guid capitalization comparisons", () => {
    it("should pass equality for differently capitalized GUIDs", () => {
        const guid1 = parseGuid("123e4567-e89b-12d3-a456-426614174000");
        const guid2 = parseGuid("123E4567-E89B-12D3-A456-426614174000");

        expect(guid1).toBe(guid2);
    });
});

describe("Guid hyphen comparisons", () => {
    it("should fail parseExactGuid for GUIDs missing hyphens", () => {
        const guidNoHyphens = "123e4567e89b12d3a456426614174000";

        expect(() => parseExactGuid(guidNoHyphens)).toThrow("Invalid guid received");

        // parseGuid (looser) should accept it
        expect(() => parseGuid(guidNoHyphens)).not.toThrow();
    });

    it("should fail parseExactGuid for GUIDs with hyphens in wrong positions", () => {
        // Insert hyphens incorrectly
        const guidWrongHyphens = "123e-4567-e89b12-d3a45642-6614174000";

        expect(() => parseExactGuid(guidWrongHyphens)).toThrow("Invalid guid received");
        expect(() => parseGuid(guidWrongHyphens)).toThrow("Invalid guid received");
    });

    it("should accept GUIDs with all hyphens in the correct positions", () => {
        const guidCorrect = "123e4567-e89b-12d3-a456-426614174000";
        expect(() => parseExactGuid(guidCorrect)).not.toThrow();
        expect(() => parseGuid(guidCorrect)).not.toThrow();
    });
});

describe("Guid comparisons with different hyphen placements", () => {
    it("should consider GUIDs equal even if hyphens are in different valid positions", () => {
        const guidWithHyphens = "123e4567-e89b-12d3-a456-426614174000";
        const guidCompact = "123e4567e89b12d3a456426614174000";
        const guidUppercaseHyphens = "123E4567-E89B-12D3-A456-426614174000";

        const parsed1 = parseGuid(guidWithHyphens);
        const parsed2 = parseGuid(guidCompact);
        const parsed3 = parseGuid(guidUppercaseHyphens);

        // All normalized GUIDs should be equal
        expect(parsed1).toBe(parsed2);
        expect(parsed1).toBe(parsed3);
        expect(parsed2).toBe(parsed3);
    });

    it("should fail for GUIDs with incorrect hyphen placement", () => {
        const badHyphenGuid = "123e456-7e89b12d3-a456426614174000";
        expect(() => parseGuid(badHyphenGuid)).toThrow("Invalid guid received");
    });
});

describe("Guid edge cases", () => {
    describe("parseGuid edge cases", () => {
        it("should reject non-string inputs", () => {
            const nonStrings: any[] = [null, undefined, 123, {}, [], true, false];
            for (const val of nonStrings) {
                expect(() => parseGuid(val)).toThrow("Invalid guid received");
            }
        });

        it("should not trim whitespace to normalize GUIDs", () => {
            const guidWithSpaces = "  123e4567-e89b-12d3-a456-426614174000  ";
            expect(() => parseGuid(guidWithSpaces)).toThrow("Invalid guid received");
        });

        it("should handle extremely long strings gracefully", () => {
            const longString = "123e4567-e89b-12d3-a456-426614174000".repeat(10);
            expect(() => parseGuid(longString)).toThrow("Invalid guid received");
        });

        it("should reject strings with invalid characters", () => {
            const invalidChars = "123e4567-e89b-12d3-a456-42661417!000";
            expect(() => parseGuid(invalidChars)).toThrow("Invalid guid received");
        });
    });

    describe("createRandomGuid consistency", () => {
        it("repeated normalization of the same GUID produces the same result", () => {
            const guid = createRandomGuid();
            const normalized1 = parseGuid(guid);
            const normalized2 = parseGuid(guid);
            expect(normalized1).toBe(normalized2);
        });

        it("generated GUIDs always produce valid normalized strings", () => {
            for (let i = 0; i < 10; i++) {
                const guid = createRandomGuid();
                const normalized = parseGuid(guid);
                expect(normalized).toMatch(/^[0-9a-f]{32}$/);
            }
        });
    });
});