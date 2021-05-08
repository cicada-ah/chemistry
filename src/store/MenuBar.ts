import { writable } from "svelte/store";
let selectedVal = "mixture";
export const selected = writable(selectedVal);
