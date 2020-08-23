module.exports = (req, res) => {
  return res.status(200).json({
    error: false,
    auth: false,
    token: null,
    user_name: null
  });
}