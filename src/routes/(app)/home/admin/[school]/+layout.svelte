<script>
    import AdminNav from "$lib/components/AdminNav.svelte";
    export let data;
    const { school } = data
</script>

<div class="w-full h-full lg:grid lg:grid-cols-[300px_1fr]">
    <AdminNav school={school} />
    <div class="px-8 py-4">
        <slot />
    </div>
</div>