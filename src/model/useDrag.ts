export function drag(node: HTMLElement, config: Config) {
    const dragHandle = (ev: DragEvent) => {
        const element = ev.target as HTMLElement;
        ev.dataTransfer.setData("text/plain", JSON.stringify({...config, offsetX: ev.offsetX / element.clientWidth, offsetY: ev.offsetY / element.clientHeight}))
    }
    node.addEventListener("dragstart", dragHandle)
    return {
        destroy() {
            node.removeEventListener("dragstart", dragHandle)
        },
        update(newConfig) {
            config = newConfig
        }
    }
}

export type Config = {
    type: "item" | "container" | "pipe" | "burner",
    params: any,
    offsetX?: number,
    offsetY?: number
}