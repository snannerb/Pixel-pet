import { hashPassword } from '../js/auth.js';

function testHashPassword() {
  const password = '123456';
  const hashed = hashPassword(password);
  console.assert(hashed === '654321', 'Hashing failed');
}

testHashPassword();