const bc = require('bcryptjs'); // npm i bcryptjs
const rs = require('readline-sync'); // npm i readline-sync
const fs = require('fs'); // npm i fs

if(!fs.existsSync('users.json')) {
    fs.writeFileSync('users.json', '[]');
}
const json = JSON.parse(fs.readFileSync('users.json', 'utf8'));

const salt = bc.genSaltSync(10);

const username = rs.question('Username: ');
const password = rs.question('Password: ', { hideEchoBack: true });

const user = json.find(user => user.username === username);

if (user) { // if user exists
    if (bc.compareSync(password, user.password)) {
        console.log('You are logged in!');
    } else {
        console.log('Wrong password!');
    }
} else { // if user does not exist
    const hash = bc.hashSync(password, salt);
    json.push({ username, password: hash });
    console.log('You are registered!');
}

fs.writeFileSync('users.json', JSON.stringify(json, null, 4));

