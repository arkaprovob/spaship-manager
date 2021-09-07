
const mongoose = require('mongoose');
const eventTimeTrace = require('../../models/eventTimeTrace');
const website = require('../../models/website');
const event = require('../../models/event');

module.exports = async function clearData(req, res) {
  try {
    if (req.body.collection == 'website') {
      website.deleteMany({});
    }
    else if (req.body.collection == 'eventTimeTrace') {
      eventTimeTrace.deleteMany();
    }
    else if (req.body.event == 'event'){
      eventTimeTrace.deleteMany();
    }
    res.status(200).json({ "Message": "Collection deleted successfully" })
  } catch (e) {
    console.log(e);
    res.status(200).json({ "Error": e })
  };
}