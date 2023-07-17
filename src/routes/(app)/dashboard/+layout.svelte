<script>
    import { AppShell, Drawer, drawerStore } from '@skeletonlabs/skeleton';
    import Nav from '$lib/components/Nav.svelte';
    import Menu from '$lib/svgs/Menu.svelte';

    const drawerOpen = () => drawerStore.open()

</script>

<Drawer width="w-6/12">
    <Nav />
</Drawer>

<AppShell slotSidebarLeft="transition-all ease-in-out w-0 lg:w-72 shadow-lg h-screen" slotPageHeader="bg-transparent">
	<svelte:fragment slot="sidebarLeft">
        <Nav />
  	</svelte:fragment>
	<svelte:fragment slot="pageHeader">
		<button class="btn btn-icon md:hidden" on:click={drawerOpen}>
			<Menu />
		</button>
  </svelte:fragment>
	<!-- Router Slot -->
    <div class="w-full h-screen overflow-hidden p-4">
        <slot />
    </div>
	<!-- ---- / ---- -->
</AppShell>