<script>
    import { TabGroup, Tab } from "@skeletonlabs/skeleton";
    import CreateUser from '$lib/forms/admin/user-mgmt/CreateUser.svelte';
    import BulkUserCreate from "$lib/forms/admin/user-mgmt/BulkUserCreate.svelte";
    import ManageUsers from "$lib/forms/admin/user-mgmt/ManageUsers.svelte"
    import { toastStore } from "@skeletonlabs/skeleton";
    import { invalidateAll } from "$app/navigation"
    let tabSet = 0;
    export let data

    const { school, sb } = data;
    $: schoolUsers = data.schoolUsers
    // const teachers = schoolUsers.filter(user => user.role == "Teacher");

    async function handleDeletion(event) {
        const ids = await event.detail

        const { error } = await sb
        .rpc('delete_users', {
            user_ids: ids
        })

        if (!error) {
            invalidateAll();
            return toastStore.trigger({message: "User(s) deleted", background: "variant-filled-success"});
        }

        console.error(error);
        return toastStore.trigger({message: `Could not delete users: ${error.message}`, background: "variant-filled-error"});
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
        <BulkUserCreate school={school.id}/>
        {:else if tabSet === 2}
        <ManageUsers users={schoolUsers} on:deleteUser={handleDeletion}/>
        {/if}
    </svelte:fragment>
</TabGroup>