import { writable } from "svelte/store";
let selectedVal = "Mixture";
export const selected = writable(selectedVal);
