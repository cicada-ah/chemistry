<script>
    import ImageList, {
        Item,
        ImageAspectContainer,
        Image,
        Label,
    } from "@smui/image-list";
    import { selected } from "@/store/MenuBar.ts";
    import { drag } from "../../model/useDrag";
    import bottle from "@/assets/liquid/bottle.svg";
    import lamp from "@/assets/equipment/lamp.svg";
    import solid_d81e06 from "@/assets/solid/solid_d81e06.svg";
    import conical from "@/assets/equipment/conical-flask-empty.svg";
    import testTube from "@/assets/equipment/test-tube-empty.svg";
    import ironSupport from "@/assets/equipment/iron-support.svg";
    import { getChemicals } from "@/subjects/http/index";
    import { map } from "rxjs/operators";
    const physicalType = ["solid", "liquid", "gas"];
    let imageList = {
        mixture: [{ name: "air", svgName: bottle }],
        solidList: [],
        liquidList: [],
        gasList: [],
        equipment: [
            {
                name: "Alcohol lamp",
                svgName: lamp,
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
    getChemicals()
        .pipe(
            map((res) => {
                Object.keys(res).forEach((val) => {
                    res[val].forEach((item) => {
                        switch (val) {
                            case "solidList":
                                item.svgName = solid_d81e06;
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
                    use:drag={{ type: $selected === 'equipment' ? (item.formula === 'Alcohol lamp' ? 'burner' : 'container') : 'item', params: { src: item.svgName, name: item.formula, color: item.color, attribute: physicalType[item.physicalType] } }}>
                    <Image
                        class="image-list-standard-image"
                        src={item.svgName} />
                </div>
                <Label>{item.formula || item.name}</Label>
            </ImageAspectContainer>
        </Item>
    {/each}
</ImageList>
