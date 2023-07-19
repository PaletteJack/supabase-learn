<script>
    import { Avatar } from "@skeletonlabs/skeleton"
    import Arrow from "../svgs/Arrow.svelte";
    export let link, icon, name, id, classroom
    let isHovering;

    function doSomething() {
        isHovering = true;
    }

    function doSomethingElse() {
        isHovering = false;
    }
</script>

<a 
href="{link}" target="_blank" rel="noopener noreferrer" 
class="card px-4 py-2 grid grid-cols-[auto_1fr] gap-4 min-w-[250px] w-fit variant-glass-primary rounded-full shadow-lg hover:scale-95"
on:mouseenter={doSomething}
on:mouseleave={doSomethingElse}
>
    <div>
        <Avatar src={icon} width="w-12" rounded="rounded-full" border="border-solid border-2 border-surface-300-600-token hover:!border-primary-500"/>
    </div>
    <div class="flex gap-4 items-center justify-around">
        <p class="text-lg">{name}</p>
        <Arrow />
    </div>
</a>