const fs = require('fs');
const express = require('express');
const ejs = require('ejs');

const app = express();


app.set('view engine', 'ejs');

var storedata = [];
var data = fs.readFileSync('data.json', 'utf-8');
var edit = null
var editdata = null
if (data != '') {
    console.log(JSON.parse(data));
    storedata = JSON.parse(data);
}
app.get('/createdata', (req, res) => {
    const { edit, name, lname } = req.query;
    
    // If 'edit' is set, update existing entry, otherwise create new
    if (edit !== null && edit !== undefined && edit !== '') {
        storedata[edit] = { name, lname };
    } else {
        storedata.push({ name, lname });
    }

    // Save updated data to the file
    fs.writeFileSync('data.json', JSON.stringify(storedata));


    res.redirect('/');
});
app.get('/', (req, res) => {
    res.render('index', { data: storedata, editdata,edit });
});

app.get('/deletedata', (req, res) => {
    const delet = req.query.delete;
    storedata.splice(delet, 1)
    console.log(delet);
    fs.writeFileSync('data.json', JSON.stringify(storedata))
    res.redirect('/'); 
    
})

app.get('/editdata', (req, res) => {
    edit = req.query.edite
    editdata = storedata[edit]
    console.log(editdata)
    res.render('index', { editdata, data: storedata,edit })
})

app.listen(3008)
