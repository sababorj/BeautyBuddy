import axios from 'axios';
export default {
  // Gets a single user by id
  getUser: (id) => {
    return axios.get(`/api/user/${id}`);
  },
  // sign up a user to our service
  signUpUser: (username, email, password) => {
    return axios.post('api/signup', { username: username, email: email, password: password });
  },

  productResult: [],
  callMakeUp: function (category) {
    return new Promise((resolve, reject) => {
      const queryUrl = `https://makeup-api.herokuapp.com/api/v1/products.json?product_type=${category}`;
      // const promise = new Promise(res, rej)
      axios.get(queryUrl)
        .then(response => {
          for (let i = 0; i < 6; i++) {
            this.productResult.push(response.data[i])
            // console.log(this.productResult)
          }
          resolve(this.productResult);
        })
        .catch(error => {
          console.log(error);
          reject(error);
        })
    })
  },

  itemCall: function (category) {
    return new Promise((resolve, reject) => {
      const itemMap = new Map();
      itemMap.set('Eye', 'mascara');
      itemMap.set('Skin', 'foundation');
      itemMap.set('Nail', 'nail_polish');
      itemMap.set('Lip', 'lipstick');
  
      this.callMakeUp(itemMap.get(category)).then(data => {
        console.log(this.productResult)
        resolve(this.productResult);
      });
    });
    

  }
};