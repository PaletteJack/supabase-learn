<script>
    import { fly, slide } from 'svelte/transition';
	import { enhance, applyAction } from '$app/forms';
    import { invalidateAll } from '$app/navigation'
    import { toastStore } from '@skeletonlabs/skeleton';
    import Trash from '../svgs/Trash.svelte';

    export let todos;
    let showForm = false;

    function submitForm({ form, data, action, cancel }) {
      const { task } = Object.fromEntries(data)

      if (!task) {
        toastStore.trigger({message: "Task is blank", background: "variant-filled-warning"})
        cancel()
      }

      if (task.length > 60) {
        toastStore.trigger({message: "Task is too long", background: "variant-filled-warning"})
        cancel()
      }

      return async({ result }) => {
        switch (result.type) {
          case 'success':
            form.reset()
            await applyAction(result);
            await invalidateAll()
            break;
          case 'failure':
            toastStore.trigger({message: result.data.message, background: "variant-filled-error"})
          default:
            break;
          }
        }
    }
</script>

<style>
    .todo-container {
        width: min(300px, 100%);
    }
</style>

<div class="w-fit todo-container max-h-[600px]">
    <h2 class="h2">Todos</h2>
    <button class="mt-2 hover:underline" on:click={() => showForm = true}>Add a todo:</button>
    {#if showForm}
        <form method="POST" action="?/createTodo" use:enhance={submitForm} transition:slide>
            <input 
            class="input rounded-none border-l-0 border-r-0 border-t-0 px-2 pt-1 w-full outline-none border-b-2" 
            name="task"  
            autocomplete="off" 
            required />
        </form>
    {/if}
    
    <ul class="flex flex-col gap-3 mt-2">
        {#if todos}
            {#if todos.length != 0}
                {#each todos as todo (todo.id)}
                    <li class="px-2 py-1 variant-glass-primary shadow-md" in:fly={{ y: 20 }} out:slide>
                        <form method="POST" action="?/deleteTodo" class="flex justify-between items-center" use:enhance>
                            <input type="hidden" name="id" value={todo.id} />
                            <span>{todo.task}</span>
                            <button class="btn btn-icon btn-icon-sm"><Trash /> </button>
                        </form>
                    </li>
                {/each}
            {:else}
            <li>
                <p>No todos to show. <button class="hover:underline" on:click={() => showForm = true}>Add Todo?</button></p>
            </li>
            {/if}
        {/if}
    </ul>
</div>