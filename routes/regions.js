const url = require('url')
const express = require('express')
const router = express.Router()
const needle = require('needle')
const apicache = require('apicache')
const GeoJSON = require('geojson')

// Env vars
const API_BASE_URL = process.env.API_BASE_URL
const API_KEY_NAME = process.env.API_KEY_NAME
const API_KEY_VALUE = process.env.API_KEY_VALUE

// Init cache
let cache = apicache.middleware

router.get('/:provider', cache('2 minutes'), async (req, res, next) => {
  try {
    const provider = req.params.provider
  
    const data = require(`../data/${provider}.json`)
  
    const regions = GeoJSON.parse(data, {Point: ['latitude', 'longitude']})
  
    res.status(200).json(regions)
    
  } catch (error) {
    res.status(404).send("Provider not found!")
    next(error)
  }

})

module.exports = router