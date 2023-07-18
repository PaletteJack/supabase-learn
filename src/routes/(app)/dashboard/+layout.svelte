<script>
    import { AppShell } from '@skeletonlabs/skeleton';
    import Rail from '$lib/components/Rail.svelte';
    import MobileRail from '$lib/components/MobileRail.svelte';


</script>

<AppShell 
slotSidebarLeft="w-0 lg:w-fit" 
slotPageHeader="bg-transparent"
slotFooter="h-fit lg:h-0">
	<svelte:fragment slot="sidebarLeft">
        <Rail />
  	</svelte:fragment>
	<svelte:fragment slot="pageHeader">
    </svelte:fragment>
	<!-- Router Slot -->
    <div class="w-full h-full overflow-hidden p-4">
        <slot />
    </div>
	<!-- ---- / ---- -->
    <svelte:fragment slot="footer">
        <MobileRail />
    </svelte:fragment>
</AppShell>