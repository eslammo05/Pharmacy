module.exports = (req, res) => {
  if (req.method === "POST" && req.path === "/auth/register") {
    // Handle user registration logic here
    return res.status(200).send("User registered");
  }
  res.status(404).send("Auth route not found");
};