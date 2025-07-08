// backend/seedUsers.js
const mongoose = require('mongoose');
const User = require('./models/User'); 


const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    

    //const hashedPassword = await bcrypt.hash('password', 8);

    await User.create([
      {
        name : 'test1234',
        username: 'testtest1234',
        email : 'testt1234@gmail.com',
        password: 'password',
      },
    ]);

    console.log('User seeded');
    const foundUser = await User.findOne({ username: 'testtest123' });
    if (!foundUser) {
      throw new Error('Verification failed: User not found in database');
    }

    console.log('Database verification successful:');
    console.log(JSON.stringify(foundUser.toObject(), null, 2));

    console.log('Password verification successful:', await bcrypt.compare('password4', foundUser.password));
    await mongoose.disconnect();
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seed();
