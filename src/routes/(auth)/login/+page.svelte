<script>
    import { toastStore } from "@skeletonlabs/skeleton";
    import { onMount } from "svelte";
    export let form

    onMount(() => {
        if (form?.error) {
            toastStore.trigger({message: form?.message, background: "variant-filled-error"})
        }
    })

</script>

<style lang="postcss">
    @media screen and (max-width: 400px) {
        #login-box { @apply px-7 }
    }

    #quote-box {
        background-image: url("pencils.jpg");
    }

    #quote-wrapper {
        background-color: rgba(255, 255, 255, 0.2);
        @apply rounded-lg
    }
</style>

<div class="grid lg:grid-cols-[1fr_2fr]">
    <div class="w-full h-screen lg:card lg:rounded-none shadow-lg">
        <div class="w-full px-4 py-4 flex gap-2 items-center">
            <img src="Cobalt Logo.svg" alt="¯\_(ツ)_/¯" class="w-12">
            <p class="text-4xl opacity-80">Cobalt Ed</p>
        </div>
        <hr class="opacity-50">
        <div id="login-box" class="w-full h-full flex flex-col items-center max-w-sm mx-auto">
            <div class="mt-20 mb-10 w-full">
                <p class="text-2xl">Welcome</p>
                <p class="text-sm mt-2">Sign in to continue</p>
            </div>
            <div class=" w-full">
                <form action="?/login" method="POST" class="flex flex-col gap-4">
                    <label class="label">
                        <span>Email</span>
                        <input class="input px-4 py-2" type="email" name="email" placeholder="my@email.com">
                    </label>
                    <label class="label">
                        <span>Password</span>
                        <input class="input px-4 py-2" type="password" name="password" placeholder="••••••••">
                    </label>
                    <button class="btn variant-filled-primary" type="submit">Sign In</button>
                </form>
            </div>
        </div>
    </div>
    <div id="quote-box" class="hidden lg:grid place-items-center w-full h-full">
        <div id="quote-wrapper" class="max-w-[40%] relative px-6 pt-4 pb-6">
            <p class="absolute -top-5 -left-5 text-9xl text-primary-900 opacity-40">"</p>
            <p class="text-3xl text-primary-50">I gave Cobalt a try today and I was positively impressed! This is such a great service I think I will leave my wife and kids just to spend more time using it.</p>
        </div>
    </div>
</div>