import bcrypt from 'bcryptjs'
const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('41equal22', 10),
    isAdmin: true,
  },
  {
    name: 'Jack',
    email: 'Jack@example.com',
    password: bcrypt.hashSync('41equal22', 10),
  },
  {
    name: 'Vin',
    email: 'Vin@example.com',
    password: bcrypt.hashSync('41equal22', 10),
  },
]

export default users
