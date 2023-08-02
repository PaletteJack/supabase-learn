<script>
    export let item;
</script>

<style>
    .card-wrapper {
        width: min(450px, 100%);
    }

</style>


<div class="card-wrapper snap-start shrink-0 card rounded-lg">
    <header class="card-header text-lg font-semibold">{item.title}</header>
    <section class="p-3">{item.body}</section>
    <hr>
    <footer class="card-footer">Footer 😊</footer>
</div>