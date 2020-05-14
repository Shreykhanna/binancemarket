import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";
import "../App.css";
import WebSocket from "react-websocket";
export default class Widget extends Component {
  // ws=new WebSocket('ws://stream.binance.com/stream?streams=!miniTicker@arr');

  state = {
    rowData: [],
    filteredData: [],
    gridOptions: {
      columns: [
        { headerName: "Pair", field: "pair", sortable: true },
        { headerName: "Price", field: "openprice", sortable: true },
        { headerName: "Change", field: "change", sortable: true },
      ],
    },
  };
  componentDidMount() {
    // this.ws.onopen = () => {
    //     // on connecting, do nothing but log it to the console
    //     console.log('connected')
    //     }
    fetch("/v1/public/asset-service/product/get-products")
      .then((response) => response.json())
      .then((data) => data.data)
      .then((data) =>
        data.map((data) => {
          return {
            pair: data.s,
            bnb: data.b,
            btc: data.q,
            alts: data.pm,
            openprice: data.o,
            change: data.c,
            volume: data.v,
          };
        })
      )
      .then((data) =>
        this.setState({
          rowData: data,
          filteredData: data,
        })
      );
  }
  filterStocksBNB = (event) => {
    let filteredResults = this.state.rowData;
    let symbol = event.target.value;
    filteredResults = this.state.rowData.filter((data) => {
      return symbol.toLowerCase().indexOf(data.btc.toLowerCase()) !== -1;
    });
    this.setState({
      filteredData: filteredResults,
    });
  };
  filterStocks = (event) => {
    let filteredResults = this.state.rowData;
    let symbol = event.target.value;
    filteredResults = this.state.rowData.filter((data) => {
      return symbol.toLowerCase().indexOf(data.btc.toLowerCase()) !== -1;
    });
    this.setState({
      filteredData: filteredResults,
    });
    //  console.log(filteredResults);
  };
  filterALTS = (event) => {
    console.log("inside filterALTS", event.target.value);
    let symbol = event.target.value;
    let filteredResults = this.state.rowData;
    if (symbol !== "ALTS") {
      filteredResults = this.state.rowData.filter((data) => {
        return symbol.toLowerCase().indexOf(data.btc.toLowerCase()) !== -1;
      });
    } else {
      filteredResults = this.state.rowData.filter((data) => {
        return (
          data.btc.toLowerCase() === "eth" ||
          data.btc.toLowerCase() === "xrp" ||
          data.btc.toLowerCase() === "trx"
        );
      });
    }
    this.setState({
      filteredData: filteredResults,
    });
  };
  filterUSD = (event) => {
    let filteredResults = this.state.rowData;
    let symbol = event.target.value;
    filteredResults = this.state.rowData.filter((data) => {
      return symbol.toLowerCase().indexOf(data.btc.toLowerCase()) !== -1;
    });
    this.setState({
      filteredData: filteredResults,
    });
  };
  handleInputChange = (event) => {
    let text = event.target.value;
    let filteredResults = this.state.rowData;
    filteredResults = this.state.rowData.filter((data) => {
      return data.pair.toLowerCase().indexOf(text.toLowerCase()) !== -1;
    });
    this.setState({
      filteredData: filteredResults,
    });
  };
  handleChange = () => {
    var newgridOptions = {
      columns: [
        { headerName: "Pair", field: "pair", sortable: true },
        { headerName: "Price", field: "openprice", sortable: true },
        { headerName: "Change", field: "change", sortable: true },
      ],
    };
    this.setState({
      gridOptions: newgridOptions,
    });
  };
  handleVolume = () => {
    var newgridOptions = {
      columns: [
        { headerName: "Pair", field: "pair", sortable: true },
        { headerName: "Price", field: "openprice", sortable: true },
        { headerName: "Volume", field: "volume", sortable: true },
      ],
    };
    this.setState({
      gridOptions: newgridOptions,
    });
  };
  render() {
    let table;
    table = (
      <AgGridReact
        columnDefs={this.state.gridOptions.columns}
        rowData={this.state.filteredData}
        pagination={true}
        paginationPageSize={50}
        rowSelection="single"
        onGridReady={(params) => (this.gridApi = params.api)}
        onRowClicked={this.onRowClicked}
      />
    );

    return (
      <>
        <h2>Market</h2>
        <div>
          <button id="bnb-button" onClick={this.filterStocksBNB} value="bnb">
            BNB
          </button>
          <button id="btc-button" onClick={this.filterStocks} value="btc">
            BTC
          </button>
          <label id="label-alts">ALTS</label>
          <select id="currency-picker" onChange={this.filterALTS}>
            <option>Select</option>
            <option value="ALTS">ALTS</option>
            <option value="ETH">ETH</option>
            <option value="XRP">XRP</option>
            <option value="TRX">TRX</option>
          </select>
          <button id="usd-button" onClick={this.filterUSD} value="usdt">
            USD
          </button>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search "
            id="input-pair"
            onChange={this.handleInputChange}
          ></input>
          <div>
            <input
              type="radio"
              placeholder="Search "
              id="radiobutton-change"
              name="radio-button"
              onClick={this.handleChange}
            ></input>
            <label id="label-change">Change</label>
          </div>
          <div>
            <input
              type="radio"
              id="radiobutton-volume"
              name="radio-button"
              onClick={this.handleVolume}
            ></input>
            <label id="label-volume">Volume</label>
          </div>
        </div>
        <div
          className="ag-theme-balham"
          id="ag-grid-table-all-currency"
          style={{
            height: "300px",
            width: "550px",
          }}
        >
          {table}
        </div>
      </>
    );
  }
}
