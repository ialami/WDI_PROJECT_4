import React, { Component } from 'react';
import Axios from 'axios';
import StartupsForm from './StartupsForm';
import BackButton from '../utility/BackButton';
import Auth from '../../lib/Auth';

export default class StartupsNew extends Component {

  state = {
    startup: {
      name: '',
      description: '',
      industry: '',
      founders: '',
      date: '',
      country: '',
      image: '',
      incubator: '',
      partnering: '',
      website: '',
      fundingtype: ''
    },
    errors: {}
  }

  handleChange = ({ target: { name, value } }) => {
    const startup = Object.assign({}, this.state.startup, { [name]: value } );
    const errors = Object.assign({}, this.state.errors, { [name]: '' });
    this.setState({ startup, errors });
  }

  handleSubmit = e => {
    e.preventDefault();

    Axios
      .post('/api/startups', this.state.startup, {
        headers: {'Authorization': `Bearer ${Auth.getToken()}`}
      })
      .then(() => this.props.history.push('/startups'))
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }

  render(){
    return(
      <div>
        <h1>Add a new start-up</h1>
        <BackButton />
        <StartupsForm
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          startup={this.state.startup}
          errors={this.state.errors}
        />
      </div>
    );
  }

}
