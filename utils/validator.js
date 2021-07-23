class Validator {
  isValidObject(JSONObject) {
    try {
      const parsedObject = JSON.parse(JSONObject);
    } catch (parseError) {
      return false;
    }
    return true;
  }
}

module.exports = {Validator: Validator};
