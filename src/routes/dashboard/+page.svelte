<script>
    export let data;
</script>

<div class="flex flex-col gap-4">
    <p>This is the dashboard page {data.session.user.email}</p>
    <div class="w-full flex flex-row-reverse justify-between">
        <a class="btn variant-filled-secondary" href="/dashboard/create-users">Create Users</a>
        <form action="/logout" method="POST">
            <button class="btn variant-filled-warning" type="submit">Sign Out</button>
        </form>
    </div>
</div>