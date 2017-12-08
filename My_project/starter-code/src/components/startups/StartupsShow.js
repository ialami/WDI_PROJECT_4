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
        { this.state.startup && <Startup {...this.state.startup} deleteStartup={this.deleteStartup}/> }
      </div>
    );
  }

}
