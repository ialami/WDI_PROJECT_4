const mongoose   = require('mongoose');
mongoose.Promise = require('bluebird');

const { dbURI }  = require('../config/environment');
const User       = require('../models/user');
const StartUp    = require('../models/startup');

const startUpData = [{
  name: 'VConnect',
  description: '"VConnect helps you hire local professionals for all your service needs. From repairing your car to planning your wedding, we’ll connect you with the best service businesses to get things done." - VConnect',
  industry: 'Service marketplace',
  founders: 'Tolaram Group',
  date: 2010,
  country: 'Nigeria',
  vision: 'The leading business discovery and     engagement platform in Africa.',
  mission: 'To simplify engagement between users and consumer service businesses in Africa.',
  image: 'https://upload.wikimedia.org/wikipedia/commons/4/44/VConnect_new_Logo.png',
  incubator: 'None.',
  partnering: 'Looking for a partner for operations in South America',
  website: 'https://www.vconnect.com/',
  fundingtype: 'Series C'
},{
  name: 'Flutterwave',
  description: '"We provide the underlying technology platform that allows businesses to make and accept payments anywhere in Africa." - Flutterwave',
  industry: 'Fin-tech',
  founders: 'Iyinoluwa Aboyeji',
  date: 2016,
  country: 'Kenya, Ghana, South Africa and Nigeria',
  vision: 'Flutterwave drives growth for banks and businesses across Africa through digital payment technology.',
  mission: 'To power a new wave of prosperity across Africa',
  image: 'https://outrepreneurs.com/wp-content/uploads/2017/08/Flutterwave-Logo.png',
  incubator: 'None.',
  partnering: 'Looking for a partner for operations in Asia',
  website: 'https://www.flutterwave.com/',
  fundingtype: 'Series A'
},{
  name: 'LIfeQ',
  description: '"LifeQ wants people from all walks of life to enjoy optimal health. We implement a unique multidisciplinary approach underpinned by in depth knowledge and understanding of human physiology and systems biology to extract and deliver relevant and meaningful person-specific digital biomarkers from various curated data sources." - LifeQ',
  industry: 'Health',
  founders: 'Laurence Olivier, Riaan Conradie, Franco du Preez and Kora Holm',
  date: 2014,
  country: 'South Africa',
  vision: '"We are a world leading science and technogology company that wants people from all walks of life to enjoy optimal health" - LifeQ',
  mission: 'Maximise people\'s health',
  image: 'http://ventureburn.com/wp-content/uploads/2015/01/clipular-2.png',
  incubator: 'None.',
  partnering: 'Looking for a partner for operations in Senegal',
  website: 'https://www.lifeq.com/',
  fundingtype: 'Series B'
}];

const userData = [{
  fullName: 'Ismail Alami',
  username: 'Isma',
  email: 'ismail@ismail.com',
  password: 'password',
  passwordConfirmation: 'password'
}];

mongoose.connect(dbURI, { useMongoClient: true })
  .then(db => db.dropDatabase())
  .then(() => User.create(userData))
  .then(users => {
    console.log(`${users.length} users created`);
    return StartUp.create(startUpData);
  })
  .then(startUps => console.log(`${startUps.length} start-ups created!`))
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
