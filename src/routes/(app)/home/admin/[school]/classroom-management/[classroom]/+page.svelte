<script>
    export let data
    const { classroom, students } = data;
    import ClassroomRoster from '$lib/forms/admin/school-mgmt/ClassroomRoster.svelte';

    function assignStudents() {
        console.log('Assign students function');
    }

    function unassignStudents() {
        console.log('Unassign students function');
    }
</script>


<ClassroomRoster 
{students} 
classroom={classroom.id}
on:assignment={assignStudents}
on:unassignment={unassignStudents}
/>
