import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import Startup from './StartupShow';
import BackButton from '../utility/BackButton';
import Auth from '../../lib/Auth';

export default class StartupShow extends Component {

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
      fundingtype: '',
      id: ''
    }
  }

  deleteStartup = () => {
    Axios
      .delete(`/api/startups/${this.props.match.params.id}`, {
        headers: {'Authorization': `Bearer ${Auth.getToken()}`}
      })
      .then(() => this.props.history.push('/startups'))
      .catch(err => console.log(err));
  }

  componentDidMount(){
    console.log(this);
    Axios
      .get(`/api/startups/${this.props.match.params.id}`, {
        headers: {'Authorization': `Bearer ${Auth.getToken()}`}
      })
      .then(res => this.setState({ startup: res.data }))
      .catch(err => console.log(err));
  }

  render(){
    return(
      <div>
        <h1>Show page</h1>
        <BackButton />
        { ( Auth.isAuthenticated() && ( Auth.getCurrentUser() === this.state.startup.createdBy ) ) && <Link to={`/startups/${this.state.startup.id}/edit`}>
          <p>Edit</p>
        </Link> }
        {' '}
        { ( Auth.isAuthenticated() && ( Auth.getCurrentUser() === this.state.startup.createdBy ) ) && <button onClick={this.deleteStartup}>
          Delete
        </button> }
        { this.state.startup && <Startup {...this.state.startup}/> }
      </div>
    );
  }

}
