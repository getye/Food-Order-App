const pool = require('../dbcon');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');


async function seedData() {
  const users = [
    {
        email: 'getye2008@gmail.com',
        password: 'getyepass123',
        role: 'Restaurant Register',
        phone: '0911223344',
        restaurant: 'Getye Restaurant',
        location: 'Addis Ababa',
        profile: 'https://example.com/profile.jpg',
        status: 'active',
        name: 'Getye'
    },
    {
        email: 'admin@example.com',
        password: 'adminpass123',
        role: 'Super Admin',
        phone: '0912223242',
        restaurant: 'Getye Restaurant',
        location: 'Addis Ababa',
        profile: 'https://example.com/profile.jpg',
        status: 'active',
        name: 'Admin'
    },
  ];

  for (const user of users) {
    const userId = uuidv4();
    const hashedPassword = await bcrypt.hash(user.password, 10);

    try {
      // Insert into users
      await pool.query(
        `INSERT INTO users (user_id, user_email, user_password, user_phone, user_restaurant, user_location, user_type, user_profile, user_status, user_name)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        [userId, user.email, hashedPassword, user.phone, user.restaurant, user.location, user.role, user.profile, user.status, user.name]
      );

      // Insert into accounts
      await pool.query(
        `INSERT INTO accounts (user_id, user_email, user_password, user_role)
         VALUES ($1, $2, $3, $4)`,
        [userId, user.email, hashedPassword, user.role]
      );

      console.log(`Seeded user & account: ${user.email}`);
    } catch (err) {
      console.error(`Error seeding ${user.email}:`, err.message);
    }
  }

  await pool.end();
}

seedData();
