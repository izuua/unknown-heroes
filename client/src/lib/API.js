import axios from 'axios';

export default {
  Users: {
    login: function (email, password) {
      return axios.post('/api/users/login', { email, password });
    },

    create: function (email, password) {
      return axios.post('/api/users', { email, password });
    },

    getMe: function (authToken) {
      return axios.get('/api/users/me', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
    },
    getHeroes: function (id) {
      return axios.get(`/api/users/${id}`)
    }
  },
  
  Characters: {
    getCharacters: function() {
      return axios.get('/api/character')
    },
    getEnemies: function() {
      return axios.get('/api/character/enemies')
    }
  },

  Secrets: {
    getAll: function (authToken) {
      return axios.get('/api/secrets', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
    }
  },
  Monster: {
    getOne: function (name){
      return axios.get(`/api/monster${name}`)
    }
  },
  Hero: {
    getOne: function (name){
      return axios.get(`/api/hero${name}`)
    }
  },

  Battle: {
    battleStart: function(hero, enemy) {
      return axios.post('/api/battle/start', {hero, enemy})
    }
  }
  
}
