function basicAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  console.log("AuthHeader", authHeader);

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const encodedCredentials = authHeader.split(' ')[1];
  const decodedCredentials = Buffer.from(encodedCredentials, "base64").toString(
    "utf-8"
   );
}
