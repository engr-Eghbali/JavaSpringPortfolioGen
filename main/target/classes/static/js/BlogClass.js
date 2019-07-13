"use strict";
exports.__esModule = true;
var BioClass_1 = require("./BioClass");
var ContactClass_1 = require("./ContactClass");
var Blog = /** @class */ (function () {
    function Blog() {
        this._Title = "Blog Title";
        this._Bio = new BioClass_1["default"]();
        this._Contact = new ContactClass_1["default"]();
        this._Style = {};
    }
    Blog.prototype.setTitle = function (val) {
        this._Title = val;
    };
    Blog.prototype.getTitle = function () {
        return this._Title;
    };
    Blog.prototype.setBio = function (val) {
        this._Bio = val;
    };
    Blog.prototype.getBio = function () {
        return this._Bio;
    };
    Blog.prototype.setContact = function (val) {
        this._Contact = val;
    };
    Blog.prototype.getContact = function () {
        return this._Contact;
    };
    Blog.prototype.setStyle = function (val) {
        this._Style = val;
    };
    Blog.prototype.getStyle = function () {
        return this._Style;
    };
    return Blog;
}());
exports["default"] = Blog;
