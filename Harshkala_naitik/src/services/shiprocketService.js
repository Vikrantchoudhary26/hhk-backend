const axios = require('axios');

const loginUrl = "https://apiv2.shiprocket.in/v1/external/auth/login";
const trackOrderUrl = "https://apiv2.shiprocket.in/v1/external/courier/track";


const loginData = {
  email: "harshhasthkala@yopmail.com",
  password: "Dikshant@1137"
};

axios.post(loginUrl, loginData, {
  headers: {
    'Content-Type': 'application/json'
  }
})
  .then(response => {
    const token = response.data.token;
    console.log(token);
  })
  .catch(error => {
    console.error(error);
  });


  const trackOrder = async (orderId, token) => {
    try {
      const response = await axios.get(`${trackOrderUrl}?order_id=${orderId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  module.exports = {
    trackOrder
  };