<script>
    import { AppShell } from '@skeletonlabs/skeleton';
    import Rail from '$lib/components/Rail.svelte';
    import MobileRail from '$lib/components/MobileRail.svelte';
    export let data;

</script>

<AppShell 
slotSidebarLeft="w-0 lg:w-fit" 
slotPageHeader="bg-transparent"
slotFooter="h-fit lg:h-0">
	<svelte:fragment slot="sidebarLeft">
        <Rail userData={data.userData} />
  	</svelte:fragment>
	<svelte:fragment slot="pageHeader">
    </svelte:fragment>
	<!-- Router Slot -->
    <div class="w-full h-full overflow-hidden">
        <slot />
    </div>
	<!-- ---- / ---- -->
    <svelte:fragment slot="footer">
        <MobileRail userData={data.userData} />
    </svelte:fragment>
</AppShell>