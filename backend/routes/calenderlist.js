// Author: Damian Mendez
// Date: 4/26/2025
//Last Modified: 4/26/2025
//Purpose: Handles the calling and routing of api calls

const express = require('express');
const router = express.Router();
const Calenderlist = require('../models/calenderlist.js');

// Get all lists
router.get('/', async (req, res) => {
  try {
    const lists = await Calenderlist.find();
    res.json(lists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a list with a certain ID
router.get('/:id', async (req, res) => {
  try {
    const list = await Calenderlist.findById(req.params.id);
    if (!list) return res.status(404).json({ message: 'Profile not found' });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a list with a certain date
router.get('/:date', async (req, res) => {
  try {
    const list = await Profile.find({date: date});
    if (!list) return res.status(404).json({ message: 'List not found' });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a list
router.post('/', async (req, res) => {
  const list = new Calenderlist(req.body);
  try {
    const newProfile = await profile.save();
    res.status(201).json(newProfile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a list with a certain ID
router.patch('/:id', async (req, res) => {
  try {
    const profile = await Profile.findByIdAndUpdate(
      req.params.id, 
      req.body,
      { new: true }
    );
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.json(profile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a list with a certain ID
router.delete('/:id', async (req, res) => {
  try {
    const profile = await Profile.findByIdAndDelete(req.params.id);
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.json({ message: 'Profile deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;