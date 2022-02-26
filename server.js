const express = require('express');
const app = express();
const fs = require('fs');
const {notes}= require('./db/db.json');
const path = require("path");
const port = process.env.PORT || 4000;
app.use(express.Router());
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.use(express.json({inflate: false}));

function validateNote(note){
      if (!note.title || typeof note.title !== 'string'){
            return false;
      }
      if (!note.text || typeof note.text !== 'string'){
            return false;
      }
      return true;
}
function createNewNote(body, notesArray) {
      const newNote = body;
      newNote.id = notesArray.length+1;
      notesArray.push(newNote);
      fs.writeFileSync(path.join(`${__dirname}`,'/db/db.json'),
          JSON.stringify({ notes: notesArray }, null, 2)
      );
      return newNote;
}

app.get('/', (req, res) =>{
      res.sendFile(`${__dirname}/public/assets/pages/index.html`);
});
app.route('/api/notes')
      .get((req, res) =>{
            res.send(notes)
      })
      .post((req, res) =>{
            res.send(createNewNote(req.body, notes));
      });

app.get('/notes',(req, res)=>{
      res.sendFile(`${__dirname}/public/assets/notes.html`);
})
      
      app.post('/notes', (req, res) =>{
      
      });

app.listen(port, () =>{
       console.log("Listening on port "+port);
})
