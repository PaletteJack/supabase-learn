<script>
    import { enhance, applyAction } from "$app/forms"
    import { invalidateAll } from "$app/navigation";
    import { toastStore } from '@skeletonlabs/skeleton';
    export let id;
    export let school;

    function submitForm({ form }) {

        return async({ result }) => {
            switch (result.type) {
                case 'success':
                    form.reset()
                    await applyAction(result);
                    await invalidateAll()
                    toastStore.trigger({message: result.data.message, background: "variant-filled-success"})
                    break;
                case 'failure':
                    toastStore.trigger({message: result.data.message, background: "variant-filled-error"})
                default:
                    break;
            }
        }

    }
</script>

<form
action="?/createCard"
method="POST"
class="w-full flex flex-col gap-4 mb-4"
enctype="multipart/form-data"
use:enhance={submitForm}
>
    <p class="text-2xl">Create New Card</p>
    <input type="hidden" name="classroom" value={id}>
    <input type="hidden" name="school" value={school}>
    <input type="hidden" name="scope" value="classroom">
    <input class="input px-4 py-2" type="text" name="name" placeholder="name">
    <input class="input px-4 py-2" type="text" name="link" placeholder="link">
    <input class="input px-4 py-2" type="file" name="icon" accept=".png, .jpeg, .jpg, .webp" />
    <button class="btn variant-filled-tertiary">Submit</button>
</form>