const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const {body, matchedData, validationResult } = require('express-validator');

/**
 * ROUTE: 01
 * Fetch all notes of a particular user "/api/notes/fetchallnotes". Login required
 */
router.get('/fetchallnotes',fetchuser,async (req,res)=>{
    try {
        const userid = req.id;
        const notes = await Notes.find({userId: userid});
        res.status(200).json({notes});
   } catch (error) {
        console.error(error.message);
        res.status(500).json({error: 'Internal server error'})
   }
})

/**
 * ROUTE: 02
 * Add a note of a particular user "/api/notes/addnote". Login required.
 */
router.post('/addnote',fetchuser,[
    body('title','Title must be at-least 03 characters').isLength({min:3}),
    body('description','Title must be at-least 05 characters').isLength({min:5}),
    body('tag','Tag must be at-least 02 characters').isLength({min:2}),
],async (req,res)=>{
    /**
     * If there are error, return Bad request and the error.
     */
    const result = validationResult(req);
    if (result.isEmpty()) {
        
        const data = matchedData(req);

        const userid = req.id;

        try {
            //Create new note            
            const note = await Notes.create({
                userId: userid,
                title: data.title,
                description: data.description,
                tag: data.tag,   
            });

            res.status(200).json({note});
        } catch (error) {
            console.error(error.message);
            res.status(500).json({error: 'Internal server error'})
        }
    }else{
        res.status(400).send({ errors: result.array() });
    }
})

/**
 * ROUTE: 03
 * Update an existing note "/api/notes/updatenote". Login required.
 */
router.put('/updatenote/:id',fetchuser,async (req,res)=>{
    /**
     * If there are error, return Bad request and the error.
     */  
        
    const {title,description,tag} = req.body;
    
    const userid = req.id;

    try {
        
        //Create new note            
        const updatednote = {};

        if(title){updatednote.title = title};
        if(description){updatednote.description = description};
        if(tag){updatednote.tag = tag};

        const note = await Notes.findById(req.params.id);

        if(!note){
            return res.status(404).send("Note not found!");
        }

        if(note.userId.toString() !== userid){
            return res.status(401).send("Not allowed to modify this note!");
        }

        updatedResult = await Notes.findByIdAndUpdate(req.params.id, {$set: updatednote}, {new:true})

        res.status(200).json({updatedResult});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({error: 'Internal server error'})
    }
   
})

/**
 * ROUTE: 03
 * Delete an existing note "/api/notes/deletenote". Login required.
 */
router.delete('/deletenote/:id',fetchuser,async (req,res)=>{
    /**
     * If there are error, return Bad request and the error.
     */  
        
    const userid = req.id;

    try {
        
        const note = await Notes.findById(req.params.id);

        if(!note){
            return res.status(404).send("Note not found!");
        }

        if(note.userId.toString() !== userid){
            return res.status(401).send("Not allowed to delete this note!");
        }

        delResult = await Notes.findByIdAndDelete(req.params.id)

        res.status(200).json({delResult});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({error: 'Internal server error'})
    }
   
})

module.exports = router