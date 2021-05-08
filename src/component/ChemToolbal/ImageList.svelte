<script>
    import ImageList, {
        Item,
        ImageAspectContainer,
        Image,
        Label,
    } from "@smui/image-list";
    import { selected } from "@/store/MenuBar.ts";
    import { drag } from "../../model/useDrag"
    const handleDragstart = (e) => {
        e.dataTransfer.setData("text/plain", {
            type: ""
        });
    };
    const imageList = {
        mixture: [{ name: "air", svgName: "" }],
        solid: [
            {
                name: "Ca",
                color: "white",
                svgName: "solid",
            },
            {
                name: "Cu",
                color: "red",
                svgName: "solid",
            },
            {
                name: "CuCl2",
                color: "",
                svgName: "solid",
            },
            {
                name: "CsBr",
                color: "",
                svgName: "solid",
            },
            {
                name: "CsF",
                color: "",
                svgName: "solid",
            },
        ],
        liquid: [
            {
                name: "H2O",
                svgName: "bottle",
            },
            {
                name: "H2O2",
                svgName: "bottle",
            },
            {
                name: "NH4",
                svgName: "bottle",
            },
            {
                name: "HCL",
                svgName: "bottle",
            },
            {
                name: "H2SO4",
                svgName: "bottle",
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
                <div use:drag={{
                    type: $selected === 'equipment' ? 'container' : 'item',
                    params: {
                        src: `../src/assets/${item.svgName ? item.svgName : 'bottle'}.svg`,
                        name: item.name,
                        color: item.color,
                        attributes: $selected
                    }
                }}>
                    <Image
                        class="image-list-standard-image"
                        src="../src/assets/{item.svgName ? item.svgName : 'bottle'}.svg"
                    />
                </div>
                <Label>{item.name}</Label>
            </ImageAspectContainer>
        </Item>
    {/each}
</ImageList>
