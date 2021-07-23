class Validator {
  isValidObject(JSONObject) {
    try {
      const parsedObject = JSON.parse(JSONObject);
    } catch (parseError) {
      return false;
    }
    return true;
  }

  isValidUser(JSONObject) {
    if (this.isValidObject(JSONObject)) {
      const parsedObject = JSON.parse(JSONObject);
      return 'email' in parsedObject && 'firstName' in parsedObject &&
        'lastName' in parsedObject && 'password' in parsedObject;
    } else {
      return false;
    };
  }
}

module.exports = {Validator: Validator};
