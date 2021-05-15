<script lang="typescript">
    import Panel from "@/component/Panel.svelte";
    import ChemToolBal from "@/component/ChemToolbal/index.svelte";
    import Drawer, {
        AppContent,
        Content,
        Header,
        Title,
        Subtitle,
    } from "@smui/drawer";
    import Textfield from "@smui/textfield";
    import HelperText from "@smui/textfield/helper-text/index";
    import { toggleDrawered } from "@/store/MenuBar.ts";
    import Select, { Option } from "@smui/select";
    import Button, { Label, Icon } from "@smui/button";
    import LinearProgress from "@smui/linear-progress";
    import { postChemicalReact } from "./subjects/http";
    import DataTable, { Head, Body, Row, Cell } from "@smui/data-table";
    import { delay } from "rxjs/operators";

    let open: Boolean = false;
    let formula1 = null;
    let formula2 = null;
    let formula3 = null;
    let loaded: Boolean = true;
    let loadedDelay: Boolean = true;
    let condType = "常温";
    let fruits = ["常温", "高温", "加热", "电解", "催化剂", "点燃"];

    toggleDrawered.subscribe((val) => {
        open = val;
    });
    let items = [];

    const handleReaction = () => {
        const reactors = [];
        if (formula1) {
            reactors.push(formula1);
        }
        if (formula2) {
            reactors.push(formula2);
        }
        if (formula3) {
            reactors.push(formula3);
        }
        loaded = false;
        loadedDelay = false;
        setTimeout(() => {
            loadedDelay = true;
        }, 3000);
        postChemicalReact({
            reactors: reactors,
            condType: fruits.indexOf(condType),
        })
            .pipe(delay(2000))
            .subscribe((res) => {
                loaded = true;
                if (res.description && res.reactResp.length) {
                    const description = res["description"];
                    const resItems = [];
                    res.reactResp.forEach((item) => {
                        resItems.push({
                            description,
                            ...item,
                        });
                    });
                    items = resItems;
                }
            });
    };
</script>

<style lang="less">
    @import "./styles/index.less";
    /* These classes are only needed because the
      drawer is in a container on the page. */
    .drawer-container {
        position: relative;
        display: flex;
        // border: 1px solid
        //     var(--mdc-theme-text-hint-on-background, rgba(0, 0, 0, 0.1));
        overflow: hidden;
        z-index: 0;
        :global(.drawer-container-sider) {
            width: 60vw;
            padding: 0 16px 4px;
            z-index: 99999;
        }
        :global(.mdc-text-field) {
            width: 100%;
        }
        * :global(.app-content) {
            flex: auto;
            overflow: auto;
            position: relative;
            flex-grow: 1;
        }

        .main-content {
            overflow: auto;
            height: 100%;
            box-sizing: border-box;
        }
    }
</style>

<div class="drawer-container">
    <Drawer variant="dismissible" bind:open class="drawer-container-sider">
        <Header>
            <Title>化学反应方程式</Title>
            <Subtitle>填写反应物推理反应结果...</Subtitle>
        </Header>
        <Content>
            <LinearProgress
                indeterminate
                bind:closed={loadedDelay}
                aria-label="Data is being loaded..." />
            <Textfield bind:value={formula1} label="formula1">
                <HelperText slot="helper">reactant formula eg: H2O</HelperText>
            </Textfield>
            <Textfield bind:value={formula2} label="formula2">
                <HelperText slot="helper">reactant formula eg: H2O</HelperText>
            </Textfield>
            <Textfield bind:value={formula3} label="formula3">
                <HelperText slot="helper">reactant formula eg: H2O</HelperText>
            </Textfield>
            <Select bind:value={condType} label="condtion type">
                {#each fruits as fruit}
                    <Option value={fruit}>{fruit}</Option>
                {/each}
            </Select>
            <div style=" margin-top: 30px; margin-bottom:30px">
                <Button variant="unelevated" on:click={handleReaction}>
                    <Label>reaction</Label>
                </Button>
            </div>
            <DataTable table$aria-label="User list" style="width: 100%;">
                <Head>
                    <Row>
                        <Cell>Description</Cell>
                        <Cell>Expression</Cell>
                        <Cell>RuleDesc</Cell>
                    </Row>
                </Head>
                <Body>
                    {#each items as item}
                        {#if item}
                            <Row>
                                <Cell>{item.description}</Cell>
                                <Cell>{item.expression}</Cell>
                                <Cell>{item.ruleDesc}</Cell>
                            </Row>
                        {/if}
                    {/each}
                </Body>

                <LinearProgress
                    indeterminate
                    bind:closed={loaded}
                    aria-label="Data is being loaded..."
                    slot="progress" />
            </DataTable>
        </Content>
    </Drawer>

    <AppContent class="app-content">
        <main class="main-content">
            <ChemToolBal />
            <Panel />
        </main>
    </AppContent>
</div>
