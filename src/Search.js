import React, { Component } from "react";
import "./Search.css";

class Search extends Component {
  state = {
    searchValue: "",
    facilityMeta: {},
    update_entry:{},
    create_entry:{}
  };

  handleOnChange = event => {
    this.setState({ searchValue: event.target.value });
  };

  handleSearch = () => {
    this.updateApiCall(this.state.searchValue);
  };


  makeApiCall = searchInput => {
    let url = `https://api-facilities.delhivery.com/v1/partners/facilities/${searchInput}/meta/ExpectedPath/`;
    
    let req = {
      method: 'GET', 
      headers: {
        'Content-Type': "application/json",
        'Accept': "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5ldHBsYW5fZXNfaW50ZWdyYXRpb24iLCJ0b2tlbl9uYW1lIjoibmV0cGxhbl9lc19pbnRlZ3JhdGlvbiIsImNlbnRlciI6WyJJTkQxMjIwMDNBQUIiXSwidXNlcl90eXBlIjoiTkYiLCJhcHBfaWQiOjY3LCJhdWQiOiIuZGVsaGl2ZXJ5LmNvbSIsImZpcnN0X25hbWUiOiJuZXRwbGFuX2VzX2ludGVncmF0aW9uIiwic3ViIjoidW1zOjp1c2VyOjpjOWU5NTcwNC1mYTAyLTExZTgtYTg5Yi0wNjg5YTJkOWYyZDQiLCJleHAiOjE3MDE4NTUwNTIsImFwcF9uYW1lIjoibmV0cGxhbl9lc19pbnRlZ3JhdGlvbiIsImFwaV92ZXJzaW9uIjoidjIifQ.Asv5ufx47u5BE6PSMyJEhZoc9jKMtXWvEekWIoh9-sE"
      }}

    fetch(url,req)
    .then((response) => response.json())
    .then((responseData) => {
      if ( responseData.success){
        let result = responseData["result"]["data"]["proc_map"]
        this.setState({ facilityMeta: result });
      }}).catch(err => {
        console.log(err);
      })
  };

  createApiCall = searchInput => {
    let url = `https://api-facilities.delhivery.com/v1/partners/facilities/${searchInput}/meta/ExpectedPath/`;
    
    let data_to_update = {
      "data": {
        "proc_map" : {
        "fresh_shipment_processing" : 120,
        "auto_custody_transfer" : 0,
        "mix_bag_processing" : 180,
        "unloading" : 0,
        "bag_sort_to_connection" : 0,
        "ftl_bag_sort_to_connection" : 0,
        "ftl_unloading" : 0,
        "carting_bag_sort_to_connection" : 0,
        "carting_unloading" : 0
    }}}

    let req = {
      method: 'POST', 
      body: JSON.stringify(data_to_update),
      headers: {
        'Content-Type': "application/json",
        'Accept': "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5ldHBsYW5fZXNfaW50ZWdyYXRpb24iLCJ0b2tlbl9uYW1lIjoibmV0cGxhbl9lc19pbnRlZ3JhdGlvbiIsImNlbnRlciI6WyJJTkQxMjIwMDNBQUIiXSwidXNlcl90eXBlIjoiTkYiLCJhcHBfaWQiOjY3LCJhdWQiOiIuZGVsaGl2ZXJ5LmNvbSIsImZpcnN0X25hbWUiOiJuZXRwbGFuX2VzX2ludGVncmF0aW9uIiwic3ViIjoidW1zOjp1c2VyOjpjOWU5NTcwNC1mYTAyLTExZTgtYTg5Yi0wNjg5YTJkOWYyZDQiLCJleHAiOjE3MDE4NTUwNTIsImFwcF9uYW1lIjoibmV0cGxhbl9lc19pbnRlZ3JhdGlvbiIsImFwaV92ZXJzaW9uIjoidjIifQ.Asv5ufx47u5BE6PSMyJEhZoc9jKMtXWvEekWIoh9-sE"
      }}

    fetch(url,req)
    .then((response) => response.json())
    .then((responseData) => {
      if ( responseData.success){
        let result = responseData["result"]
        let facility_id = result["facility_id"]
        let app_id = result["app_id"]
        let update_data = {"app_id": app_id, "facility_id": facility_id}
        this.setState({ update_entry: update_data });
      }}).catch(err => {
        console.log(err);
      })
  };

