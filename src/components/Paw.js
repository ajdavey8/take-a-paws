import React, { Component } from 'react';
import axios from 'axios';

class Paw extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pawed: "paw",
      status: null,
      pawId: ""
    }
  this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    let self=this;
    let userIden = sessionStorage.getItem('id');
    let dogIden =self.props.dogId;
    fetch(`http://localhost:3001/api/users/${userIden}/${dogIden}/requests`)
      .then(function(results) {
        return results.json();
      })
      .then(function(data){
          if (data.length > 0) {
            self.setState({
              pawed: 'pawed',
              pawId: data[0].id
            })
          }

      })
      .catch(function(error) {
        console.log(error)
      });
  }

  handleClick() {
    let status = "pending";
    let userIden = sessionStorage.getItem('id');
    let dogIden = this.props.dogId;
    let pawIden = this.state.pawId;

    if (this.state.pawed === "paw" ) {
      axios.post(`http://localhost:3001/api/users/${userIden}/${dogIden}/requests`, { status, userIden, dogIden })
      .then((response) => this.setState({ status: "pending" }));
      this.setState({pawed: 'pawed'});
    } else {
      axios.delete(`http://localhost:3001/api/requests/${pawIden}`)
      .then((response) => this.setState({ status: null, pawed: 'paw'}));
    }
  }

  render() {
    return (
      <button className="paw" onClick={this.handleClick}>
        {this.state.pawed}
      </button>
    );
  }
}
export default Paw;
