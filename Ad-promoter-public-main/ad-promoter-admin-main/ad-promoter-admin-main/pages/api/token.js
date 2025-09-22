export default function handler(req, res) {
  const userToken = JSON.parse(localStorage.getItem('user'));

  res.status(200).json({ token: userToken });
}
