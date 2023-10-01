const mongoose = require("mongoose");

const schema = mongoose.Schema;

const agentSchema = new schema({
  name: {
    type: String,
    require,
  },
  jobtype: {
    type: String,
    require,
  },
  age: {
    type: String,
    require,
  },
  address: {
    type: String,
    require,
  },
  assign: {
    type: String,
  },
});

const agent = mongoose.model("agent", agentSchema);

module.exports = agent;
