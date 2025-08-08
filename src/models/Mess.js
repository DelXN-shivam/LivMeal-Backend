// // import mongoose from 'mongoose';

// // const messSchema = new mongoose.Schema({
// //   messName: {
// //     type: String,
// //     // required: true,
// //     trim: true,
// //   },
// //   messOwnerName: {
// //     type: String,
// //     // required: true,
// //     trim: true,
// //   },
// //   email: {
// //     type: String,
// //     // required: true,
// //     unique: true, // assuming one mess per email
// //     lowercase: true,
// //   },
// //   contact: {
// //     type: String,
// //     // required: true,
// //   },
// //   messAddress: {
// //     type: String,
// //     // required: true,
// //   },
// //   mealTypes: {
// //     type: String,
// //     enum: ['veg', 'non-veg', 'both'],
// //     // required: true,
// //   },
// //   messTimings: {
// //     breakfast: {
// //       from: { type: String },
// //       to: { type: String },
// //     },
// //     lunch: {
// //       from: { type: String },
// //       to: { type: String },
// //     },
// //     dinner: {
// //       from: { type: String },
// //       to: { type: String },
// //     },
// //   },
// //   subscription : {
// //     name : {
// //       type : String,
// //     } , 
// //     price : {
// //       type : Number
// //     }
// //   },
// //   deliveryAvailable: {
// //     type: Boolean,
// //     default: false,
// //   },
// //   serviceRadius: {
// //     type: Number, // in kilometers
// //     default: 0,
// //   },
// //   subscriptionPlans: [
// //     {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: 'Subscription', 
// //     },
// //   ],
// //   photos: [
// //     {
// //       type: String
// //     },
// //   ],
// //   isVerified: {
// //     type: String,
// //     enum: ['pending', 'verified' , 'rejected'],
// //     default: "pending"
// //   }
// // }, { timestamps: true , strict : true });

// // export default mongoose.model('Mess', messSchema);

// import mongoose from 'mongoose';

// const messSchema = new mongoose.Schema({
//   messName: {
//     type: String,
//     // required: true,
//     trim: true,
//   },
//   messOwnerName: {
//     type: String,
//     // required: true,
//     trim: true,
//   },
//   email: {
//     type: String,
//     // required: true,
//     unique: true, // assuming one mess per email
//     lowercase: true,
//   },
//   contact: {
//     type: String,
//     // required: true,
//   },
//   messAddress: {
//     type: String,
//     // required: true,
//   },
//   mealTypes: {
//     type: String,
//     enum: ['veg', 'non-veg', 'both'],
//     // required: true,
//   },
//   messTimings: {
//     breakfast: {
//       from: { type: String },
//       to: { type: String },
//     },
//     lunch: {
//       from: { type: String },
//       to: { type: String },
//     },
//     dinner: {
//       from: { type: String },
//       to: { type: String },
//     },
//   },
//   subscription: [
//     {
//       name: { type: String },
//       price: { type: Number },
//     }
//   ],
//   deliveryAvailable: {
//     type: Boolean,
//     default: false,
//   },
//   serviceRadius: {
//     type: Number, // in kilometers
//     default: 0,
//   },
//   subscriptionPlans: [
//     {
//       name: { type: String },
//       price: { type: Number },
//       mealType: { type: Number },
//       onGoingDiscount: { type: Boolean, default: false },
//       discountOffer: { type: Number },
//       description: { type: String }
//     }
//   ],
//   reviews: [
//     {
//       imgUrl: {
//         type: String
//       },
//       name: {
//         type: String
//       },
//       rating: {
//         type: Number
//       },
//       description: {
//         type: String
//       },
//       studentId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "student"
//       },
//       createdAt: {
//         type: String
//       }
//     }
//   ],
//   photos: [
//     {
//       type: String
//     },
//   ],
//   bankDetails: {
//     upiId: {
//       type: String
//     },
//     paymentContact: {
//       type: Number
//     }
//   },
//   isVerified: {
//     type: String,
//     enum: ['pending', 'verified', 'rejected'],
//     default: "pending"
//   }
// }, { timestamps: true, strict: true });

// export default mongoose.model('Mess', messSchema);

// models/Mess.js
import mongoose from 'mongoose';

const { Schema } = mongoose;

const messSchema = new Schema({
  // Basic Info
  messName: { type: String },
  ownerName: { type: String },
  email: { type: String },
  mobile: { type: String },
  address: { type: String },

  // Service Details
  messType: { type: String },
  deliveryAvailable: { type: Boolean },
  serviceRadius: { type: Number },

  // Meal Times
  breakfastTimings: {
    start: { type: String },
    end: { type: String }
  },
  lunchTimings: {
    start: { type: String },
    end: { type: String }
  },
  dinnerTimings: {
    start: { type: String },
    end: { type: String }
  },

  // Payment Methods
  upiId: { type: String },
  paymentPhone: { type: String },

  // Photos
  photos: [{
    url: { type: String },
    publicId: { type: String }
  }],
  subscriptionPlans: {
    type: [
      {
        name: { type: String },
        price: { type: Number },
        mealType: { type: Number },
        onGoingDiscount: { type: Boolean, default: false },
        discountOffer: { type: Number },
        description: { type: String },
        subscriptionId : {
          type :  mongoose.Schema.Types.ObjectId,
          ref : 'Subscription'
        }
      }
    ],
    default: []
  },
  subscription: {
    type: [
      {
        name: { type: String },
        price: { type: Number }
      }
    ],
    default: []
  },

  // Metadata
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isVerified: { type: Boolean, default: false },
  reviews: [
    {
      imgUrl: {
        type: String
      },
      name: {
        type: String
      },
      rating: {
        type: Number
      },
      description: {
        type: String
      },
      studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "student"
      },
      createdAt: {
        type: String
      }
    }
  ]
});

// Pre-validation hook removed (no validation needed)

export const Mess = mongoose.model('Mess', messSchema);

