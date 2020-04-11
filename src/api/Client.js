export default class Client {
  constructor() {
    if (process.env.PRODUCTION === 'true') {
      this.apiUrl = 'http://enc-dec-api.herokuapp.com/';
    } else {
      this.apiUrl = 'http://127.0.0.1:5000/';
      // this.apiUrl = 'http://enc-dec-api.herokuapp.com/';
    }
  }

  async get(resource, params=null) {
    let url = `${this.apiUrl}${resource}`;
    if (params) {
      const URLparams = new URLSearchParams();
      params.forEach(param => URLparams.append(param[0], param[1]));
      url += `?${URLparams.toString()}`;
    }
    const response = await fetch(url);

    return response.json();
  }

  async post(resource, payload) {
    const response = await fetch(`${this.apiUrl}${resource}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(payload)
    });
    
    return response.json();
  }
}