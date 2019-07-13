"use strict";
exports.__esModule = true;
var Bio = /** @class */ (function () {
    function Bio() {
        this._Content = "lurem ipsom";
        this._CVLink = "http://site.com";
    }
    Bio.prototype.setBiography = function (val) {
        this._Content = val;
    };
    Bio.prototype.getBiography = function () {
        return this._Content;
    };
    Bio.prototype.setCVLink = function (val) {
        this._CVLink = val;
    };
    Bio.prototype.getCVLink = function () {
        return this._CVLink;
    };
    return Bio;
}());
exports["default"] = Bio;
