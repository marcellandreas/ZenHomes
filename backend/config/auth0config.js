import { auth } from "express-oauth2-jwt-bearer";

const jwtCheck = auth({
  audience: "http://localhost:4000",
  issuerBaseURL: "https://dev-g3n723l50j4udb27.jp.auth0.com/",
  tokenSigningAlg: "RS256",
});

export default jwtCheck;
