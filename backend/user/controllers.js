const SHA1 = require('sha1');
const { Token } = require("../libs");
const db = require("../db/db_config");

const UserController = {
  async login(req, res, next) {
    try {
      const body = req.body

      if (!(body.email && body.password)) {
        return res
        .status(400)
        .send("Email & Password is Required");
      }

      const query = 'SELECT email, fullname, token FROM user WHERE email = ? AND password = ?';
      db.query(query, [body.email, SHA1(body.password)], (error, results, fields) => {
        if (error) {
          console.error('Error executing query:', error);
          return res.status(500).json({ error: { message: 'An error occurred while attempting to log in.' } });
        }

        if (results.length === 1) {
          const user = results[0]
          user['token'] = Token.generateJWTToken(user)
          return res.status(200).json(user);
        } else {
          return res.status(401).json({ error: { message: 'You have entered an invalid email or password.' } });
        }
      });
    } catch (error) {
      next(error);
    }
  },
}

module.exports = UserController;