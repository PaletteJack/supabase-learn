<script>
    import { Avatar } from "@skeletonlabs/skeleton";
    export let comment;
    const { owner } = comment;
    const initials = owner.first_name[0].toUpperCase() + owner.last_name[0].toUpperCase()
</script>

<div class="grid grid-cols-[auto_1fr] gap-3">
    <div class="flex flex-col gap-2 items-center">
        <Avatar initials="{initials}" background="bg-primary-500" width="w-10" rounded="rounded-full"/>
    </div>
    <div>
        <p class="text-xs font-semibold">{owner.first_name} {owner.last_name}</p>
        <div class="px-2">
            <p>{comment.body}</p>
        </div>
    </div>
</div>