const setLoginToken = (user, statusCode, res) => {
  const JWT_Token = user.getJWTToken();

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", JWT_Token, cookieOptions).json({
    success: true,
    user,
    JWT_Token,
  });
};

export default setLoginToken;
