/* tslint:disable */
/* eslint-disable */

/**
 * The scheduling simulator: a retained (state, world, rng) triple that
 * steps one story-beat pass at a time and reports per-ally predictions.
 */
export class SchedulingSim {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Build a sim from a (full or pass-input-trimmed) `$7E` WRAM image,
     * a hero level (the real `fn_BC9C` recruit-idle input), and an LCG
     * seed (the RNG word at pass start).
     */
    static fromWramImage(image: Uint8Array, hero_level: number, seed: number): SchedulingSim;
    rngState(): number;
    snapshotJson(): string;
    stepJson(): string;
}

/**
 * Talk-recruit session behind a flat JS boundary.
 *
 * Phase codes: 0 awaiting-meet, 1 awaiting-willingness,
 * 2 awaiting-recruit-attempt, 3 joined, 4 refused-unwilling,
 * 5 refused-party-full, 6 refused-not-idle, 7 refused-trust-gate.
 */
export class WasmTalkRecruit {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    attemptRecruit(): number;
    candidateTrust(): number;
    static fromStateBytes(bytes: Uint8Array, candidate_status_index: number): WasmTalkRecruit;
    meet(): number;
    partySize(): number;
    phaseCode(): number;
    resolveWillingness(): boolean;
    stateBytes(): Uint8Array;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly __wbg_schedulingsim_free: (a: number, b: number) => void;
    readonly __wbg_wasmtalkrecruit_free: (a: number, b: number) => void;
    readonly schedulingsim_fromWramImage: (a: number, b: number, c: number, d: number) => [number, number, number];
    readonly schedulingsim_rngState: (a: number) => number;
    readonly schedulingsim_snapshotJson: (a: number) => [number, number];
    readonly schedulingsim_stepJson: (a: number) => [number, number];
    readonly wasmtalkrecruit_attemptRecruit: (a: number) => [number, number, number];
    readonly wasmtalkrecruit_candidateTrust: (a: number) => number;
    readonly wasmtalkrecruit_fromStateBytes: (a: number, b: number, c: number) => [number, number, number];
    readonly wasmtalkrecruit_meet: (a: number) => [number, number, number];
    readonly wasmtalkrecruit_partySize: (a: number) => number;
    readonly wasmtalkrecruit_phaseCode: (a: number) => number;
    readonly wasmtalkrecruit_resolveWillingness: (a: number) => [number, number, number];
    readonly wasmtalkrecruit_stateBytes: (a: number) => [number, number];
    readonly __wbindgen_externrefs: WebAssembly.Table;
    readonly __wbindgen_malloc: (a: number, b: number) => number;
    readonly __externref_table_dealloc: (a: number) => void;
    readonly __wbindgen_free: (a: number, b: number, c: number) => void;
    readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;

/**
 * Instantiates the given `module`, which can either be bytes or
 * a precompiled `WebAssembly.Module`.
 *
 * @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
 *
 * @returns {InitOutput}
 */
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
 * If `module_or_path` is {RequestInfo} or {URL}, makes a request and
 * for everything else, calls `WebAssembly.instantiate` directly.
 *
 * @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
 *
 * @returns {Promise<InitOutput>}
 */
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
