<script>
    import { TabGroup, TabAnchor } from "@skeletonlabs/skeleton";
    import { page } from "$app/stores"
    import Home from "../svgs/Home.svelte";
	import Logout from "../svgs/Logout.svelte";
	import Gear from "../svgs/Gear.svelte";
	import School from "../svgs/School.svelte";
    const anchorStyles = "w-full flex flex-col items-center justify-center gap-2"

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
<TabAnchor href="/home" selected={$page.url.pathname === '/home'}>
    <div class={anchorStyles}>
        <Home />
        <span>Home</span>
    </div>
</TabAnchor>
<TabAnchor href="/home/classes" selected={$page.url.pathname.includes('/home/classes')}>
    <div class={anchorStyles}>
        <School />
        <span>Classes</span>
    </div>
</TabAnchor>
<TabAnchor href="/home/create-users" selected={$page.url.pathname.includes('/home/create-users')}>
    <div class={anchorStyles}>
        <Gear />
        <span>Admin</span>
    </div>
</TabAnchor>
<TabAnchor href="/auth/logout">
    <div class={anchorStyles}>
        <Logout />
        <span>Log out</span>
    </div>
</TabAnchor>
	<!-- ... -->
</TabGroup>