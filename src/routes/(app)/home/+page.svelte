<script>
    import ToDo from '$lib/components/ToDo.svelte';
    import Carousel from '$lib/components/Carousel.svelte';
    import { getToastStore } from '@skeletonlabs/skeleton';
    const toastStore = getToastStore();
    export let data;
    const { userData, sb, announcements } = data;
    $: todos = data.todos

    async function handleComplete(event) {
        const newData = event.detail

        const { error } = await sb
        .from('todos')
        .update({is_completed: newData.is_completed})
        .eq('id', newData.id)

        if (!error) {
            return
        }

        console.error('Could not update todo, ', error);
        toastStore.trigger({message: `There was a problem updating the todo! ${error.message}`, background: "variant-filled-error"})
        return
    }
</script>

<div class="flex flex-col gap-4 p-4">
    {#if announcements}
    <div>
        <h2 class="h2">Announcements 📢</h2>
        {#if announcements.length != 0}
            <Carousel {announcements} />
        {:else}
            <p>No announcements to show 😭</p>
        {/if}
    </div>
    {/if}
    <div>
        <h2 class="h2">User Info ℹ️</h2>
        <p>This is the home page for <strong>{userData.first_name} {userData.last_name}</strong></p>
        <p>User id: <strong>{userData.id}</strong></p>
        <p>User role: <strong>{userData.role}</strong></p>
        <p>Is a site admin: <strong>{userData.site_admin}</strong></p>
        <p>School: <strong>{userData.school.name}</strong></p>
    </div>
    <div>
        <h2 class="h2">To-dos 📃</h2>
        <ToDo {todos} on:complete={handleComplete}/>
    </div>
</div>