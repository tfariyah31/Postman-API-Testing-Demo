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
        name : 'User A',
        username: 'usera',
        email : 'usera@gmail.com',
        password: 'password',
      },
      {
        name : 'DupNew User',
        username: 'dupNewUser',
        email : 'dnewUser@example.com',
        password: 'password',
      },
    ]);

    console.log('User seeded');
    const foundUser = await User.findOne({ username: 'usera' });
    if (!foundUser) {
      throw new Error('Verification failed: User not found in database');
    }

    const foundUser2 = await User.findOne({ username: 'dupNewUser' });
    if (!foundUser2) {
      throw new Error('Verification failed: Second user not found in database');
    }

    console.log('Database verification successful:');
    console.log(JSON.stringify(foundUser.toObject(), null, 2));
    console.log(JSON.stringify(foundUser2.toObject(), null, 2));

    console.log('Password verification successful (usera):', await bcrypt.compare('password', foundUser.password));
    console.log('Password verification successful (dupNewUser):', await bcrypt.compare('password', foundUser2.password));
    await mongoose.disconnect();
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seed();
