/* tslint:disable */
/* eslint-disable */

/**
 * Playable-round boundary (ticket inindo-ks4yrb.1): wraps RoundSession with
 * flat JS-friendly buffers. Tap report layout (11 bytes):
 * [kind 0=call/1=special, latched_c9c1, number, cell(0xFF none), c9c2, c9c3,
 *  line_completed, pacing_profile, raw_c420, feedback_lo, feedback_hi].
 * Resolve report (6 bytes): [paid, amount_lo, amount_hi, chips_lo, chips_hi,
 *  replay_prompted].
 */
export class WasmBingoRound {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    advanceSpinner(): number;
    applySelection(cell: number): Uint8Array;
    boardNumbers(): Uint8Array;
    buyChips(quantity: number): Uint8Array;
    c421(): number;
    chips(): number;
    daubsRemaining(): number;
    static fromStateBytes(bytes: Uint8Array, c421: number): WasmBingoRound;
    gold(): number;
    marks(): Uint8Array;
    pendingSelections(): number;
    phaseCode(): number;
    rearm(): void;
    resolveRound(): Uint8Array;
    spinner(): number;
    startRound(wager: number): boolean;
    stateBytes(): Uint8Array;
    tap(): Uint8Array;
    wager(): number;
}

export class WasmBingoRuntime {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    entryTextPointer(): number;
    static fromStateBytes(bytes: Uint8Array): WasmBingoRuntime;
    quoteChipPurchaseCode(quantity_result: number): number;
    selectedChips(): number;
    stateBytes(): Uint8Array;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly __wbg_wasmbingoround_free: (a: number, b: number) => void;
    readonly __wbg_wasmbingoruntime_free: (a: number, b: number) => void;
    readonly wasmbingoround_advanceSpinner: (a: number) => number;
    readonly wasmbingoround_applySelection: (a: number, b: number) => [number, number, number, number];
    readonly wasmbingoround_boardNumbers: (a: number) => [number, number];
    readonly wasmbingoround_buyChips: (a: number, b: number) => [number, number];
    readonly wasmbingoround_c421: (a: number) => number;
    readonly wasmbingoround_chips: (a: number) => number;
    readonly wasmbingoround_daubsRemaining: (a: number) => number;
    readonly wasmbingoround_fromStateBytes: (a: number, b: number, c: number) => [number, number, number];
    readonly wasmbingoround_gold: (a: number) => number;
    readonly wasmbingoround_marks: (a: number) => [number, number];
    readonly wasmbingoround_pendingSelections: (a: number) => number;
    readonly wasmbingoround_phaseCode: (a: number) => number;
    readonly wasmbingoround_rearm: (a: number) => [number, number];
    readonly wasmbingoround_resolveRound: (a: number) => [number, number, number, number];
    readonly wasmbingoround_spinner: (a: number) => number;
    readonly wasmbingoround_startRound: (a: number, b: number) => [number, number, number];
    readonly wasmbingoround_stateBytes: (a: number) => [number, number];
    readonly wasmbingoround_tap: (a: number) => [number, number, number, number];
    readonly wasmbingoround_wager: (a: number) => number;
    readonly wasmbingoruntime_entryTextPointer: (a: number) => number;
    readonly wasmbingoruntime_fromStateBytes: (a: number, b: number) => [number, number, number];
    readonly wasmbingoruntime_quoteChipPurchaseCode: (a: number, b: number) => number;
    readonly wasmbingoruntime_stateBytes: (a: number) => [number, number];
    readonly wasmbingoruntime_selectedChips: (a: number) => number;
    readonly __wbindgen_externrefs: WebAssembly.Table;
    readonly __externref_table_dealloc: (a: number) => void;
    readonly __wbindgen_free: (a: number, b: number, c: number) => void;
    readonly __wbindgen_malloc: (a: number, b: number) => number;
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
