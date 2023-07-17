<script>
    export let data;
    const { userData } = data;
</script>

<div class="flex flex-col gap-4">
    <div>
        <p>This is the dashboard page for <strong>{userData.first_name} {userData.last_name}</strong></p>
        <p>User id: <strong>{userData.id}</strong></p>
        <p>User role: <strong>{userData.role}</strong></p>
        <p>Is a site admin: <strong>{userData.site_admin}</strong></p>
    </div>
    <div class="w-full flex flex-row-reverse justify-between">
        {#if userData.site_admin}
        <a class="btn variant-filled-secondary" href="/dashboard/create-users">Create Users</a>
        {/if}
        <form action="/auth/logout" method="POST">
            <button class="btn variant-filled-warning" type="submit">Sign Out</button>
        </form>
    </div>
</div>