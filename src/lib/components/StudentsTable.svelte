<script>
    import { goto } from '$app/navigation';
    export let classID
    export let students;

	let firstNameFilter = '';
	let lastNameFilter = '';

	$: filteredStudents = students.filter(student => 
        student.student.first_name.toLowerCase().includes(firstNameFilter.toLowerCase()) &&
        student.student.last_name.toLowerCase().includes(lastNameFilter.toLowerCase())
    );

    function viewJournals(id) {
        goto(`/home/classes/${classID}/journals/${id}`)
    }
</script>
<div class="table-container rounded-none max-h-[500px]">
	<table class="table table-interactive rounded-b-none">
		<thead>
			<tr>
				<th class="table-cell-fit">First Name</th>
				<th class="table-cell-fit">Last Name</th>
				<th>Student ID</th>
			</tr>
		</thead>
		<tbody>
			{#each filteredStudents as row, i}
				<tr on:click={() => viewJournals(row.student.id)}>
					<td class="table-cell-fit">{row.student.first_name}</td>
					<td class="table-cell-fit">{row.student.last_name}</td>
					<td>{row.student.id}</td>
				</tr>
			{/each}
		</tbody>
	</table>
	<div class="w-full flex">
		<input class="input px-4 py-2 rounded-none rounded-bl-2xl border-0 border-r-[1px]" type="text" bind:value={firstNameFilter} placeholder="Filter by first name" />
		<input class="input px-4 py-2 rounded-none rounded-br-2xl border-0 border-l-[1px]" type="text" bind:value={lastNameFilter} placeholder="Filter by last name" />
	</div>
</div>