function globalToJSON(schema) {
  schema.set('toJSON', {
    getters: true,
    setters: true,
    virtuals: true,
    transform(obj, json) {
      delete json.__v;
      delete json.password;
      delete json.passwordConfirmation;
      delete json._id;
    }
  });
}

module.exports = globalToJSON;
