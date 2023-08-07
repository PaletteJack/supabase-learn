<script>
    import { TabGroup, Tab } from "@skeletonlabs/skeleton";
    import CreateClassroom from "$lib/forms/admin/school-mgmt/CreateClassroom.svelte";
    import ManageClasses from "$lib/forms/admin/school-mgmt/ManageClasses.svelte";
    let tabSet = 0;
    export let data

    const { school, teachers, classes } = data;
</script>

<TabGroup>
    <Tab bind:group={tabSet} name="create-classroom" value={0}>
        <span>Create Classroom</span>
    </Tab>
    <Tab bind:group={tabSet} name="manage-classes" value={1}>
        <span>Manage classes</span>
    </Tab>
    <svelte:fragment slot="panel">
        {#if tabSet === 0}
        <CreateClassroom school={school.id} teachers={teachers} />
        {:else if tabSet == 1}
        <ManageClasses school={school.id} classes={classes}/>
        {/if}
    </svelte:fragment>
</TabGroup>