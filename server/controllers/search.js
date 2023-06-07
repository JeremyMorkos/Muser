const express = require("express");
const router = express.Router();

const request = require("request");
const redirect_uri = "http://localhost:5173/api/search/callback";
const querystring = require("querystring");
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

const retrieveToken = async () => {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
  });
  const token = await response.json();
  return token;
};

router.get("/token", async (req, res) => {
  const token = await retrieveToken();
  res.json({ token: token.access_token });
});

router.get("/", async (req, res) => {
  const userSearch = req.query.q;
  const userToken = await retrieveToken();

  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${userSearch}&type=${
      req.query.type || "track"
    }`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken.access_token,
      },
    }
  );
  const result = await response.json();
  const user_id = req.session.user ? req.session.user.id : null;

  const newResult = result.tracks.items.map((item) => ({
    id: item.id,
    spotifyId: item.id,
    artist: item.artists[0].name,
    songName: item.name,
    albumImg: item.album.images[0].url,
    userId: user_id,
  }));

  return res.json(newResult);
});

// Add a new endpoint that simply returns req.session.user.token
router.get("/usertoken" , async (req,res) =>{
  return res.json({token: req.session.user.token})
})

// https://community.spotify.com/t5/Spotify-for-Developers/Adding-scope-to-Client-credentials-calls/td-p/5447360
// https://developer.spotify.com/documentation/web-api/tutorials/code-flow

// 1. authorize endpoint which redirects to Spotify
router.get("/authorise", async (req, res) => {
  // const state = generateRandomString(16);
  const scope = "user-read-private user-read-email streaming";
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: CLIENT_ID,
        scope: scope,
        redirect_uri: redirect_uri,
        // state: state,
      })
  );
});

router.get("/callback", async (req, res) => {
  console.log('Callback hit');

  // get the 'code' from the query params
  const code = req.query.code || null;

  // if (state === null) {
  //   res.redirect('/#' +
  //     querystring.stringify({
  //       error: 'state_mismatch'
  //     }));
  // } else {
  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      code: code,
      redirect_uri: redirect_uri,
      grant_type: "authorization_code",
    },
    headers: {
      Authorization:
        "Basic " +
        new Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64"),
    },
    json: true,
    // };
  };
  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      const access_token = body.access_token;
      req.session.user.token = access_token;
      // console.log("user token in backend" + req.session.user.token)
      return res.redirect('http://localhost:5173/profile');
    }
  });

});


/// todo later: Link/Unlink account buttons

module.exports = router;