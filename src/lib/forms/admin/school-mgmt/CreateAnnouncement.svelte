<script>
    export let user;
    export let school
</script>

<form action="?/addAnnouncement" method="POST" class="flex flex-col gap-4">
    <input type="hidden" name="author" value={user}>
    <input type="hidden" name="school" value={school}>
    <div class="w-full grid grid-cols-2 gap-4">
        <label class="label">
            <span>Start Date</span>
            <input class="select" type="date" name="start_date">
        </label>
        <label class="label">
            <span>End Date</span>
            <input class="select" type="date" name="exp_date">
        </label>
    </div>
    <label class="label">
        <span>Title</span>
        <input class="input px-4 py-2" type="text" name="title" placeholder="EXTRA! EXTRA!">
    </label>
    <label class="label">
        <span>Announcement Body</span>
        <textarea class="textarea px-4 py-2" rows="5" name="body" placeholder="Read all about it!" />
    </label>
    <div class="w-full flex flex-row-reverse">
        <button class="btn variant-filled-success">Submit</button>
    </div>
</form>