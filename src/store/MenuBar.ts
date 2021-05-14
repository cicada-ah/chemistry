import { writable } from "svelte/store";
let selectedVal = "solidList";
export const selected = writable(selectedVal);
