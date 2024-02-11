require('dotenv').config();

let { JWT_SECRET_KEY } = process.env;
const senhaToken = JWT_SECRET_KEY;

module.exports = senhaToken;