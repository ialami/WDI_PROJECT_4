import React, { Component } from 'react';
import Axios from 'axios';
import StartupsForm from './StartupsForm';
import BackButton from '../utility/BackButton';
import Auth from '../../lib/Auth';

export default class StartupsEdit extends Component {

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

  componentDidMount() {
    Axios
      .get(`/api/startups/${this.props.match.params.id}`, {
        headers: {'Authorization': `Bearer ${Auth.getToken()}`}
      })
      .then(res => this.setState({ startup: res.data }))
      .catch(err => console.log(err));
  }

  handleChange = ({ target: { name, value } }) => {
    const startup = Object.assign({}, this.state.startup, { [name]: value } );
    const errors = Object.assign({}, this.state.errors, { [name]: '' });
    this.setState({ startup, errors });
  }

  handleSubmit = e => {
    e.preventDefault();

    Axios
      .put(`/api/startups/${this.props.match.params.id}`, this.state.startup, {
        headers: {'Authorization': `Bearer ${Auth.getToken()}`}
      })
      .then(() => this.props.history.push(`/startups/${this.props.match.params.id}`))
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }

  render(){
  console.log(this);
    return(
      <div>
        <h1>Edit startup</h1>
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
