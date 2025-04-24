const functions = require("firebase-functions");
const admin = require("firebase-admin");
const authRoutes = require("./auth");
const itemRoutes = require("./items");

admin.initializeApp();
const db = admin.firestore();

exports.api = functions.https.onRequest((req, res) => {
  if (req.path.startsWith("/auth")) return authRoutes(req, res);
  if (req.path.startsWith("/items")) return itemRoutes(req, res);
  return res.status(404).send("Not found");
});