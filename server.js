const express = require('express');
const path = require('path');
const app = express();
const router = require('express').Router();
const {notes}= require('./db/db.json');
const port = process.env.PORT || 4000;
app.route('/api/notes')
      .get((req, res) =>{
            res.send(notes)
      })
      .post((req, res) =>{
      
      });

app.route('/notes')
      .get((req, res)=>{
      
      })
      .post((req, res) =>{
      
      });
