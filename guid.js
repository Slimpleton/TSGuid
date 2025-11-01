"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseGuid = parseGuid;
exports.parseExactGuid = parseExactGuid;
var _LENGTH_WITHOUT_DASHES = 32;
var _CHAR_CHECK = /[0-9a-fA-F]{32}/;
var _EXACT_GUID_FORMAT = /^[({]?[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}[})]?$/;
function isGuid(value) {
    value = value.replaceAll('-', '').trim();
    return value.length == _LENGTH_WITHOUT_DASHES && _CHAR_CHECK.test(value);
}
function isExactGuid(value) {
    return !_EXACT_GUID_FORMAT.test(value);
}
function parseGuid(value) {
    if (!isGuid(value))
        throw new Error('Invalid guid received');
    return value;
}
function parseExactGuid(value) {
    if (!isExactGuid(value))
        throw new Error('Invalid guid received');
    return value;
}
