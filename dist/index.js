"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeerDiscovery = void 0;
const b4a_1 = __importDefault(require("b4a"));
class PeerDiscovery {
    _sources = new Map();
    registerSource(name, source) {
        if (this._sources.has(name)) {
            return false;
        }
        this._sources.set(name, source);
        return true;
    }
    removeSource(name) {
        if (!this._sources.has(name)) {
            return false;
        }
        this._sources.delete(name);
        return true;
    }
    removeAllSources() {
        this._sources.clear();
    }
    sourceExists(name) {
        return this._sources.has(name);
    }
    async discover(pubkey, options = {}) {
        if (!b4a_1.default.isBuffer(pubkey)) {
            pubkey = b4a_1.default.from(pubkey, "hex");
        }
        for (const source of this._sources.values()) {
            const result = await source(pubkey, options);
            if (result) {
                return result;
            }
        }
        return false;
    }
}
exports.PeerDiscovery = PeerDiscovery;
//# sourceMappingURL=index.js.map