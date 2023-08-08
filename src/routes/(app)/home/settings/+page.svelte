<script>
    import { LightSwitch } from "@skeletonlabs/skeleton";
    import { modeCurrent } from "@skeletonlabs/skeleton";
    export let data;

    const { userData } = data;
</script>

<div class="p-4">
    <h2 class="h2">User settings page 🥳</h2>
    <hr class="opacity-50 mb-4">
    <div class="flex flex-col gap-2">
        <div>
            <p class="text-xl">Display Name</p>
            <p>{userData.first_name} {userData.last_name}</p>
        </div>
        <div>
            <p class="text-xl">Role</p>
            <p>{userData.role}</p>
        </div>
        <div>
            <p class="text-xl">User ID</p>
            <p>{userData.id}</p>
        </div>
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label class="label">
            <span>{$modeCurrent ? 'Dark' : 'Light'} mode?</span>
            <LightSwitch />
        </label>
    </div>

</div>