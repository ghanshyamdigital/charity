const expressJwt = require('express-jwt');
import config from '../config/config.dev'

import User from '../models/admin/user'

module.exports = jwt;

function jwt () {
    const secret = config.secret;
  return expressJwt({secret, getToken}).unless({
    path: [
        // public routes that don't require authentication
        '/admin/authenticate',
        '/admin/register',
        '/admin/login',
        '/',
        '/contactUs',
        '/volunteer',
        '/volunteer/registration',
        '/causes',
        '/causes-detail',
        '/causes-detail-with-sidebar',
        '/donation',
        '/external.html',
        '/portfolio',
        '/portfolio-detail',
        '/blog-full-width',
        '/blog-full-width-details',
        '/our-story',
        '/our-mission',
        '/gallery',
        '/gallery-two-column',
        '/launch',
        '/events',
        '/event-details',

    ]
  })
}

async function isRevoked (req, payload, done) {
    const user = await User.getById(payload.sub);

  // revoke token if user no longer exists
  if (!user) {
    return done(null, true)
  }

  done()
}

const getToken = (req) => {
  return req.cookies.token;
};

