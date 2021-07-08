
const express = require('express');
const path = require('path');


const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const tables = [];

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'home.html')));

app.get('/add', (req, res) => res.sendFile(path.join(__dirname, 'reserve.html')));

app.get('/api/tables', (req, res) => res.json(tables));

app.get('/api/tables/:tables', (req, res) => {
  const chosen = req.params.tables;

  console.log(chosen);


  for (let i = 0; i < tables.length; i++) {
    if (chosen === tables[i].routeName) {
      return res.json(tables[i]);
    }
  }

  return res.json(false);
});


app.post('/api/tables', (req, res) => {

  const newtable = req.body;


  newtable.routeName = newtable.name.replace(/\s+/g, '').toLowerCase();
  console.log(newtable);

  tables.push(newtable);
  res.json(newtable);
});


app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
