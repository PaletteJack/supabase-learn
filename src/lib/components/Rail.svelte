<script>
    import { AppRail, AppRailAnchor } from "@skeletonlabs/skeleton";
	import Home from "../svgs/Home.svelte";
	import Logout from "../svgs/Logout.svelte";
	import Gear from "../svgs/Gear.svelte";
	import School from "../svgs/School.svelte";
    import { page } from "$app/stores"

</script>

<AppRail>
	<svelte:fragment slot="lead">
		<AppRailAnchor href="/home" selected={$page.url.pathname === '/'}>👨‍💻</AppRailAnchor>
	</svelte:fragment>
	<!-- --- -->
	<AppRailAnchor href="/home" title="home" selected={$page.url.pathname === '/home'}>
		<svelte:fragment slot="lead"><Home /></svelte:fragment>
		<span>Home</span>
	</AppRailAnchor>
	<AppRailAnchor href="/home/classes" title="Classes" selected={$page.url.pathname.includes('/home/classes')}>
		<svelte:fragment slot="lead"><School /></svelte:fragment>
		<span>Classes</span>
	</AppRailAnchor>
	<AppRailAnchor href="/home/create-users" title="Admin" selected={$page.url.pathname.includes('/home/create-users')}>
		<svelte:fragment slot="lead"><Gear /></svelte:fragment>
		<span>Admin</span>
	</AppRailAnchor>
	<!-- --- -->
	<svelte:fragment slot="trail">
		<AppRailAnchor href="/auth/logout"  title="Logout">
			<svelte:fragment slot="lead"><Logout /></svelte:fragment>
			<span>Log Out</span>
		</AppRailAnchor>
	</svelte:fragment>
</AppRail>