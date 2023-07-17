<script>
    import { enhance } from "$app/forms"

</script>

<div class="w-full h-screen grid place-items-center bg-transparent">
    <div class="flex flex-col gap-4">
        <p class="text-2xl">Sign In</p>
        <form action="?/login" method="POST" class="flex flex-col gap-4" use:enhance>
                <input class="input p-2" type="email" name="email" placeholder="email">
                <input class="input p-2" type="password" name="password" placeholder="password">
            <button class="btn variant-filled-primary" type="submit">Login</button>
        </form>
    </div>
</div>