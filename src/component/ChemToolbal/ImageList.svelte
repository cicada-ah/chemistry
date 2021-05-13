<script>
    import ImageList, {
        Item,
        ImageAspectContainer,
        Image,
        Label,
    } from "@smui/image-list";
    import { selected } from "@/store/MenuBar.ts";
    import { drag } from "../../model/useDrag";
    const handleDragstart = (e) => {
        e.dataTransfer.setData("text/plain", {
            type: "",
        });
    };
    const imageList = {
        mixture: [{ name: "air", svgName: "" }],
        solid: [
            {
                name: "Ca",
                color: "d81e06",
                svgName: "solid_d81e06",
            },
            {
                name: "Cu",
                color: "red",
                svgName: "solid_f4ea2a",
            },
            {
                name: "CuCl2",
                color: "",
                svgName: "solid_1afa29",
            },
            {
                name: "CsBr",
                color: "",
                svgName: "solid_ffffff",
            },
            {
                name: "CsF",
                color: "",
                svgName: "solid_cdcdcd",
            },
        ],
        liquid: [
            {
                name: "H2O",
                svgName: "bottle",
                color: "#00ffff",
            },
            {
                name: "NaOH",
                svgName: "bottle",
                color: "#00ffff",
            },
            {
                name: "HCl",
                svgName: "bottle",
                color: "#00ffff",
            },
            {
                name: "H2O2",
                svgName: "bottle",
                color: "#cccccc",
            },
            {
                name: "HCL",
                svgName: "bottle",
                color: "#cccccc",
            },
            {
                name: "H2SO4",
                svgName: "bottle",
                color: "#cccccc",
            },
        ],
        gas: [
            {
                name: "CO",
            },
            {
                name: "CO2",
            },
            {
                name: "CH4",
            },
            {
                name: "NH3",
                svgName: "bottle",
            },
        ],
        equipment: [
            {
                name: "Alcohol lamp",
                svgName: "lamp",
            },
            {
                name: "test tube",
                svgName: "test-tube-empty",
            },
            {
                name: "iron support",
                svgName: "iron-support",
            },
            {
                name: "conical flask",
                svgName: "conical-flask-empty",
            },
        ],
    };
</script>

<style lang="less" scoped="false">
    :global(.image-list-standard) {
        flex-wrap: nowrap;
        overflow: scroll;
    }
    :global(.image-list-standard::-webkit-scrollbar) {
        display: none;
    }

    :global(.image-list-standard-image) {
        width: 70px;
        height: 70px !important;
    }
    :global(.image-list-standard-item) {
        display: flex;
        justify-content: center;
        align-items: flex-end;
        margin: 5px 15px;
        width: 70px;
        height: 100px;
    }
    :global(.mdc-image-list__image-aspect-container) {
        padding: 0;
    }
    :global(.mdc-image-list__label) {
        display: block;
        padding-top: 5px;
        color: #fff;
        font-size: 9px;
    }
</style>

<ImageList class="image-list-standard">
    {#each imageList[$selected] as item, i}
        <Item>
            <ImageAspectContainer class="image-list-standard-item">
                <div
                    use:drag={{ type: $selected === 'equipment' ? (item.name === 'Alcohol lamp' ? 'burner' : 'container') : 'item', params: { src: `../src/assets/${$selected}/${item.svgName ? item.svgName : 'bottle'}.svg`, name: item.name, color: item.color, attribute: $selected } }}>
                    <Image
                        class="image-list-standard-image"
                        src={`../src/assets/${$selected}/${item.svgName ? item.svgName : 'bottle'}.svg`} />
                </div>
                <Label>{item.name}</Label>
            </ImageAspectContainer>
        </Item>
    {/each}
</ImageList>
