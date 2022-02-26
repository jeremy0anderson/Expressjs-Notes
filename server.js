const express = require('express');
const path = require('path');
const app = express();
const {fs} = require('fs-extra');
const router = require('express').Router();
const {notes}= require('./db/db.json');
const port = process.env.PORT || 4000;

function newNote(body, notesArray){
      let note= body;
      notesArray.push(note);
      return fs.writeFileSync("./db/db.json",
          JSON.stringify({notes: notesArray,}, null, 2));
}

app.route('/')
    .get((req, res)=>{
          res.send('./public/assets/index.html')
    })



app.route('/api/notes')
      .get((req, res) =>{
            res.send(notes)
      })
      .post((req, res) =>{
            res.send(newNote(req.body, notes));
      });

app.route('/notes')
      .get((req, res)=>{
            res.render('./public/assets/notes.html');
      })
      .post((req, res) =>{
      
      });

app.listen(port, () =>{
       console.log("Listening on port "+port);
})
