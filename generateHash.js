const bcrypt = require('bcryptjs');

const password = "test123"; // Your desired password
bcrypt.hash(password, 10).then(hash => {
    console.log('Hashed password:', hash);
});