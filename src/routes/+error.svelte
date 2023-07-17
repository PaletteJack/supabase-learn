<script>
    import { page } from '$app/stores'
</script>

<div class="w-full h-screen grid place-items-center">
    <div>
        <h1 class="text-3xl">{$page.status}</h1>
        <p>{$page.error.message}</p>
        <a href="/dashboard">Go home</a>
    </div>
</div>