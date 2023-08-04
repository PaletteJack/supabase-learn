<script>
    import { createEventDispatcher } from "svelte";
    import { modalStore } from "@skeletonlabs/skeleton";

    const dispatch = createEventDispatcher()

    function handleDeletion(id) {

        modalStore.trigger({
            type: 'confirm',
            title: 'Please Confirm',
            body: 'Are you sure you want to delete this this user? This action cannot be undone.',
            response: (r) => {
                if (r) dispatch('deleteUser', id)
            }
        })

    }
    export let users
</script>

{#if users}
    {#if users.length != 0}
        {#each users as user}
            <p>ID: {user.id}</p>
            <p>First Name: {user.first_name}</p>
            <p>Last Name: {user.last_name}</p>
            <p>Role: {user.role}</p>
            <button on:click={() => handleDeletion(user.id)}>Delete user?</button>
        {/each}
    {/if}
{/if}