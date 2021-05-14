import { writable } from "svelte/store";
let selectedVal = "liquidList";
export const selected = writable(selectedVal);
