// import mongoose from 'mongoose';

// const subscriptionSchema = new mongoose.Schema({
//   dailyMealPrice: {
//     type: Number,
//     required: true,
//   },
//   weeklyMealPrice: {
//     type: Number,
//     required: true,
//   },
//   monthlyMealPrice: {
//     type: Number,
//     required: true,
//   },
//   trialMealPrice: {
//     type: Number,
//     required: true,
//   },
//   onGoingDiscount: {
//     type: Boolean,
//     default: false,
//   },
//   discountOffer: {
//     type: String,
//     default: '',
//     trim: true,
//   },
//   messId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Mess', // assuming you have a Mess model
//     required: true,
//   },
//   studentId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'student', // assuming you have a Student model
//     required: true,
//   },   
// }, {
//   timestamps: true,
// });

// export const Subscription = mongoose.model('Subscription', subscriptionSchema);


import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
  name : { 
    type: String,  
    enum : ["daily" , "weekly" , "monthly" , "trial"],
    lowercase : true
  },
  price : {
    type: Number,
  },
  // trialMealPrice: {
  //   type: Number
  // },
  onGoingDiscount: {
    type: Boolean,
    default: false,
  },
  discountOffer: {
    type: String,
    default: '',
    trim: true,
  },
  mealType : {
    type : Number,
    enum : [1 , 2]
  } ,
  description : {
    type : String,
  },
  messId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mess', 
    //required: true,
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'student'
  },   
}, {
  timestamps: true,
});

export const Subscription = mongoose.model('Subscription', subscriptionSchema);


