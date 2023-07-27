<script>
    import { TabGroup, Tab } from "@skeletonlabs/skeleton";
    import CreateUser from '$lib/forms/admin/CreateUser.svelte';
    import BulkUserCreate from "$lib/forms/admin/BulkUserCreate.svelte";
    import CreateClassroom from "$lib/forms/admin/CreateClassroom.svelte";
    let tabSet = 0;
    export let data;

    const { schools, teachers } = data;
</script>


<div class="container px-10">
    <TabGroup>
        <Tab bind:group={tabSet} name="create-user" value={0}>
            <span>Create User</span>
        </Tab>
        <Tab bind:group={tabSet} name="bulk-create" value={1}>
            <span>Bulk Create</span>
        </Tab>
        <Tab bind:group={tabSet} name="create-classroom" value={2}>
            <span>Create Classroom</span>
        </Tab>
        <svelte:fragment slot="panel">
            {#if tabSet === 0}
            <CreateUser />
            {:else if tabSet === 1}
            <BulkUserCreate />
            {:else if tabSet === 2}
            <CreateClassroom {schools} {teachers} />
            {/if}
        </svelte:fragment>
    </TabGroup>    
</div>