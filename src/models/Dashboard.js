const mongoose = require('mongoose');

const DashboardSchema = new mongoose.Schema({
  date: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  loja: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Loja'
  }
});

module.exports = mongoose.model('Dashboard', DashboardSchema);