// const express = require('express');
// const leetcode = require('leetcode-query';
import {LeetCode} from 'leetcode-query';
import express from 'express';

const PORT = process.env.PORT || 4000;
const leetcode = new LeetCode();

const app = express();

//sma280201


app.get('/profiles' , async(req,res) => {
    try{
        const user1 = req.query.user1;
        const user2 = req.query.user2;
        console.log(user1);
        const profile1 = await leetcode.user(user1);
        const profile2 = await leetcode.user(user2);

        console.log({profile1 , profile2});

        res.json({profile1, profile2});
    }catch (error) {
        // Handling errors
        console.error('Error fetching profiles:', error);
        res.status(500).json({ error: 'Failed to fetch profiles' });
      }    
})

app.listen(PORT , ()=>{
    console.log(`app is listening on port ${PORT}`);
})