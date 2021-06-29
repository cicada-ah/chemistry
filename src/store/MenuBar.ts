import { writable } from "svelte/store";
import type Konva from "konva";
let selectedVal = "solidList";
export const selected = writable(selectedVal);

let layerInit = null;

export let layered = writable<null | Konva.Layer>(layerInit);

let toggleDrawer = false;

export let toggleDrawered = writable<Boolean>(toggleDrawer);
