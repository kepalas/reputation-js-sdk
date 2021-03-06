"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tx_1 = require("../utils/tx");
var PassportLogic_json_1 = __importDefault(require("../../config/PassportLogic.json"));
/**
 * Class to change and check permissions for fact providers to any specific passport
 */
var Permissions = /** @class */ (function () {
    function Permissions(web3, passportAddress) {
        this.contract = new web3.eth.Contract(PassportLogic_json_1.default, passportAddress);
        this.web3 = web3;
    }
    /**
     * Adds factProvider to whitelist
     */
    Permissions.prototype.addFactProviderToWhitelist = function (factProviderAddress, passportOwnerAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var txData;
            return __generator(this, function (_a) {
                txData = this.contract.methods.addFactProviderToWhitelist(factProviderAddress);
                return [2 /*return*/, tx_1.prepareTxConfig(this.web3, passportOwnerAddress, this.contract.address, txData)];
            });
        });
    };
    /**
     * Removes fact provider from whitelist
     */
    Permissions.prototype.removeFactProviderFromWhitelist = function (factProviderAddress, passportOwnerAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var txData;
            return __generator(this, function (_a) {
                txData = this.contract.methods.removeFactProviderFromWhitelist(factProviderAddress);
                return [2 /*return*/, tx_1.prepareTxConfig(this.web3, passportOwnerAddress, this.contract.address, txData)];
            });
        });
    };
    /**
     * Checks if fact provider is whitelisted
     */
    Permissions.prototype.isFactProviderInWhitelist = function (factProviderAddress) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.contract.methods.isFactProviderInWhitelist(factProviderAddress).call()];
            });
        });
    };
    /**
     * Checks if whitelist only permission is set, meaning that only whitelisted fact
     * providers could write to this passport
     */
    Permissions.prototype.isWhitelistOnlyPermissionSet = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.contract.methods.isWhitelistOnlyPermissionSet().call()];
            });
        });
    };
    /**
     * Checks if fact provider is allowed to write facts to this passport
     */
    Permissions.prototype.isAllowedFactProvider = function (factProviderAddress) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.contract.methods.isAllowedFactProvider(factProviderAddress).call()];
            });
        });
    };
    /**
     * Sets permission for passport whether only whitelisted fact providers could write facts to it
     */
    Permissions.prototype.setWhitelistOnlyPermission = function (onlyWhitelistedProviders, passportOwnerAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var txData;
            return __generator(this, function (_a) {
                txData = this.contract.methods.setWhitelistOnlyPermission(onlyWhitelistedProviders);
                return [2 /*return*/, tx_1.prepareTxConfig(this.web3, passportOwnerAddress, this.contract.address, txData)];
            });
        });
    };
    return Permissions;
}());
exports.Permissions = Permissions;
