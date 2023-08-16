<script>
    import { createEventDispatcher } from "svelte";
    import { fly, slide, fade } from 'svelte/transition';
	import { enhance, applyAction } from '$app/forms';
    import { invalidateAll } from '$app/navigation'
    import { getToastStore } from '@skeletonlabs/skeleton';
    import Trash from '../svgs/Trash.svelte';
    const toastStore = getToastStore();
    const dispatch = createEventDispatcher();

    export let todos;
    let showForm = false;
    let checked = false

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

    async function completeTodo(id, value) {
        console.log(id, value);

        const newValues = {
            id: id,
            is_completed: value
        }

        dispatch("complete", newValues);
    }
</script>

<style>

    .todo-container {
        width: min(300px, 100%);
    }
</style>

<div class="w-fit todo-container max-h-[600px]">
    <button class="mt-2 hover:underline" on:click={() => showForm = true}>Add a to-do:</button>
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
                    <li class="px-2 py-1 variant-glass-primary shadow-md flex justify-between items-center" in:fly={{ y: 20 }} out:slide>
                        <div class="flex items-center justify-center gap-2">
                            <input 
                            class="checkbox"
                            type="checkbox"
                            bind:checked={todo.is_completed}
                            on:change={() => completeTodo(todo.id, todo.is_completed)}
                            />
                            <span
                            class="flex-1"
                            class:line-through={todo.is_completed}
                            class:text-primary-700-200-token={todo.is_completed}
                            >
                                {todo.task}
                            </span>
                        </div>
                        <form method="POST" action="?/deleteTodo" use:enhance>
                            <input type="hidden" name="id" value={todo.id} />
                            <button class="btn btn-icon btn-icon-sm"><Trash extStyles="w-5 h-5"/> </button>
                        </form>
                    </li>
                {/each}
            {:else}
            <li>
                <p>No to-dos to show. <button class="hover:underline" on:click={() => showForm = true}>Add to-do?</button></p>
            </li>
            {/if}
        {/if}
    </ul>
</div>