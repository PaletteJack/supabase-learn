<script>
    export let data;
    const { userData } = data;
</script>

<div class="flex flex-col gap-4">
    <div>
        <p>This is the home page for <strong>{userData.first_name} {userData.last_name}</strong></p>
        <p>User id: <strong>{userData.id}</strong></p>
        <p>User role: <strong>{userData.role}</strong></p>
        <p>Is a site admin: <strong>{userData.site_admin}</strong></p>
    </div>
</div>