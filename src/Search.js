import React, { Component } from "react";
import CSVReader from 'react-csv-reader'
import { CSVLink } from 'react-csv';
import "./Search.css";

class Search extends Component {
  state = {
    searchValue: "",
    enableAlert: false,
    enableError: false,
    alertMessage: "",
    // Render All Default Keys
    fresh_shipment_processing: 0,
    auto_custody_transfer: 0,
    mix_bag_processing: 0,
    unloading: 0,
    bag_sort_to_connection: 0,
    ftl_bag_sort_to_connection: 0,
    ftl_unloading: 0,
    carting_bag_sort_to_connection: 0,
    carting_unloading: 0,
    cutoff: 0,
    api_post_response: "",
    enableCreate: false,
    enableUpdate: false,
    enableApiResponse: false,
    // Handle bulk upload
    sampleData: [["facility_id",
      "fresh_shipment_processing", "auto_custody_transfer",
      "mix_bag_processing",
      "unloading",
      "bag_sort_to_connection",
      "ftl_bag_sort_to_connection",
      "ftl_unloading",
      "carting_bag_sort_to_connection",
      "carting_unloading",
      "cutoff"
    ], ["A", 10, 10, 10, 10, 10, 10, 10, 10, 10, 10], ["B", 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]],

    enableSingleSearch: false,
    enableBulkSearch: false,
    bulkServerResponse: [],
    enableBulkDownload: false
  };

  componentDidMount(prevProps) {
    var url = window.location.href;
    var input = url.substring(url.lastIndexOf("/") + 1)
    if (input === "bulkupload") {
      this.setState({ enableBulkSearch: true });
    } else {
      this.getApiCall(input);
    }
  }

  handleOnChangeSearch(event) {
    if (event.target.value === "") {
      this.setState({ enableBulkSearch: true })
    }
    this.setState({ enableBulkDownload: false });
    this.setState({ enableAlert: false });
    this.setState({ enableError: false });
    this.setState({ enableCreate: false });
    this.setState({ enableUpdate: false });
    this.setState({ enableApiResponse: false });
    this.setState({ enableBulkSearch: false })
    this.setState({ searchValue: event.target.value });
  };

  handleSearch = () => {
    this.getApiCall(this.state.searchValue);
  };

  handleOnChange = (event, key) => {
    this.setState({ [key]: event.target.value });
  }

  handleDefaultCreate = () => {
    this.setState({ enableBulkDownload: false });
    this.setState({ enableUpdate: false });
    this.setState({ enableAlert: false });
    this.setState({ enableError: false });
    this.setState({ enableBulkSearch: false });
    this.setState({ enableApiResponse: false });
    this.setState({ enableCreate: true });
  }

  handleUpdatedData = () => {
    this.setState({ enableBulkDownload: false });
    this.setState({ enableUpdate: false });
    this.setState({ enableAlert: false });
    this.setState({ enableError: false });
    this.setState({ enableApiResponse: false });
    this.setState({ enableBulkSearch: false })
    this.setState({ enableCreate: false });
    this.faasApiCall(this.state.searchValue);
  }

  renderAlert() {
    return <div key="alert">
      <h1>{this.state.alertMessage}</h1>
      <button onClick={this.handleDefaultCreate}>Create Meta Data</button>
    </div>;
  }

  renderError() {
    return <div key="error">
      <h1>{this.state.alertMessage}</h1>
    </div>;
  }

  renderApiResponse() {
    return <div key="apiresponse">
      <h1>{this.state.api_post_response}</h1>
    </div>;
  }

  createBulkCSV = (results) => {
    var length = results.length
    var data = results
    const header_row = [['Facility Id', 'StatusCode']]
    for (var i = 0; i < length; i++) {
      var response = data[i]
      var url = response['url']
      var status_code = response['status']
      var facility_id = url.substring(60, url.indexOf("/meta/"))
      var record = [facility_id, status_code]
      header_row.push(record)
    }
    this.setState({ bulkServerResponse: header_row })
    this.setState({ enableBulkDownload: true });
  }

