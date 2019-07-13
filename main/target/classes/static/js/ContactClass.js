"use strict";
exports.__esModule = true;
var Contact = /** @class */ (function () {
    function Contact() {
        this._Phone = "0123";
        this._Email = "info@site.com";
        this._Linkedin = "http://linkedin.com";
    }
    Contact.prototype.setPhone = function (val) {
        this._Phone = val;
    };
    Contact.prototype.getPhone = function () {
        return this._Phone;
    };
    Contact.prototype.setEmail = function (val) {
        this._Email = val;
    };
    Contact.prototype.getEmail = function () {
        return this._Email;
    };
    Contact.prototype.setLinkedin = function (val) {
        this._Linkedin = val;
    };
    Contact.prototype.getLinkedin = function () {
        return this._Linkedin;
    };
    return Contact;
}());
exports["default"] = Contact;
