import { createRandomGuid, parseExactGuid, parseGuid } from "../src";

describe("Guid utilities", () => {
    describe("parseGuid", () => {
        it("accepts valid GUIDs with or without hyphens", () => {
            const validGuids = [
                "123e4567-e89b-12d3-a456-426614174000",
                "{123e4567-e89b-12d3-a456-426614174000}",
                "(123e4567e89b12d3a456426614174000)",
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
            // regex check
            expect(guid).toMatch(/^[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}$/);
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
