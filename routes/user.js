const route = require('express').Router();
const bcrypt = require('bcrypt');

const users = [];

route.get('/', async (req, res) => {
    res.send('Welcome to the user route');
});

route.post('/signup', async (req, res) => {
    const [authType, authString] = req.headers.authorization.split(" ");
    console.log("authType", authType, "authString", authString);
    
    const [username, password] = Buffer.from(authString, "base64")
    .toString("utf-8")
    .split(":");

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({username, password: hashedPassword});
    console.log(users);

    res.send('Account created successfully');
});

route.post('/login', async (req, res) => {
    const [authType, authString] = req.headers.authorization.split(" ");
    console.log("authType", authType, "authString", authString);
    
    const [username, password] = Buffer.from(authString, "base64")
    .toString("utf-8")
    .split(":");

    const user = (users.find(user => user.username === username));

    if (user){
        const authResult = await bcrypt.compare(password, user.password);
        console.log(authResult)
        if(authResult){
            res.send('Logged in successfully');
        } else{
            res.status(401).send('Invalid credentials');
        }
    } else{
        res.status(401).send('Invalid credentials');
    }
});

module.exports = route;
