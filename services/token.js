const jwt = require('jsonwebtoken');
class Token {
    generate(payload) {
        const accessToken = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });
        return accessToken;
    }

    verifyToken(token) {
        try {
            return jwt.verify(token, process.env.SECRET_KEY);
        } catch (error) {
            return null;
        }
    }

}

module.exports = new Token