<script>
    import { TabGroup, TabAnchor } from "@skeletonlabs/skeleton";
    import { page } from "$app/stores"
</script>

<TabGroup 
	justify="justify-center"
	active="variant-filled-primary"
	hover="hover:variant-soft-primary"
	flex="flex-1 lg:flex-none"
	rounded=""
	border=""
	class="bg-surface-100-800-token w-full"
>
<TabAnchor href="/dashboard" selected={$page.url.pathname === '/dashboard'}>
    <svelte:fragment slot="lead">📈</svelte:fragment>
    <span>Dashboard</span>
</TabAnchor>
<TabAnchor href="/dashboard/classes" selected={$page.url.pathname.includes('/dashboard/classes')}>
    <svelte:fragment slot="lead">🏫</svelte:fragment>
    <span>Classes</span>
</TabAnchor>
<TabAnchor href="/dashboard/create-users" selected={$page.url.pathname.includes('/dashboard/create-users')}>
    <svelte:fragment slot="lead">⚙️</svelte:fragment>
    <span>Admin</span>
</TabAnchor>
<TabAnchor href="/auth/logout">
    <svelte:fragment slot="lead">🪵</svelte:fragment>
    <span>Log out</span>
</TabAnchor>
	<!-- ... -->
</TabGroup>