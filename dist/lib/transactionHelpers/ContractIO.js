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
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Helper class to work with contract reading and writing
 */
var ContractIO = /** @class */ (function () {
    function ContractIO(web3, abi, contractAddress) {
        this.web3 = web3;
        this.contract = new web3.eth.Contract(abi, contractAddress);
        this.contractInstance = this.contract.methods;
        this.contractAddress = contractAddress;
    }
    ContractIO.prototype.getWeb3 = function () {
        return this.web3;
    };
    ContractIO.prototype.getContract = function () {
        return this.contract;
    };
    ContractIO.prototype.getContractInstance = function () {
        return this.contractInstance;
    };
    ContractIO.prototype.getContractAddress = function () {
        return this.contractAddress;
    };
    /**
     * Generates raw unsigned transaction to call smart contract method, which manipulates data
     */
    ContractIO.prototype.prepareCallTX = function (contractFunctionName, contractArguments, address) {
        return __awaiter(this, void 0, void 0, function () {
            var contractData, rawTx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prepareWriteData(contractFunctionName, contractArguments)];
                    case 1:
                        contractData = _a.sent();
                        return [4 /*yield*/, this.prepareRawTX(address, this.contractAddress, 0, contractData)];
                    case 2:
                        rawTx = _a.sent();
                        return [2 /*return*/, rawTx];
                }
            });
        });
    };
    /**
     * Reads data from contracts (read methods gas free)
     */
    ContractIO.prototype.readData = function (contractFunctionName, contractArguments) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, args;
            return __generator(this, function (_b) {
                args = contractArguments || [];
                return [2 /*return*/, (_a = this.contract.methods)[contractFunctionName].apply(_a, args)];
            });
        });
    };
    /**
     * Generates hex from contract data (methods, params)
     */
    ContractIO.prototype.prepareWriteData = function (contractFunctionName, contractArguments) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, args;
            return __generator(this, function (_b) {
                args = contractArguments || [];
                return [2 /*return*/, (_a = this.contract.methods)[contractFunctionName].apply(_a, args)];
            });
        });
    };
    ContractIO.prototype.prepareRawTX = function (fromAddress, toAddress, value, data) {
        return __awaiter(this, void 0, void 0, function () {
            var nonce, gasPrice, gasLimit;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getNonceFromBlockChain(fromAddress)];
                    case 1:
                        nonce = _a.sent();
                        return [4 /*yield*/, this.getGasPriceFromBlockChain()];
                    case 2:
                        gasPrice = _a.sent();
                        return [4 /*yield*/, this.getEstimatedGas(data.encodeABI(), fromAddress, toAddress)];
                    case 3:
                        gasLimit = _a.sent();
                        return [2 /*return*/, {
                                from: fromAddress,
                                to: toAddress,
                                nonce: nonce,
                                gasPrice: gasPrice,
                                gasLimit: gasLimit,
                                value: value,
                                data: data.encodeABI(),
                            }];
                }
            });
        });
    };
    ContractIO.prototype.getEstimatedGas = function (data, from, to) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.web3.eth.estimateGas({ data: data, from: from, to: to }, function (error, gas) {
                            if (error) {
                                reject(error);
                                return;
                            }
                            resolve(gas);
                        });
                    })];
            });
        });
    };
    ContractIO.prototype.getGasPriceFromBlockChain = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.web3.eth.getGasPrice(function (error, gasPrice) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(_this.web3.utils.toHex(gasPrice));
            });
        });
    };
    ContractIO.prototype.getNonceFromBlockChain = function (fromAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.web3.eth.getTransactionCount(fromAddress, function (error, count) {
                            if (error) {
                                reject(error);
                                return;
                            }
                            resolve(_this.web3.utils.toHex(count));
                        });
                    })];
            });
        });
    };
    return ContractIO;
}());
exports.ContractIO = ContractIO;
//# sourceMappingURL=ContractIO.js.map