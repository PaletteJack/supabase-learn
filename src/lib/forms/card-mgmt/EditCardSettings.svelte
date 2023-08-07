<script>
    import { Avatar } from "@skeletonlabs/skeleton";
    import { enhance, applyAction } from "$app/forms"
    import { invalidateAll } from "$app/navigation";
    import { toastStore, modalStore } from '@skeletonlabs/skeleton';
    export let link, icon, name, id, hidden
    export let parent

    const cardInitials = getInitials(name);

    function getInitials(item) {
        const wordList = item.split(" ");
        let initials = "";
        
        for (let i = 0; i < wordList.length; i++) {
            if (initials.length >= 2) break;
            const tmp = wordList[i].slice(0, 1).toUpperCase();
            initials = initials + tmp;
        }

        return initials;
    }

    let prevData = {
        id: id,
        icon: icon,
        link: link,
        name: name,
        hidden: hidden
    }

    let file;

    function previewImage(e) {
        file = URL.createObjectURL(e.target.files[0]);
    }

    function clearImage() {
        document.getElementById('file-input').value = null;
        file = null;
    }

    function submitForm({ form }) {

        return async({ result }) => {
            switch (result.type) {
                case 'success':
                    await applyAction(result);
                    await invalidateAll()
                    modalStore.clear()
                    toastStore.trigger({message: result.data.message, background: "variant-filled-success"})
                    break;
                case 'failure':
                    modalStore.clear()
                    toastStore.trigger({message: result.data.message, background: "variant-filled-error"})
                default:
                    break;
            }
        }

    }
</script>

<style>
    div {
        width: min(500px, 100%);
    }
</style>

<div class="card aspect-square rounded-lg p-4">
    <p class="text-xl font-semibold">Card Info</p>
    <form action="?/updateCard" method="POST" enctype="multipart/form-data" use:enhance={submitForm}>
        <input type="hidden" name="oldData" value={JSON.stringify(prevData)}>
        <input type="hidden" name="id" value={id}>
        <div class="flex flex-col gap-4 py-2">
            <div class="grid grid-cols-[auto_1fr]">
                <div class="px-4">
                    <Avatar src={file ?? icon} width="w-16" rounded="rounded-full" initials={cardInitials}/>
                    <button class="btn btn-sm variant-filled-warning" type="button" on:click={clearImage}>Reset</button>
                </div>
                <label class="label">
                    <span>Card Icon</span>
                    <input id="file-input" class="input px-4 py-2" type="file" name="icon" accept=".png, .jpeg, .jpg, .webp" on:change={previewImage}>
                </label>
            </div> 
            <label class="label">
                <span>Card URL</span>
                <input class="input px-4 py-2" type="text" name="link" value="{link}">
            </label>
            <label class="label">
                <span>Card Name</span>
                <input class="input px-4 py-2" type="text" name="name" value="{name}">
            </label>
            <div class="flex space-x-4">
                <label class="flex items-center space-x-2">
                    <input class="radio" type="radio" checked={!hidden ? true : false} name="hidden" value={false} />
                    <p>Public</p>
                </label>
                <label class="flex items-center space-x-2">
                    <input class="radio" type="radio" checked={hidden ? true : false} name="hidden" value={true} />
                    <p>Hidden</p>
                </label>
            </div>
        </div>
    
        <div class="flex flex-row-reverse gap-2 mt-4">
            <button class="btn variant-filled-success">Save</button>
            <button class="btn variant-filled-warning" type="button" on:click={parent.onClose()}>Close</button>
        </div>
    </form>
</div>