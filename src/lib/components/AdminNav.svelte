<script>
    import { page } from "$app/stores"
	import Users from "../svgs/Users.svelte"
	import School from "../svgs/School.svelte"
	import Book from "../svgs/Book.svelte";
    export let school
</script>

<nav class="list-nav shadow-lg">
    <div class="py-4 variant-soft-primary">
        <p class="text-3xl font-semibold text-center">{school.name}</p>
        <p class="text-center">Management</p>
    </div>
	<ul>
		<li>
			<a 
            href="/home/admin/{school.id}/user-management"
            class:variant-filled-primary={$page.url.pathname.includes(`/home/admin/${school.id}/user-management`)}
            class="!rounded-none"
            >
				<span class=""><Users /></span>
				<span class="flex-auto">Users</span>
			</a>
		</li>
		<li>
			<a 
            href="/home/admin/{school.id}/classroom-management"
            class:variant-filled-primary={$page.url.pathname.includes(`/home/admin/${school.id}/classroom-management`)}
            class="!rounded-none"
            >
				<span class=""><Book /></span>
				<span class="flex-auto">Classrooms</span>
			</a>
		</li>
		<li>
			<a 
            href="/home/admin/{school.id}/school-management"
            class:variant-filled-primary={$page.url.pathname.includes(`/home/admin/${school.id}/school-management`)}
            class="!rounded-none"
            >
				<span class=""><School /></span>
				<span class="flex-auto">School</span>
			</a>
		</li>
	</ul>
</nav>