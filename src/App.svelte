<script lang="typescript">
    import Panel from "@/component/Panel.svelte";
    import ChemToolBal from "@/component/ChemToolbal/index.svelte";
</script>

<style lang="less">
    @import "./styles/index.less";
    #drag-items img {
        height: 100px;
    }
</style>

<main>
    <ChemToolBal />
    <Panel />
</main>