  renderKeys() {
    return <div className="div2">
      <label>fresh_shipment_processing</label>
      <input className="input2" name="fresh_shipment_processing" type="number"
        onChange={event => this.handleOnChange(event, "fresh_shipment_processing")} value={this.state["fresh_shipment_processing"]} />
      <br></br>
      <label>auto_custody_transfer</label>
      <input className="input2" name="auto_custody_transfer" type="number"
        onChange={event => this.handleOnChange(event, "auto_custody_transfer")} value={this.state["auto_custody_transfer"]} />
      <br></br>
      <label>mix_bag_processing</label>
      <input className="input2" name="mix_bag_processing" type="number"
        onChange={event => this.handleOnChange(event, "mix_bag_processing")} value={this.state["mix_bag_processing"]} />
      <br></br>
      <label>unloading</label>
      <input className="input2" name="unloading" type="number"
        onChange={event => this.handleOnChange(event, "unloading")} value={this.state["unloading"]} />
      <br></br>
      <label>bag_sort_to_connection</label>
      <input className="input2" name="bag_sort_to_connection" type="number"
        onChange={event => this.handleOnChange(event, "bag_sort_to_connection")} value={this.state["bag_sort_to_connection"]} />
      <br></br>
      <label>ftl_bag_sort_to_connection</label>
      <input className="input2" name="ftl_bag_sort_to_connection" type="number"
        onChange={event => this.handleOnChange(event, "ftl_bag_sort_to_connection")} value={this.state["ftl_bag_sort_to_connection"]} />
      <br></br>
      <label>ftl_unloading</label>
      <input className="input2" name="ftl_unloading" type="number"
        onChange={event => this.handleOnChange(event, "ftl_unloading")} value={this.state["ftl_unloading"]} />
      <br></br>
      <label>carting_bag_sort_to_connection</label>
      <input className="input2" name="carting_bag_sort_to_connection" type="number"
        onChange={event => this.handleOnChange(event, "carting_bag_sort_to_connection")} value={this.state["carting_bag_sort_to_connection"]} />
      <br></br>
      <label>carting_unloading</label>
      <input className="input2" name="carting_unloading" type="number"
        onChange={event => this.handleOnChange(event, "carting_unloading")} value={this.state["carting_unloading"]} />
      <br></br>
      <label>cutoff</label>
      <input className="input2" name="cutoff" type="number"
        onChange={event => this.handleOnChange(event, "cutoff")} value={this.state["cutoff"]} />
      <br></br>
      <button onClick={this.handleUpdatedData}>Modify Meta Data</button>
    </div>;
  };

