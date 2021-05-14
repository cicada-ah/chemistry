<script>
    import ImageList, {
        Item,
        ImageAspectContainer,
        Image,
        Label,
    } from "@smui/image-list";
    import LinearProgress from "@smui/linear-progress";
    import { selected } from "@/store/MenuBar.ts";
    import { drag } from "../../model/useDrag";
    import bottle from "@/assets/liquid/bottle.svg";
    import lamp1 from "@/assets/equipment/lamp1.svg";
    import lamp2 from "@/assets/equipment/lamp2.svg";
    import solid from "@/assets/solid/solid.svg";
    import conical from "@/assets/equipment/conical-flask-empty.svg";
    import testTube from "@/assets/equipment/test-tube-empty.svg";
    import ironSupport from "@/assets/equipment/iron-support.svg";
    import { getChemicals } from "@/subjects/http/index";
    import { map } from "rxjs/operators";
    import { onMount } from "svelte";
    const physicalType = ["solid", "liquid", "gas"];
    let imageList = {
        mixture: [{ name: "air", svgName: bottle }],
        solidList: [],
        liquidList: [],
        gasList: [],
        equipment: [
            {
                name: "Alcohol lamp",
                svgName: lamp1,
                lampType: "normal",
            },
            {
                name: "High Alcohol lamp",
                svgName: lamp2,
                lampType: "high",
            },
            {
                name: "test tube",
                svgName: testTube,
            },
            {
                name: "iron support",
                svgName: ironSupport,
            },
            {
                name: "conical flask",
                svgName: conical,
            },
        ],
    };
    let progress;
    let imageRef;
    onMount(() => {
        const imageDOM = imageRef.getElement();
        progress = imageDOM.scrollLeft / imageDOM.scrollWidth;
    });

    getChemicals()
        .pipe(
            map((res) => {
                Object.keys(res).forEach((val) => {
                    res[val].forEach((item) => {
                        switch (val) {
                            case "solidList":
                                item.svgName = solid;
                                break;
                            case "liquidList":
                                item.svgName = bottle;
                            default:
                                item.svgName = bottle;
                                break;
                        }
                    });
                });
                return res;
            })
        )
        .subscribe((res) => {
            // console.log(res);
            imageList = {
                ...imageList,
                ...res,
            };
        });
    const handleScoll = (x) => {
        progress =
            (x.target.scrollLeft + x.target.clientWidth) / x.target.scrollWidth;
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
        margin: 15px;
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

<ImageList
    bind:this={imageRef}
    class="image-list-standard"
    on:scroll={handleScoll}>
    {#each imageList[$selected] as item, i}
        <Item>
            <ImageAspectContainer class="image-list-standard-item">
                <div
                    use:drag={{ type: $selected === 'equipment' ? (item.name === 'Alcohol lamp' || item.name === 'High Alcohol lamp' ? 'burner' : 'container') : 'item', params: { src: item.svgName, name: item.formula, color: item.color, attribute: physicalType[item.physicalType], lampType: item.lampType } }}>
                    <Image
                        class="image-list-standard-image"
                        src={item.svgName} />
                </div>
                <Label
                    style="color: {item.color};
                    font-size: 14px;
                font-weight: 900;">
                    {item.formula || item.name}
                </Label>
            </ImageAspectContainer>
        </Item>
    {/each}
</ImageList>
<LinearProgress {progress} />
