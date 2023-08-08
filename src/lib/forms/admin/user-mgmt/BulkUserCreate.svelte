<script>
    import Papa from 'papaparse';
    import { downloadCSV } from "$lib/utils.js"
    export let school;
    let tmpData = [];
    let haveData = false;
    let file;

    function changeFile(event) {
      file = event.target.files[0];
    }

    function logData() {
        if(haveData) tmpData = [];
        Papa.parse(file, {
            header: true,
            step: function(row) {
                tmpData.push({
                    firstName: row.data['First Name'],
                    lastName: row.data['Last Name'],
                    email: row.data['Email'],
                    role: row.data['Role'],
                    password: row.data['Password']
                })
                tmpData = tmpData;
            },
            complete: function() {
                tmpData.pop()
                haveData = true;
            }
        })
    }

    function clearData() {
      document.getElementById('file-input').value = null
      file = null
      tmpData = [];
    }
</script>

{#if tmpData.length != 0}
<div class="table-container mb-4 max-h-[500px] overflow-y-auto">
  <table class="table">
    <thead>
      <tr>
        <th>#</th>
        <th>Name </th>
        <th>Email</th>
        <th>Role</th>
      </tr>
    </thead>
    <tbody>
      {#each tmpData as item, i}
      <tr>
          <th>{i + 1}</th>
          <td>{item.firstName} {item.lastName}</td>
          <td>{item.email}</td>
          <td>{item.role}</td>
      </tr>
      {/each}
    </tbody>
  </table>
</div>
<div class="flex gap-2 mb-4">
  <button class="btn variant-filled-warning" on:click={clearData}>Clear</button>
  <form action="?/bulkCreate" method="POST">
    <input type="hidden" name="parsedData" value={JSON.stringify(tmpData)}>
    <input type="hidden" name="school" value={school}>
    <button class="btn variant-filled-success">Submit users</button>
  </form>
</div>
{/if}
<form on:submit|preventDefault={logData} method="POST" class="flex flex-col gap-4">
    {#if tmpData.length === 0}
    <p>Upload users from an excel sheet or csv file. <button class="hover:underline" on:click={downloadCSV}>Download Template</button></p>
    {/if}
    <input id="file-input" class="input" type="file" name="file" accept=".xlsx, .xls, .csv" on:change={changeFile}>
    <button class="btn variant-filled-primary" type="submit">Open File</button>
</form>