  updateApiCall = searchInput => {
    let url = `https://api-facilities.delhivery.com/v1/partners/facilities/${searchInput}/meta/ExpectedPath/`;
    let data_to_update = { 
      "data": {
        "proc_map" : {"fresh_shipment_processing": 160, "carting_unloading" : 100,
        "bag_sort_to_connection" : 100,
      }}
      }
    
    let req = {
    method: 'PATCH', 
    body: JSON.stringify(data_to_update),
    headers: {
      'Content-Type': "application/json",
      'Accept': "application/json",
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5ldHBsYW5fZXNfaW50ZWdyYXRpb24iLCJ0b2tlbl9uYW1lIjoibmV0cGxhbl9lc19pbnRlZ3JhdGlvbiIsImNlbnRlciI6WyJJTkQxMjIwMDNBQUIiXSwidXNlcl90eXBlIjoiTkYiLCJhcHBfaWQiOjY3LCJhdWQiOiIuZGVsaGl2ZXJ5LmNvbSIsImZpcnN0X25hbWUiOiJuZXRwbGFuX2VzX2ludGVncmF0aW9uIiwic3ViIjoidW1zOjp1c2VyOjpjOWU5NTcwNC1mYTAyLTExZTgtYTg5Yi0wNjg5YTJkOWYyZDQiLCJleHAiOjE3MDE4NTUwNTIsImFwcF9uYW1lIjoibmV0cGxhbl9lc19pbnRlZ3JhdGlvbiIsImFwaV92ZXJzaW9uIjoidjIifQ.Asv5ufx47u5BE6PSMyJEhZoc9jKMtXWvEekWIoh9-sE"
    }}

    fetch(url,req)
    .then((response) => response.json())
    .then((responseData) => {
      if ( responseData.success){
        let result = responseData["result"]
        let facility_id = result["facility_id"]
        let app_id = result["app_id"]
        let create_data = {"app_id": app_id, "facility_id": facility_id}
        this.setState({ create_entry: create_data });

      }}).catch(err => {
        console.log(err);
      })
  };

  renderKeys () { 
	  const firstObject = Object.keys(this.state.facilityMeta);
	  console.log(firstObject)
	  return firstObject.map(key => { 
		  return <form key = {key}>
             <label>{key}</label>
             <input 
             name="text" 
             type="text" 
             value={this.state.facilityMeta[key]}/>
            </form>; 
            }); 
  };
  
  renderUpdateKeys () { 
	  const firstObject = Object.keys(this.state.update_entry);
	  console.log(firstObject)
	  return firstObject.map(key => { 
		  return <div key = {key}>
            <h2>Created Entry in FAAS for {key}</h2>
            <h3>{this.state.update_entry[key]}</h3> 
          </div>; 
            }); 
  };

  renderCreateKeys () { 
	  const firstObject = Object.keys(this.state.create_entry);
	  console.log(firstObject)
	  return firstObject.map(key => { 
		  return <div key = {key}>
             <h2>Created Entry in FAAS for {key}</h2>
             <h3>{this.state.create_entry[key]}</h3> 
            </div>; 
            }); 
  };

  render() {
    return (
      <div id="main">
        <h1>Update/Create Facility Meta Data for ExpectedPath</h1>
        <input
          name="text"
          type="text"
          placeholder="Search with Facility Code"
          onChange={event => this.handleOnChange(event)}
          value={this.state.searchValue}
        />
        <button onClick={this.handleSearch}>Search</button>
	  {this.state.facilityMeta && this.renderKeys()}
    {this.state.create_entry && this.renderCreateKeys()}
    {this.state.update_entry && this.renderUpdateKeys()}
	</div>
    );
  }
}

export default Search;
