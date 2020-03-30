import React, { Component } from "react";
import MaterialTable from "material-table";
import { Chip, Tooltip } from "@material-ui/core";
import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff";
import FlightLandIcon from "@material-ui/icons/FlightLand";

export class RuleTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: "Rule Name",
          field: "ruleName",
          editable: "false",
          defaultGroupOrder: 0
        },
        {
          title: "Direction",
          field: "direction",
          editable: "false",
          render: rowData => this.RenderIcons(rowData)
        },
        {
          title: "Network",
          field: "network"
        },
        {
          field: "protocol",
          title: "Protocol",
          lookup: { http: "HTTP", mq: "MQ" }
        },
        {
          title: "Host / Queue Manager",
          field: "primaryAddress"
        },
        {
          title: "Port / Queue",
          field: "secondaryAddress"
        },
        {
          title: "Methods",
          field: "methods",
          editable: "false",
          render: rowData => this.RenderMethodChips(rowData)
        },
        {
          title: "Filter",
          field: "filter",
          editable: "false",
          render: rowData => this.RenderFilterChip(rowData)
        }
      ],
      tableData: null
    };
  }

  RenderFilterChip = rowData => {
    if (rowData.filter !== undefined) {
      return (
        <Tooltip
          title={
            rowData.filter.schemaPath !== ""
              ? rowData.filter.schemaPath
              : rowData.filter.filterType
          }
          aria-label="to"
        >
          <Chip
            color="secondary"
            label={
              rowData.filter.dpasFilter.charAt(0).toUpperCase() +
              rowData.filter.dpasFilter.slice(1)
            }
          />
        </Tooltip>
      );
    }
  };

  RenderIcons = rowData => {
    return (
      <Tooltip
        title={
          rowData.direction === "Source" ? "To DataPower" : "From DataPower"
        }
        aria-label="direction"
      >
        {rowData.direction === "Source" ? (
          <FlightTakeoffIcon />
        ) : (
          <FlightLandIcon />
        )}
      </Tooltip>
    );
  };

  RenderMethodChips = rowData => {
    if (rowData.methods !== undefined) {
      if (rowData.methods.length !== 0) {
        return rowData.methods.map(method => {
          return <Chip color="primary" label={method} />;
        });
      }
    }
  };

  ExtractTableDataFromProps = propRules => {
    let rules = JSON.parse(JSON.stringify(propRules));
    let data = [];

    rules.forEach(rule => {
      for (let [key] of Object.entries(rule)) {
        if (["srcAddr", "destAddr"].includes(key)) {
          rule[key].ruleName = rule["name"];
          rule[key].filter = rule.filter;
          rule[key].direction = key === "srcAddr" ? "Source" : "Destination";
        }
      }
      data.push(rule.srcAddr);
      data.push(rule.destAddr);
    });
    this.setState({
      tableData: data
    });
    return data;
  };

  render() {
    let data = this.state.tableData;
    return (
      <div>
        <MaterialTable
          title={this.props.title}
          columns={this.state.columns}
          //style={{width: 1200}}
          style={{ width: "100%" }}
          data={
            !data ? this.ExtractTableDataFromProps(this.props.data.rules) : data
          }
          options={{
            grouping: true,
            actionsColumnIndex: -1
          }}
          actions={[
            {
              icon: "delete",
              tooltip: "Delete",
              onClick: (event, rowData) => {
                let tableData = this.state.tableData;
                this.setState({
                  tableData: tableData.filter(
                    element => element.ruleName !== rowData.ruleName
                  )
                });
                this.props.removeRule(
                  this.props.data.rules.findIndex(
                    rule => rule.name === rowData.ruleName
                  )
                );
              }
            }
          ]}
        />
      </div>
    );
  }
}

export default RuleTable;
