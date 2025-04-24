module.exports = (req, res) => {
  if (req.method === "GET" && req.path === "/items") {
    // Handle item listing logic here
    return res.status(200).json([{ id: 1, name: "Panadol" }]);
  }
  res.status(404).send("Items route not found");
};