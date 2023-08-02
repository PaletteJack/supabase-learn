<script>
    export let users
</script>

{#if users}
    {#if users.length != 0}
        {#each users as user}
            <p>ID: {user.id}</p>
            <p>First Name: {user.first_name}</p>
            <p>Last Name: {user.last_name}</p>
            <p>Role: {user.role}</p>
        {/each}
    {/if}
{/if}