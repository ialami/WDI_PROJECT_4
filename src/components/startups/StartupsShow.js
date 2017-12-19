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
      id: '',
      createdBy: ''
    },
    byUser: ''
  }

  deleteStartup = () => {
    Axios
      .delete(`/api/startups/${this.props.match.params.id}`, {
        headers: {'Authorization': `Bearer ${Auth.getToken()}`}
      })
      .then(() => this.props.history.push('/startups'))
      .catch(err => console.log(err));
  }

  getStartup(){
    Axios
      .get(`/api/startups/${this.props.match.params.id}`, {
        headers: {'Authorization': `Bearer ${Auth.getToken()}`}
      })
      .then(res => this.setState({ startup: res.data }))
      .then(() => {
        const createdBy = this.state.startup.createdBy;
        Axios
          .get(`/api/users/${createdBy}`, {
            headers: { Authorization: `Bearer ${Auth.getToken()}`}
          })
          .then(res => this.setState({ byUser: res.data }))
          .catch(err => console.error(err));
      })
      .catch(err => console.log(err));
  }

  componentDidMount(){
    this.getStartup();
  }

  render(){
    // console.log(this.state);
    return(
      <div>
        { ( this.state.startup && this.state.byUser ) && <Startup {...this.state.startup} deleteStartup={this.deleteStartup} user={this.state.byUser}/> }
      </div>
    );
  }

}
