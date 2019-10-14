const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    jwt: {
      secret: 'lolkekcheburek',
      accessTokenExpiresIn: '1h',
      refreshTokenExpiresIn: '2d',
    },
    password: {
      salt: 10,
    },
  },
  test: {},
  production: {},
};

module.exports = config[env];
