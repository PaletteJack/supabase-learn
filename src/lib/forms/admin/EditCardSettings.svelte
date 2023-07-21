<script>
    export let link, icon, name, id, classroom, hidden, sort_order
    export let parent
</script>

<style>
    div {
        width: min(500px, 100%);
    }
</style>

<div class="aspect-square variant-filled-surface rounded-lg px-4 py-2 flex flex-col justify-between">
    <form action="">
        <div>
            <p class="text-xl font-semibold">Card Info</p>
            <div class="ml-4">
                <input class="input px-4 py-2" type="text" name="link" value="{link}">
                <input class="input px-4 py-2" type="text" name="icon" value="{icon}">
                <input class="input px-4 py-2" type="text" name="name" value="{name}">
                <select class="select" name="hidden">
                    <option value={hidden}>{hidden ? 'Yes' : 'No'}</option>
                    <option value={!hidden}>{!hidden ? 'Yes' : 'No'}</option>
                </select>
            </div>
        </div>
    
        <div class="flex flex-row-reverse gap-4">
            <button class="btn variant-filled-success">Save</button>
            <button class="btn variant-filled-error" type="button" on:click={parent.onClose()}>Close</button>
        </div>
    </form>
</div>