import React, { Component } from "react";
import "./App.css";

// AG Grid Imports
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-blue.css";
import "ag-grid-enterprise";

class App extends Component {
  state = {
    // Header Defs - ColumnDefs
    // Set Options In Columns With Boolean
    columnDefs: [
      {
        headerName: "Make",
        field: "make",
        // Add Sort
        sortable: true,
        // Add Filter
        filter: true,
        // Add Select Checkboxes
        checkboxSelection: true,
        // Group By Row Toggle
        rowGroup: false
      },
      {
        headerName: "Model",
        field: "model",
        sortable: true,
        filter: true
      },
      {
        headerName: "Price",
        field: "price",
        sortable: true,
        filter: true
      }
    ],
    // Sets Row Grouping Display
    autoGroupColumnDef: {
      headerName: "Model",
      field: "model",
      cellRenderer: "agGroupCellRenderer",
      // Options For Grouped Rows
      cellRendererParams: {
        checkbox: true
      }
    },
    // Row Data For Grid - Array of Objects
    // Object key names match field names in ColumnDefs
    rowData: [
      {
        make: "Toyota",
        model: "Celica",
        price: 35000
      },
      {
        make: "Ford",
        model: "Mondeo",
        price: 32000
      },
      {
        make: "Porsche",
        model: "Boxter",
        price: 72000
      }
    ]
  };

  componentDidMount() {
    // Mock API Call For Data
    fetch("https://api.myjson.com/bins/ly7d1")
      .then(result => result.json())
      .then(rowData => {
        console.log(rowData);
        this.setState({ rowData });
      });
  }

  onButtonClick = event => {
    // Grab Selected Rows From AG Grid API
    const selectedNodes = this.gridApi.getSelectedNodes();

    // Grab Data From Within Each Selected Row With Loop
    // "Data" object provides access to all fields in row
    const selectedData = selectedNodes.map(node => {
      console.log("Node Data: ", node.data);
      return node.data;
    });

    // Show Data As Sting As Proxy For Back End API Call
    // Extract Data Fields From Extracted Data
    const selectedDataStringPresentation = selectedData
      .map(node => node.make + " " + node.model)
      .join(", ");
    alert(`Selected nodes: ${selectedDataStringPresentation}`);
  };

  render() {
    return (
      <div
        className="ag-theme-blue"
        style={{ height: "500px", width: "600px" }}
      >
        <button onClick={this.onButtonClick}>Get Selected Rows</button>
        <AgGridReact
          // Column Headers
          columnDefs={this.state.columnDefs}
          // Data Rows
          rowData={this.state.rowData}
          // Allow Select To Group Rows
          groupSelectsChildren={true}
          // Sets Display For Grouping Based On State Object
          autoGroupColumnDef={this.state.autoGroupColumnDef}
          // Allow Select Muliple Rows With Checkboxes
          rowSelection="multiple"
          // Access To AG Grid API For Saving Selected Data
          onGridReady={params => (this.gridApi = params.api)}
        />
      </div>
    );
  }
}

export default App;
