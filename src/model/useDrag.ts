export function drag(node: HTMLElement, config: Config) {
    const dragHandle = (ev: DragEvent) => {
        ev.dataTransfer.setData("text/plain", JSON.stringify({...config, offsetX: ev.offsetX, offsetY: ev.offsetY}))
    }
    node.addEventListener("dragstart", dragHandle)
    return {
        destroy() {
            node.removeEventListener("dragstart", dragHandle)
        }
    }
}

export type Config = {
    type: "item" | "container" | "pipe" | "burner",
    params: any,
    offsetX?: number,
    offsetY?: number
}