const bcrypt = require("bcrypt");

const saltRounds = 15;

generate = (plaintTextPassword) => {
  return bcrypt.hashSync(plaintTextPassword, saltRounds);
};

compare = (plaintTextPassword, hash) => {
  return bcrypt.compareSync(plaintTextPassword, hash);
};

module.exports = {
  compare,
  generate,
};
