import express from "express";
import cors from "cors";
import SpotifyWebApi from "spotify-web-api-node";
import 'dotenv/config'



const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken;
  console.log(refreshToken)
  const spotifyapi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken,
  });

  spotifyapi
    .refreshAccessToken()
    .then((data) => {
      console.log(data)
      res.json({
        accessToken: data.body.access_token,
        expiresIn: data.body.expires_in,
        refreshToken:data.body.refresh_token
      });
    })
    .catch((err) => console.log(err));
});

app.post("/api/login",async (req, res) => {
  console.log(req.body)
  console.log(process.env.REDIRECT_URI)
  console.log(process.env.CLIENT_ID)
  console.log(process.env.CLIENT_SECRET)


   const code =await req?.body?.code;
   if (code) {
     const spotifyapi = new SpotifyWebApi({
       redirectUri: "http://localhost:5173/Home",
       clientId: "0618afd842f04361b7cc7815dbf1cfda",
       clientSecret: "b01d6d71afc54f9c8787c34a04b4be27"
     });
    
     await spotifyapi
       .authorizationCodeGrant(code)
       .then((data) => {
         console.log(data, "ye access token kai liye");
         res.json({
           accessToken: data.body.access_token,
           refreshToken: data.body.refresh_token,
           expiresIn: data.body.expires_in,
         });
       })
       .catch((err) => console.log(err, "ye access token ka error"));
   }

});

app.listen(8080, () => {
  console.log("Server Conected at port 8080");
});
