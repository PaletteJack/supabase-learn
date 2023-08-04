<script>
    import { page } from '$app/stores'
</script>

<div class="w-full h-screen grid place-items-center">
    <div>
        <!-- <h1 class="text-3xl">{$page.status}</h1> -->
        <img src="https://http.cat/{$page.status}" alt="Status code">
        <p>{$page.error.message}</p>
        <a href="/home">Go home</a>
    </div>
</div>