var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');

var headers = require('../../keys/headers') // object with the access token and header parameters
var baseURL = 'https://vincishoes.vnda.com.br/api/v2/users'

/* GET users listing. */
router.get('/list', function (req, res) {
    fetch(baseURL, {  // fetch on the base URL
        method: 'GET',  // object with the request settings
        headers: headers  // header parameters goes here as an JSON object
    })
        .then(res => res.json())
        .then(data => {
            res.json(data); // retrieving the list of users
        }).catch(e=> console.log(e))
})

/* GET one user by id */
router.get('/retrieve/:id', function (req, res) {
    fetch(baseURL + "/" + req.params.id, {
        method: 'GET',
        headers: headers,

    })
        .then(res => res.json())
        .then(data =>{
            res.json(data);
        }).catch(e=> console.log(e))
})

/* POST a new user */
router.post('/register', function (req, res) {
    fetch(baseURL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(req.body) // passing the new user data
    })
        .then(res => res.json())
        .then(data => {
            if (data.errors) {
                return res.json(data);
            }
            return res.json(data); // retrieving the new user object from the server
        }).catch(e=> console.log(e))
})

/* DELETE user  */
router.delete('/delete/:id', function (req, res) {
    fetch(baseURL + '/' + req.params.id, { // base URL with the user id
        method: 'DELETE',
        headers: headers
    }).then(response => {
        let ok = response.status; // assigning the status code to verify
        if (ok === 204) return res.json({ 'success': true });
        return res.json({ "success": false });
    }).catch(e=> console.log(e))
})

/* UPDATE an existing user */
router.patch('/update/:id', function (req, res) {
    fetch(baseURL + '/' + req.params.id, {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify(req.body)
    })
        // it seems that the server don't returns the updated user
        // only the status code
        .then(response => {
            let ok = response.status
            if (ok === 204) return res.json({ 'success': true });
            return res.json({ "success": false });
        }).catch(e=> console.log(e))
})


module.exports = router;
