/* @ts-self-types="./inindo_bingo_runtime.d.ts" */

/**
 * Playable-round boundary (ticket inindo-ks4yrb.1): wraps RoundSession with
 * flat JS-friendly buffers. Tap report layout (11 bytes):
 * [kind 0=call/1=special, latched_c9c1, number, cell(0xFF none), c9c2, c9c3,
 *  line_completed, pacing_profile, raw_c420, feedback_lo, feedback_hi].
 * Resolve report (6 bytes): [paid, amount_lo, amount_hi, chips_lo, chips_hi,
 *  replay_prompted].
 */
export class WasmBingoRound {
    static __wrap(ptr) {
        const obj = Object.create(WasmBingoRound.prototype);
        obj.__wbg_ptr = ptr;
        WasmBingoRoundFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        WasmBingoRoundFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_wasmbingoround_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    advanceSpinner() {
        const ret = wasm.wasmbingoround_advanceSpinner(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} cell
     * @returns {Uint8Array}
     */
    applySelection(cell) {
        const ret = wasm.wasmbingoround_applySelection(this.__wbg_ptr, cell);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * @returns {Uint8Array}
     */
    boardNumbers() {
        const ret = wasm.wasmbingoround_boardNumbers(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * @param {number} quantity
     * @returns {Uint8Array}
     */
    buyChips(quantity) {
        const ret = wasm.wasmbingoround_buyChips(this.__wbg_ptr, quantity);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * @returns {number}
     */
    c421() {
        const ret = wasm.wasmbingoround_c421(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    chips() {
        const ret = wasm.wasmbingoround_chips(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {Uint8Array} bytes
     * @param {number} c421
     * @returns {WasmBingoRound}
     */
    static fromStateBytes(bytes, c421) {
        const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.wasmbingoround_fromStateBytes(ptr0, len0, c421);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return WasmBingoRound.__wrap(ret[0]);
    }
    /**
     * @returns {number}
     */
    gold() {
        const ret = wasm.wasmbingoround_gold(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Uint8Array}
     */
    marks() {
        const ret = wasm.wasmbingoround_marks(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * @returns {number}
     */
    pendingSelections() {
        const ret = wasm.wasmbingoround_pendingSelections(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    phaseCode() {
        const ret = wasm.wasmbingoround_phaseCode(this.__wbg_ptr);
        return ret;
    }
    rearm() {
        const ret = wasm.wasmbingoround_rearm(this.__wbg_ptr);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * @returns {Uint8Array}
     */
    resolveRound() {
        const ret = wasm.wasmbingoround_resolveRound(this.__wbg_ptr);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * @returns {number}
     */
    spinner() {
        const ret = wasm.wasmbingoround_spinner(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} wager
     * @returns {boolean}
     */
    startRound(wager) {
        const ret = wasm.wasmbingoround_startRound(this.__wbg_ptr, wager);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] !== 0;
    }
    /**
     * @returns {Uint8Array}
     */
    stateBytes() {
        const ret = wasm.wasmbingoround_stateBytes(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * @returns {Uint8Array}
     */
    tap() {
        const ret = wasm.wasmbingoround_tap(this.__wbg_ptr);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * @returns {number}
     */
    wager() {
        const ret = wasm.wasmbingoround_wager(this.__wbg_ptr);
        return ret;
    }
}
if (Symbol.dispose) WasmBingoRound.prototype[Symbol.dispose] = WasmBingoRound.prototype.free;

export class WasmBingoRuntime {
    static __wrap(ptr) {
        const obj = Object.create(WasmBingoRuntime.prototype);
        obj.__wbg_ptr = ptr;
        WasmBingoRuntimeFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        WasmBingoRuntimeFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_wasmbingoruntime_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    entryTextPointer() {
        const ret = wasm.wasmbingoruntime_entryTextPointer(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {Uint8Array} bytes
     * @returns {WasmBingoRuntime}
     */
    static fromStateBytes(bytes) {
        const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.wasmbingoruntime_fromStateBytes(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return WasmBingoRuntime.__wrap(ret[0]);
    }
    /**
     * @param {number} quantity_result
     * @returns {number}
     */
    quoteChipPurchaseCode(quantity_result) {
        const ret = wasm.wasmbingoruntime_quoteChipPurchaseCode(this.__wbg_ptr, quantity_result);
        return ret;
    }
    /**
     * @returns {number}
     */
    selectedChips() {
        const ret = wasm.wasmbingoruntime_selectedChips(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Uint8Array}
     */
    stateBytes() {
        const ret = wasm.wasmbingoruntime_stateBytes(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
}
if (Symbol.dispose) WasmBingoRuntime.prototype[Symbol.dispose] = WasmBingoRuntime.prototype.free;
function __wbg_get_imports() {
    const import0 = {
        __proto__: null,
        __wbg___wbindgen_throw_bbadd78c1bac3a77: function(arg0, arg1) {
            throw new Error(getStringFromWasm0(arg0, arg1));
        },
        __wbindgen_cast_0000000000000001: function(arg0, arg1) {
            // Cast intrinsic for `Ref(String) -> Externref`.
            const ret = getStringFromWasm0(arg0, arg1);
            return ret;
        },
        __wbindgen_init_externref_table: function() {
            const table = wasm.__wbindgen_externrefs;
            const offset = table.grow(4);
            table.set(0, undefined);
            table.set(offset + 0, undefined);
            table.set(offset + 1, null);
            table.set(offset + 2, true);
            table.set(offset + 3, false);
        },
    };
    return {
        __proto__: null,
        "./inindo_bingo_runtime_bg.js": import0,
    };
}

const WasmBingoRoundFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_wasmbingoround_free(ptr, 1));
const WasmBingoRuntimeFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_wasmbingoruntime_free(ptr, 1));

function getArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}

function getStringFromWasm0(ptr, len) {
    return decodeText(ptr >>> 0, len);
}

let cachedUint8ArrayMemory0 = null;
function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1, 1) >>> 0;
    getUint8ArrayMemory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function takeFromExternrefTable0(idx) {
    const value = wasm.__wbindgen_externrefs.get(idx);
    wasm.__externref_table_dealloc(idx);
    return value;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
cachedTextDecoder.decode();
const MAX_SAFARI_DECODE_BYTES = 2146435072;
let numBytesDecoded = 0;
function decodeText(ptr, len) {
    numBytesDecoded += len;
    if (numBytesDecoded >= MAX_SAFARI_DECODE_BYTES) {
        cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
        cachedTextDecoder.decode();
        numBytesDecoded = len;
    }
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

let WASM_VECTOR_LEN = 0;

let wasmModule, wasmInstance, wasm;
function __wbg_finalize_init(instance, module) {
    wasmInstance = instance;
    wasm = instance.exports;
    wasmModule = module;
    cachedUint8ArrayMemory0 = null;
    wasm.__wbindgen_start();
    return wasm;
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);
            } catch (e) {
                const validResponse = module.ok && expectedResponseType(module.type);

                if (validResponse && module.headers.get('Content-Type') !== 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else { throw e; }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);
    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };
        } else {
            return instance;
        }
    }

    function expectedResponseType(type) {
        switch (type) {
            case 'basic': case 'cors': case 'default': return true;
        }
        return false;
    }
}

function initSync(module) {
    if (wasm !== undefined) return wasm;


    if (module !== undefined) {
        if (Object.getPrototypeOf(module) === Object.prototype) {
            ({module} = module)
        } else {
            console.warn('using deprecated parameters for `initSync()`; pass a single object instead')
        }
    }

    const imports = __wbg_get_imports();
    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }
    const instance = new WebAssembly.Instance(module, imports);
    return __wbg_finalize_init(instance, module);
}

async function __wbg_init(module_or_path) {
    if (wasm !== undefined) return wasm;


    if (module_or_path !== undefined) {
        if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
            ({module_or_path} = module_or_path)
        } else {
            console.warn('using deprecated parameters for the initialization function; pass a single object instead')
        }
    }

    if (module_or_path === undefined) {
        module_or_path = new URL('inindo_bingo_runtime_bg.wasm', import.meta.url);
    }
    const imports = __wbg_get_imports();

    if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
        module_or_path = fetch(module_or_path);
    }

    const { instance, module } = await __wbg_load(await module_or_path, imports);

    return __wbg_finalize_init(instance, module);
}

export { initSync, __wbg_init as default };
