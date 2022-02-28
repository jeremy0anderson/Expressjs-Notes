const express = require('express');
const app = express();
const fs = require('fs');
const {notes}= require('./db/db.json');
const path = require("path");
const port = process.env.PORT || 4000;

//////////[middleware]//////////////
app.use(express.Router());
app.use(express.static(`${__dirname}/public`));
app.use(express.urlencoded({extended: false}));
app.use(express.json());


////////////[functions]/////////////
function validateNote(note){
      if (!note.title || typeof note.title !== 'string'){
            return false;
      }
      return !(!note.text || typeof note.text !== 'string');
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

/////////////[routes]//////////////
app.get('/', (req, res) =>{
      res.sendFile(`${__dirname}/public/assets/pages/index.html`);
});
app.route('/notes')
      .get((req, res) =>{
            res.sendFile(`${__dirname}/public/assets/pages/notes.html`)
      })
      .post((req, res) =>{
      });

app.route("/api/notes")
    .get((req, res)=>{
          res.send(notes);
    
})
    .post((req, res) =>{
      const note = req.body;
      if(validateNote(note)){
            const newNote = createNewNote(note, notes);
            console.log(newNote)
            return res.json(newNote);
      } else {return (err) =>{
            console.log(err);
            }}
      });

app.listen(port, () =>{
       console.log("Listening on port "+port);
});
