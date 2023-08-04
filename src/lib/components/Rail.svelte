<script>
    import { AppRail, AppRailAnchor } from "@skeletonlabs/skeleton";
	import Home from "../svgs/Home.svelte";
	import Logout from "../svgs/Logout.svelte";
	import Gear from "../svgs/Gear.svelte";
	import AcademicCap from "../svgs/AcademicCap.svelte";
	import Wrench from "../svgs/Wrench.svelte";
    import { page } from "$app/stores"
	export let userData;

</script>

<AppRail>
	<!-- <svelte:fragment slot="lead">
		<AppRailAnchor href="/home" selected={$page.url.pathname === '/'}>
			<div class="w-full h-full grid place-items-center">
				<img src="Cobalt Logo.svg" alt="cobalt-ed" width="50" height="50" /> 
			</div>
		</AppRailAnchor>
	</svelte:fragment> -->
	<!-- --- -->
	<AppRailAnchor href="/home" title="home" selected={$page.url.pathname === '/home'}>
		<svelte:fragment slot="lead"><Home /></svelte:fragment>
		<span>Home</span>
	</AppRailAnchor>
	<AppRailAnchor href="/home/classes" title="Classes" selected={$page.url.pathname.includes('/home/classes')}>
		<svelte:fragment slot="lead"><AcademicCap /></svelte:fragment>
		<span>Classes</span>
	</AppRailAnchor>
	<AppRailAnchor href="/home/settings" title="Admin" selected={$page.url.pathname.includes('/home/settings')}>
		<svelte:fragment slot="lead"><Gear /></svelte:fragment>
		<span>Settings</span>
	</AppRailAnchor>
	{#if userData.role === 'Admin'}
	<AppRailAnchor href="/home/admin" title="Admin" selected={$page.url.pathname.includes('/home/admin')}>
		<svelte:fragment slot="lead"><Wrench /></svelte:fragment>
		<span>Admin</span>
	</AppRailAnchor>
	{/if}
	<!-- --- -->
	<svelte:fragment slot="trail">
		<AppRailAnchor href="/auth/logout"  title="Logout">
			<svelte:fragment slot="lead"><Logout /></svelte:fragment>
			<span>Log Out</span>
		</AppRailAnchor>
	</svelte:fragment>
</AppRail>