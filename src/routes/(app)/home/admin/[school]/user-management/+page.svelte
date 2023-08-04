<script>
    import { TabGroup, Tab } from "@skeletonlabs/skeleton";
    import CreateUser from '$lib/forms/admin/user-mgmt/CreateUser.svelte';
    import BulkUserCreate from "$lib/forms/admin/user-mgmt/BulkUserCreate.svelte";
    import ManageUsers from "$lib/forms/admin/user-mgmt/ManageUsers.svelte"
    let tabSet = 0;
    export let data

    const { school, sb } = data;
    $: schoolUsers = data.schoolUsers
    // const teachers = schoolUsers.filter(user => user.role == "Teacher");

    async function handleDeletion(event) {
        const id = await event.detail
        const encodedData = new URLSearchParams({id: id}).toString();
        const myData = await fetch('?/deleteUser', {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: encodedData
        })

        console.log(myData);
    }
</script>

<TabGroup>
    <Tab bind:group={tabSet} name="create-user" value={0}>
        <span>Create User</span>
    </Tab>
    <Tab bind:group={tabSet} name="bulk-create" value={1}>
        <span>Bulk Create</span>
    </Tab>
    <Tab bind:group={tabSet} name="create-classroom" value={2}>
        <span>Manage Users</span>
    </Tab>
    <svelte:fragment slot="panel">
        {#if tabSet === 0}
        <CreateUser school={school.id}/>
        {:else if tabSet === 1}
        <BulkUserCreate />
        {:else if tabSet === 2}
        <ManageUsers users={schoolUsers} on:deleteUser={handleDeletion}/>
        {/if}
    </svelte:fragment>
</TabGroup>