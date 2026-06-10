/* @ts-self-types="./inindo_recruit_runtime.d.ts" */

/**
 * The scheduling simulator: a retained (state, world, rng) triple that
 * steps one story-beat pass at a time and reports per-ally predictions.
 */
export class SchedulingSim {
    static __wrap(ptr) {
        const obj = Object.create(SchedulingSim.prototype);
        obj.__wbg_ptr = ptr;
        SchedulingSimFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        SchedulingSimFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_schedulingsim_free(ptr, 0);
    }
    /**
     * Build a sim from a (full or pass-input-trimmed) `$7E` WRAM image,
     * a hero level (the real `fn_BC9C` recruit-idle input), and an LCG
     * seed (the RNG word at pass start).
     * @param {Uint8Array} image
     * @param {number} hero_level
     * @param {number} seed
     * @returns {SchedulingSim}
     */
    static fromWramImage(image, hero_level, seed) {
        const ptr0 = passArray8ToWasm0(image, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.schedulingsim_fromWramImage(ptr0, len0, hero_level, seed);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return SchedulingSim.__wrap(ret[0]);
    }
    /**
     * @returns {number}
     */
    rngState() {
        const ret = wasm.schedulingsim_rngState(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {string}
     */
    snapshotJson() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.schedulingsim_snapshotJson(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @returns {string}
     */
    stepJson() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.schedulingsim_stepJson(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}
if (Symbol.dispose) SchedulingSim.prototype[Symbol.dispose] = SchedulingSim.prototype.free;

/**
 * Talk-recruit session behind a flat JS boundary.
 *
 * Phase codes: 0 awaiting-meet, 1 awaiting-willingness,
 * 2 awaiting-recruit-attempt, 3 joined, 4 refused-unwilling,
 * 5 refused-party-full, 6 refused-not-idle, 7 refused-trust-gate.
 */
export class WasmTalkRecruit {
    static __wrap(ptr) {
        const obj = Object.create(WasmTalkRecruit.prototype);
        obj.__wbg_ptr = ptr;
        WasmTalkRecruitFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        WasmTalkRecruitFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_wasmtalkrecruit_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    attemptRecruit() {
        const ret = wasm.wasmtalkrecruit_attemptRecruit(this.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0];
    }
    /**
     * @returns {number}
     */
    candidateTrust() {
        const ret = wasm.wasmtalkrecruit_candidateTrust(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {Uint8Array} bytes
     * @param {number} candidate_status_index
     * @returns {WasmTalkRecruit}
     */
    static fromStateBytes(bytes, candidate_status_index) {
        const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.wasmtalkrecruit_fromStateBytes(ptr0, len0, candidate_status_index);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return WasmTalkRecruit.__wrap(ret[0]);
    }
    /**
     * @returns {number}
     */
    meet() {
        const ret = wasm.wasmtalkrecruit_meet(this.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0];
    }
    /**
     * @returns {number}
     */
    partySize() {
        const ret = wasm.wasmtalkrecruit_partySize(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    phaseCode() {
        const ret = wasm.wasmtalkrecruit_phaseCode(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {boolean}
     */
    resolveWillingness() {
        const ret = wasm.wasmtalkrecruit_resolveWillingness(this.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] !== 0;
    }
    /**
     * @returns {Uint8Array}
     */
    stateBytes() {
        const ret = wasm.wasmtalkrecruit_stateBytes(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
}
if (Symbol.dispose) WasmTalkRecruit.prototype[Symbol.dispose] = WasmTalkRecruit.prototype.free;
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
        "./inindo_recruit_runtime_bg.js": import0,
    };
}

const SchedulingSimFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_schedulingsim_free(ptr, 1));
const WasmTalkRecruitFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_wasmtalkrecruit_free(ptr, 1));

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
        module_or_path = new URL('inindo_recruit_runtime_bg.wasm', import.meta.url);
    }
    const imports = __wbg_get_imports();

    if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
        module_or_path = fetch(module_or_path);
    }

    const { instance, module } = await __wbg_load(await module_or_path, imports);

    return __wbg_finalize_init(instance, module);
}

export { initSync, __wbg_init as default };