  getApiCall = searchInput => {
    let prod_url = `https://api-facilities.delhivery.com/v1/partners/facilities/${searchInput}/meta/ExpectedPath/`;
    let url = `https://api-facilities.pntrzz.com/v1/partners/facilities/${searchInput}/meta/ExpectedPath/`;

    let req = {
      method: 'GET',
      headers: {
        'Content-Type': "application/json",
        'Accept': "application/json",

        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRldi1zdXBlci1hZG1pbiIsInRva2VuX25hbWUiOiJkZXYtc3VwZXItYWRtaW4iLCJjZW50ZXIiOlsiSU5ENDIxNTAyQUFBIl0sInVzZXJfdHlwZSI6Ik5GIiwiYXBwX2lkIjoiNDciLCJhdWQiOiJHdkRLem9kNmFPSU0zTGN5YTlCamZCYjhidkZrWVRYeSIsImZpcnN0X25hbWUiOiJkZXYtc3VwZXItYWRtaW4iLCJzdWIiOiJ1bXM6OnVzZXI6OmU1ZGEyZmQ2LTQyZWUtMTFlOC04MTNmLTBlNGJlMmFkYTUwYyIsImV4cCI6MTg0Mjg1NDIzNCwiYXBwX25hbWUiOiJGQUFTIiwiYXBpX3ZlcnNpb24iOiJ2MiJ9.vzGeahQ-O1xBGSl4g-oPgN27Y7NXqVrYbJzN4B4Yft0"
      }
    }

    fetch(url, req)
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.success) {
          let result = responseData["result"]["data"]["proc_map"]
          this.setState({ searchValue: searchInput });
          this.setState({ fresh_shipment_processing: result["fresh_shipment_processing"] || 0 });
          this.setState({ auto_custody_transfer: result["auto_custody_transfer"] || 0 });
          this.setState({ mix_bag_processing: result["mix_bag_processing"] || 0 });
          this.setState({ unloading: result["unloading"] || 0 });
          this.setState({ bag_sort_to_connection: result["bag_sort_to_connection"] || 0 });
          this.setState({ ftl_bag_sort_to_connection: result["ftl_bag_sort_to_connection"] || 0 });
          this.setState({ ftl_unloading: result["ftl_unloading"] || 0 });
          this.setState({ carting_bag_sort_to_connection: result["carting_bag_sort_to_connection"] || 0 });
          this.setState({ carting_unloading: result["carting_unloading"] || 0 });
          this.setState({ cutoff: result["cutoff"] || 0 });
          this.setState({ enableUpdate: true })
          this.setState({ enableError: false });
          this.setState({ enableAlert: false });
          this.setState({ enableCreate: false });
          this.setState({ enableApiResponse: false });
          this.setState({ enableBulkSearch: false });
          this.setState({ enableBulkDownload: false });
        } else if (!responseData.success) {
          let alertMessage = responseData["errorMessage"]
          if (responseData["errors"]) {
            alertMessage += " " + responseData["errors"]["facilityId"]
            this.setState({ enableError: true });
            this.setState({ enableAlert: false });
            this.setState({ enableUpdate: false });
            this.setState({ enableCreate: false });
            this.setState({ enableApiResponse: false });
            this.setState({ enableBulkSearch: false });
            this.setState({ enableBulkDownload: false });
          }
          else {
            alertMessage = "Meta Data Not Exist for " + responseData["pk"]
            this.setState({ searchValue: searchInput });
            this.setState({ enableAlert: true })
            this.setState({ enableError: false })
            this.setState({ enableUpdate: false });
            this.setState({ enableCreate: false });
            this.setState({ enableApiResponse: false });
            this.setState({ enableBulkSearch: false });
            this.setState({ enableBulkDownload: false });
          }
          this.setState({ alertMessage: alertMessage })


        }
      }).catch(err => {
        // It will get executed, if there is any network issue
        console.log(err);
      })
  };


  faasAsyncApiCall = async (searchInput, record) => {
    let url = `https://api-facilities.delhivery.com/v1/partners/facilities/${searchInput}/meta/ExpectedPath/`;
    let data_to_update = {
      "data": {
        "proc_map": {
          "fresh_shipment_processing": record["fresh_shipment_processing"],
          "auto_custody_transfer": record["auto_custody_transfer"],
          "mix_bag_processing": record["mix_bag_processing"],
          "unloading": record["unloading"],
          "bag_sort_to_connection": record["bag_sort_to_connection"],
          "ftl_bag_sort_to_connection": record["ftl_bag_sort_to_connection"],
          "ftl_unloading": record["ftl_unloading"],
          "carting_bag_sort_to_connection": record["carting_bag_sort_to_connection"],
          "carting_unloading": record["carting_unloading"],
          "cutoff": record["cutoff"]
        }
      }
    }

    let req = {
      method: 'POST',
      body: JSON.stringify(data_to_update),
      headers: {
        'Content-Type': "application/json",
        'Accept': "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5ldHBsYW5fZXNfaW50ZWdyYXRpb24iLCJ0b2tlbl9uYW1lIjoibmV0cGxhbl9lc19pbnRlZ3JhdGlvbiIsImNlbnRlciI6WyJJTkQxMjIwMDNBQUIiXSwidXNlcl90eXBlIjoiTkYiLCJhcHBfaWQiOjY3LCJhdWQiOiIuZGVsaGl2ZXJ5LmNvbSIsImZpcnN0X25hbWUiOiJuZXRwbGFuX2VzX2ludGVncmF0aW9uIiwic3ViIjoidW1zOjp1c2VyOjpjOWU5NTcwNC1mYTAyLTExZTgtYTg5Yi0wNjg5YTJkOWYyZDQiLCJleHAiOjE3MDE4NTUwNTIsImFwcF9uYW1lIjoibmV0cGxhbl9lc19pbnRlZ3JhdGlvbiIsImFwaV92ZXJzaW9uIjoidjIifQ.Asv5ufx47u5BE6PSMyJEhZoc9jKMtXWvEekWIoh9-sE"
      }
    }
    return await fetch(url, req)
  };

  faasApiCall = (searchInput) => {
    let url = `https://api-facilities.delhivery.com/v1/partners/facilities/${searchInput}/meta/ExpectedPath/`;

    let data_to_update = {
      "data": {
        "proc_map": {
          "fresh_shipment_processing": this.state.fresh_shipment_processing,
          "auto_custody_transfer": this.state.auto_custody_transfer,
          "mix_bag_processing": this.state.mix_bag_processing,
          "unloading": this.state.unloading,
          "bag_sort_to_connection": this.state.bag_sort_to_connection,
          "ftl_bag_sort_to_connection": this.state.ftl_bag_sort_to_connection,
          "ftl_unloading": this.state.ftl_unloading,
          "carting_bag_sort_to_connection": this.state.carting_bag_sort_to_connection,
          "carting_unloading": this.state.carting_unloading,
          "cutoff": this.state.cutoff
        }
      }
    }

    let req = {
      method: 'POST',
      body: JSON.stringify(data_to_update),
      headers: {
        'Content-Type': "application/json",
        'Accept': "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5ldHBsYW5fZXNfaW50ZWdyYXRpb24iLCJ0b2tlbl9uYW1lIjoibmV0cGxhbl9lc19pbnRlZ3JhdGlvbiIsImNlbnRlciI6WyJJTkQxMjIwMDNBQUIiXSwidXNlcl90eXBlIjoiTkYiLCJhcHBfaWQiOjY3LCJhdWQiOiIuZGVsaGl2ZXJ5LmNvbSIsImZpcnN0X25hbWUiOiJuZXRwbGFuX2VzX2ludGVncmF0aW9uIiwic3ViIjoidW1zOjp1c2VyOjpjOWU5NTcwNC1mYTAyLTExZTgtYTg5Yi0wNjg5YTJkOWYyZDQiLCJleHAiOjE3MDE4NTUwNTIsImFwcF9uYW1lIjoibmV0cGxhbl9lc19pbnRlZ3JhdGlvbiIsImFwaV92ZXJzaW9uIjoidjIifQ.Asv5ufx47u5BE6PSMyJEhZoc9jKMtXWvEekWIoh9-sE"
      }
    }

    fetch(url, req)
      .then((response) => response.json())
      .then((responseData) => {
        let message = ""
        if (responseData.success) {
          let result = responseData["result"]
          let facility_id = result["facility_id"]
          let app_id = result["app_id"]
          message = "Created Meta Data for Facility Id: " + facility_id + "for App: " + app_id
          this.setState({ enableError: false });
          this.setState({ enableAlert: false });
          this.setState({ enableUpdate: false });
          this.setState({ enableCreate: false });
          this.setState({ enableApiResponse: true });
          this.setState({ enableBulkSearch: false });
          this.setState({ enableBulkDownload: false });
        } else if (!responseData.success) {
          let result = responseData["result"]
        }
        this.setState({ api_post_response: message });

      }).catch(err => {
        // It will get executed, if there is any network issue
        console.log(err);
      })
  };

  handleCSVData = (data, info) => {
    let isHeader = true
    let all_values = []
    let header_row = []

    for (var i = 0; i < data.length - 1; i++) {
      if (isHeader) {
        isHeader = false
        header_row = data[i];
        continue
      }

      var each_row = data[i];
      var record = {}, j, keys = header_row, values = each_row;
      for (j = 0; j < keys.length; j++) {
        if (!values[j] || values[j] === "") {
          debugger
          record[keys[j]] = 60.0;
        } else {
          record[keys[j]] = isNaN(values[j]) ? values[j] : parseFloat(values[j]);
        }
      }
      all_values.push(record);
    }

    let promise_list = []
    for (var i = 0; i < all_values.length; i++) {
      promise_list.push(this.faasAsyncApiCall(all_values[i]["facility_id"], all_values[i]));
    }

    // Wait for all promise to get completed be it error or be it success
    Promise.all(promise_list
      .map(p => p.catch(e => e.json())))
      .then(results => this.createBulkCSV(results)) // 1,Error: 2,3
      .catch(e => console.log(e));
  }

  renderBulkResponse() {
    return <div>
      <h2>Server Response of Bulk Update</h2>
      <br></br>
      <CSVLink data={this.state.bulkServerResponse} >Download Result</CSVLink>
    </div>;
  }

  renderBulk() {
    return <div>
      <h2>For bulk update, use CSV file</h2>
      <CSVReader onFileLoaded={(data, fileInfo) => this.handleCSVData(data, fileInfo)} />
      <CSVLink data={this.state.sampleData} >Sample File</CSVLink>
      <br></br>
    </div>;
  }

  renderSingleSearch() {
    return <div>
      <h1>Facility Meta Data for ExpectedPath</h1>
      <input
        name="text"
        type="text"
        placeholder="Search with Facility Code"
        onChange={event => this.handleOnChangeSearch(event)}
        value={this.state.searchValue}
      />
      <button onClick={this.handleSearch}>Search</button>
    </div>;
  }

  render() {
    return (
      <div id="main">
        {this.state.enableSingleSearch && this.renderSingleSearch()}
        <br></br>
        <br></br>
        {this.state.enableBulkSearch && this.renderBulk()}
        <br></br>
        {(this.state.enableUpdate || this.state.enableCreate) && this.renderKeys()}
        {this.state.enableError && this.renderError()}
        {this.state.enableAlert && this.renderAlert()}
        {this.state.enableApiResponse && this.renderApiResponse()}
        {this.state.enableBulkDownload && this.renderBulkResponse()}
      </div>
    );
  }
}

export default Search;
