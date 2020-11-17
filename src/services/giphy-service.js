export default class GiphyService {  
  static async getGif(query, limit) {
    return fetch(`http://api.giphy.com/v1/gifs/search?q=${query}&api_key=${process.env.GIPHY_API_KEY}&limit=${limit}`)
      .then(function(response) {
      if (!response.ok) {
        throw Error(response.status);
      }
      return response.json();
    })
    .catch(function(error) {
      return Error(error);
    }) 
  }
  static async getTrending(limit) {
    return fetch(`http://api.giphy.com/v1/gifs/trending&api_key=${process.env.GIPHY_API_KEY}&limit=${limit}`)
      .then(function(response) {
      if (!response.ok) {
        throw Error(response.status);
      }
      return response.json();
    })
    .catch(function(error) {
      return Error(error);
    }) 
  }
}
// https://api.giphy.com/v1/gifs/trending?api_key=XGyxvuC7OvEN89wRUTCfDcK9n0riKngF&limit=25&rating=g