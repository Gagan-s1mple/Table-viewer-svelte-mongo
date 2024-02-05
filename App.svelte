
<script>
  import { onMount } from "svelte";

  let tables = [];
  let selectedTable = "";
  let columns = [];
  let data = [];

  onMount(async () => {
    // Fetch the list of tables when the component mounts
    const response = await fetch("http://localhost:3001/tables");
    tables = await response.json();

    // Call the loadData endpoint for the first table in the list
    if (tables.length > 0) {
      await loadData(tables[0]);
    }
  });

  async function getColumns(tableName) {
    // Fetch the columns for the selected table
    const response = await fetch(`http://localhost:3001/columns/${tableName}`);
    columns = await response.json();
    selectedTable = tableName;

    // Clear the data when changing the selected table
    data = [];
  }

  async function loadData(tableName) {
    try {
      // Call the /loadData endpoint to load data into MongoDB
      await fetch(`http://localhost:3001/loadData?tableName=${tableName}`);

      // Fetch the columns for the selected table
      const responseColumns = await fetch(`http://localhost:3001/columns/${tableName}`);
      columns = await responseColumns.json();
      selectedTable = tableName;

      // Fetch the data for the selected table
      const responseData = await fetch(`http://localhost:3001/${tableName}`);
      data = await responseData.json();
    } catch (error) {
      console.error(error);
    }
  }
</script>


<main>
  <h1>Table and Column Viewer</h1>

  <label for="tables">Select a table:</label>
  <select id="tables" on:change={(e) => getColumns(e.target.value)}>
    {#each tables as table}
      <option value={table}>{table}</option>
    {/each}
  </select>
  
  <br>

  {#if selectedTable}
    <h2 class="Cols">Columns of {selectedTable}:</h2>
    <ul>
      {#each columns as column}
        <li>{column}</li>
      {/each}
    </ul>

    <h2 class="datas">Data of {selectedTable}:</h2>
    {#if data.length > 0}
      <table class="tables">
        <thead>
          <tr>
            {#each columns as column}
              <th>{column}</th>
            {/each}
          </tr>
        </thead>
        <tbody>
          {#each data as row}
            <tr>
              {#each columns as column}
                <td>{row[column]}</td>
              {/each}
            </tr>
          {/each}
        </tbody>
        
      </table>
    {:else}
      <p>Click the button</p>
    {/if}
  {/if}
  <br>
  <button on:click={(e) => loadData(selectedTable)} class="fetch">Fetch Data</button>
</main>


<!-- Add these styles to your existing stylesheet -->

<style>
   main {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 2em;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    min-height: 100vh; /* Ensure the background covers the entire viewport */
  }
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 2em;
  }

  h1 {
    border: 2px dashed #e44d26;
    padding: 1em;
    background-color: #d6cc37;
    color: #2e2e2e;
    border-radius: 10px;
    font-family: 'Arial', sans-serif;
  }

  label, select {
    margin-top: 1em;
    margin-bottom: 1em;
    font-size: 1.2em;
    color: #d87c51;
  }

  select {
    padding: 0.5em;
    border: 2px solid #4e0db0;
    border-radius: 5px;
    background-color: #f57073;
    color: #2e2e2e;
  }

  .Cols, .datas {
    margin-bottom: 1em;
    font-size: 1.5em;
    color: #2e2e2e;
    
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    margin: 0.5em 0;
    font-size: 1.2em;
    color: #2e2e2e;
  }

  .tables {
    width: 100%;
    margin-top: 1em;
    border-collapse: collapse;
  }

  th, td {
    border: 2px solid skyblue;
    padding: 0.8em;
    text-align: left;
  }

  th {
    background-color: #228bad;
    color: #2e2e2e;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  tr:nth-child(odd){
    background-color: #8ff7c1;
  }

  tr:hover {
    background-color:#2e2e2e;
    color: #fff;
  }

  .fetch {
    background-color: #e44d26;
    color: #fff;
    padding: 0.8em;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1.2em;
  }

  .Cols {
    margin-bottom: 1em;
    font-size: 1.5em;
    color: #2e2e2e;
    text-decoration: underline;
    font-weight: bold;
  }

  ul {
    list-style-type: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  li {
    margin: 0.5em;
    font-size: 1.2em;
    color: #f9f6f6;
    background-color: #1c1b1c;
    padding: 0.5em 1em; 
    border-radius: 5px;
    transition: background-color 0.3s;
    cursor: pointer;
  }

  li:hover {
    background-color: #6c5fd1;
    color: #fff;
  }
</style>
	