const { httpGet } = require("./mock-http-interface");

const generateResult = (response) => {
  try {
    const { message } = JSON.parse(response.body);

    if (response.status === 200) {
      return { "Arnie Quote": message };
    }

    return { FAILURE: message };
  } catch (err) {
    return { FAILURE: err?.message };
  }
};

const getArnieQuotes = async (urls) => {
  const requests = urls.map(httpGet);
  const responses = await Promise.all(requests);

  return responses.map(generateResult);
};

module.exports = {
  getArnieQuotes,
};
