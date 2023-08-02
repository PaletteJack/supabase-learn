<script>
    import { TabGroup, Tab } from "@skeletonlabs/skeleton";
    import CreateUser from '$lib/forms/admin/CreateUser.svelte';
    import BulkUserCreate from "$lib/forms/admin/BulkUserCreate.svelte";
    import CreateClassroom from "$lib/forms/admin/CreateClassroom.svelte";
    import ManageUsers from "$lib/forms/admin/ManageUsers.svelte"
    let tabSet = 0;
    export let data

    const { school, schoolUsers } = data;
    const teachers = schoolUsers.filter(user => user.role == "Teacher");
</script>

<h2 class="h2">{school.name}</h2>
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
    <Tab bind:group={tabSet} name="create-classroom" value={3}>
        <span>Manage Users</span>
    </Tab>
    <svelte:fragment slot="panel">
        {#if tabSet === 0}
        <CreateUser />
        {:else if tabSet === 1}
        <BulkUserCreate />
        {:else if tabSet === 2}
        <CreateClassroom school={school.id} teachers={teachers} />
        {:else if tabSet === 3}
        <ManageUsers users={schoolUsers} />
        {/if}
    </svelte:fragment>
</TabGroup>