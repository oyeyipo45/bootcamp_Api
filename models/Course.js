const mongoose = require('mongoose');
const Bootcamp = require('./Bootcamp');

mongoose.Promise = global.Promise;


const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please add a course title"],
  },
  description: {
    type: String,
    required: [true, "Please add a description"],
  },
  weeks: {
    type: String,
    requires: [true, "Please add a number of weeks"],
  },
  tuition: {
    type: Number,
    required: [true, "Please add a tution cost"],
  },
  minimumSkill: {
    type: String,
    required: [true, "Please add a minumun skill"],
    enum: ["beginner", "intermediate", "advanced"],
  },
  scholarshipAvailable: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: "Bootcamp",
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

//static method to get average of tuition
CourseSchema.statics.getAverageCost = async function (bootcampId) {
  const averageCostArray = await this.aggregate([
    {
      $match: { bootcamp: bootcampId },
    },
    {
      $group: {
        _id: '$bootcamp',
        averageCost: { $avg: '$tuition' },
      },
    },
  ]);

  try {
    if (averageCostArray[0]) {
      await this.model('Bootcamp').findByIdAndUpdate(bootcampId, {
        averageCost: Math.ceil(averageCostArray[0].averageCost / 10) * 10,
      });
    } else {
      await this.model('Bootcamp').findByIdAndUpdate(bootcampId, {
        averageCost: undefined,
      });
    }
  } catch (err) {
    console.error(err);
  }
};

//call average cost after save
CourseSchema.post('save', function () {
  this.constructor.getAverageCost(this.bootcamp);
});

//call average cost before remove
CourseSchema.pre('remove', function () {
  this.constructor.getAverageCost(this.bootcamp);
});

module.exports = mongoose.model('Course', CourseSchema);
