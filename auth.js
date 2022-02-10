var SpotifyWebApi = require('spotify-web-api-node')

var scopes = ['user-read-private', 'user-read-email'],
  redirectUri = 'https://example.com/callback',
  clientId = '4557bed5fb3843afb6d99be512588fbb',
  state = 'some-state-of-my-choice';

// Setting credentials can be done in the wrapper's constructor, or using the API object's setters.
var spotifyApi = new SpotifyWebApi({
  redirectUri: redirectUri,
  clientId: clientId
});

// Create the authorization URL
var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);

// https://accounts.spotify.com:443/authorize?client_id=5fe01282e44241328a84e7c5cc169165&response_type=code&redirect_uri=https://example.com/callback&scope=user-read-private%20user-read-email&state=some-state-of-my-choice
console.log(authorizeURL);

// spotifyApi.refreshAccessToken().then(
//     function(data) {
//       console.log('The access token has been refreshed!');
  
//       // Save the access token so that it's used in future calls
//       spotifyApi.setAccessToken(data.body['access_token']);
//     },
//     function(err) {
//       console.log('Could not refresh access token', err);
//     }
//   );