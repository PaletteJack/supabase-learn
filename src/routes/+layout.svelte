<script>
  import '@skeletonlabs/skeleton/themes/theme-vintage.css';
  import '@skeletonlabs/skeleton/styles/skeleton.css';
  import '../app.postcss';

  import { invalidate } from "$app/navigation"
  import { onMount } from 'svelte';

  export let data;

  let { sb, session } = data;
  $: ({ sb, session } = data )

  onMount(() => {
    const {
      data: { subscription },
    } = sb.auth.onAuthStateChange((event, _session) => {
      if (_session?.expires_at != session?.expires_at) {
        invalidate('supabase:auth')
      }
    })

    return () => subscription.unsubscribe()
  });

</script>

<div class="w-full h-screen grid place-items-center">
  <slot />
</div>
