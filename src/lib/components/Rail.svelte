<script>
    import { AppRail, AppRailAnchor } from "@skeletonlabs/skeleton";
    import { page } from "$app/stores"

</script>

<AppRail>
	<svelte:fragment slot="lead">
		<AppRailAnchor href="/dashboard" selected={$page.url.pathname === '/'}>👨‍💻</AppRailAnchor>
	</svelte:fragment>
	<!-- --- -->
	<AppRailAnchor href="/dashboard" title="Dashboard" selected={$page.url.pathname === '/dashboard'}>
		<svelte:fragment slot="lead">📈</svelte:fragment>
		<span>Dashboard</span>
	</AppRailAnchor>
	<AppRailAnchor href="/dashboard/classes" title="Classes" selected={$page.url.pathname.includes('/dashboard/classes')}>
		<svelte:fragment slot="lead">🏫</svelte:fragment>
		<span>Classes</span>
	</AppRailAnchor>
	<AppRailAnchor href="/dashboard/create-users" title="Admin" selected={$page.url.pathname.includes('/dashboard/create-users')}>
		<svelte:fragment slot="lead">⚙️</svelte:fragment>
		<span>Admin</span>
	</AppRailAnchor>
	<!-- --- -->
	<svelte:fragment slot="trail">
		<AppRailAnchor href="/auth/logout"  title="Logout">
			<svelte:fragment slot="lead">🪵</svelte:fragment>
			<span>Log Out</span>
		</AppRailAnchor>
	</svelte:fragment>
</AppRail>