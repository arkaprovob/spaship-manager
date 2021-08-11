const website = require('../../models/website')

module.exports = async function getWebsiteList(req, res) {
  try {
    const response = await fetchResponse();
    response.forEach((item, i) => {
      item.id = i++;
    });
    res.send(response);
  } catch (e) {
    return { "Error": e }; zz
  }
}

async function fetchResponse() {
  return await website.aggregate([
    {
      '$group': {
        '_id': {
          'websiteName': '$websiteName'
        }
      }
    }, {
      '$project': {
        '_id': 0,
        'websiteName': '$_id.websiteName'
      }
    },
    {
      $sort: { websiteName: 1 }
    }
  ]);
}
