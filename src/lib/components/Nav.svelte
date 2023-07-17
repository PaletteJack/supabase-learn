<script>
    import { drawerStore } from '@skeletonlabs/skeleton';
    export let isAdmin;

    const drawerClose = () => drawerStore.close()

</script>

<nav class="list-nav">
    <div class="flex justify-center py-4">
        <h1 class="text-4xl font-semibold">Classroom</h1>
    </div>
    <ul>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        <li on:click={drawerClose}>
            <a href="/dashboard">
                <span class="badge bg-primary-500">💀</span>
                <span class="flex-auto">Home</span>
            </a>
        </li>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        <li on:click={drawerClose}>
            <a href="/dashboard/classes">
                <span class="badge bg-primary-500">🏫</span>
                <span class="flex-auto">Classes</span>
            </a>
        </li>
        {#if isAdmin}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
            <li on:click={drawerClose}>
                <a href="/dashboard/create-users">
                    <span class="badge bg-primary-500">➕</span>
                    <span class="flex-auto">Create users</span>
                </a>
            </li>
        {/if}
        <li>
            <form action="/auth/logout" method="POST">
                <button class="btn w-full text-left">
                    <span class="badge bg-primary-500">🪵</span>
                    <span class="flex-auto">Logout</span>
                </button>
            </form>
        </li>
    </ul>
</nav>