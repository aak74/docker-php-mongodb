const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectsSchema = new Schema({
  name: String,
  url: String,
  status: String,
}, {
  collection: 'projects',
  timestamps: true
});

module.exports = mongoose.model('Projects', ProjectsSchema);
