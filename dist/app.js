"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
function isInputElement(x) {
    return "value" in x;
}
var devourButtons = document.querySelectorAll(".devour-button");
var devour = function () {
    return __awaiter(this, void 0, void 0, function () {
        var id, url, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = this.getAttribute("data-id");
                    url = "/api/burgers/?id=" + id;
                    return [4 /*yield*/, fetch(url, {
                            method: "PUT"
                        })];
                case 1:
                    response = _a.sent();
                    this.setAttribute("data-devoured", "true");
                    location.reload(true);
                    return [2 /*return*/];
            }
        });
    });
};
var addNew = function () {
    return __awaiter(this, void 0, void 0, function () {
        var inputBox, text, url;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    inputBox = document.getElementById("burger-text");
                    if (!isInputElement(inputBox)) return [3 /*break*/, 2];
                    text = inputBox.value;
                    url = "/api/burgers/";
                    return [4 /*yield*/, fetch(url, {
                            headers: {
                                "Content-Type": "application/json"
                            },
                            method: "POST",
                            body: JSON.stringify({ burger: text })
                        })];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2: return [2 /*return*/];
                case 3: return [2 /*return*/];
            }
        });
    });
};
var clear = function () {
    return __awaiter(this, void 0, void 0, function () {
        var allWithDevoured, allDevoured;
        return __generator(this, function (_a) {
            allWithDevoured = document.querySelectorAll("data-devoured");
            allDevoured = Array.from(allWithDevoured).filter(function (el) { return el.getAttribute("data-devoured") === "true"; });
            console.log(allDevoured);
            return [2 /*return*/];
        });
    });
};
Array.from(devourButtons).forEach(function (element) {
    element.addEventListener("click", devour);
});
document.getElementById("add-burger").addEventListener("click", addNew);
document.getElementById("clear").addEventListener("click", clear);
