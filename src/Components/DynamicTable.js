import React, { Component } from "react";
import MaterialTable from "material-table";

export class DynamicTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMq: "false",
      httpColumns: [
        {
          title: "Network",
          field: "network",
          lookup: { 1: "Tzadok", 2: "Zeus", 3: "Salim" }
        },
        { title: "IP/URL", field: "url" },
        { title: "Port", field: "port", type: "numeric" },
        {
          title: "Method",
          field: "method",
          lookup: { 1: "PUT", 2: "POST", 3: "GET" }
        }
      ],
      mqColumns: [
        {
          title: "Network",
          field: "network",
          lookup: { 1: "Tzadok", 2: "Zeus", 3: "Salim" }
        },
        { title: "Queue Manager", field: "qm" },
        { title: "Queue Name", field: "queue" }
      ],
      isSrc: this.props.isSrc
    };
  }

  render() {
    return (
      <div>
        <MaterialTable
          title={this.props.header}
          columns={
            this.props.showMq === "false"
              ? this.state.httpColumns
              : this.state.mqColumns
          }
          data={this.props.data}
          style={{ width: 1200 }}
          editable={{
            onRowAdd: newData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  const isSrc = this.state.isSrc;
                  this.props.addRow(newData, isSrc);
                }, 600);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  const isSrc = this.state.isSrc;
                  this.props.updateRow(newData, oldData, isSrc);
                }, 600);
              }),
            onRowDelete: oldData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  const isSrc = this.state.isSrc;
                  this.props.deleteRow(oldData, isSrc);
                }, 600);
              })
          }}
        />
      </div>
    );
  }
}

export default DynamicTable;
