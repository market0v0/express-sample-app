const mongoose = require('mongoose')
const PinewoodBike = require('../models/PinewoodBike')

const createPinewoodBike = async (req, res, next) => {
  try {
    const { model, price, img, specs, category, youtube, facebook } = req.body

    const pinewoodBike = new PinewoodBike({
      _id: new mongoose.Types.ObjectId(),
      model,
      price,
      img,
      specs,
      category,
      youtube,
      facebook
    })

    const savedPinewoodBike = await pinewoodBike.save()
    res.status(201).json({ pinewoodBike: savedPinewoodBike })
  } catch (error) {
    res.status(500).json({ error })
  }
}

const readPinewoodBike = async (req, res, next) => {
  try {
    const pinewoodBikeId = req.params.pinewoodBikeId

    const pinewoodBike = await PinewoodBike.findById(pinewoodBikeId)
    if (pinewoodBike) {
      res.status(200).json({ pinewoodBike })
    } else {
      res.status(404).json({ message: 'Not found' })
    }
  } catch (error) {
    res.status(500).json({ error })
  }
}

const readAll = async (req, res, next) => {
  try {
    const pinewoodBikes = await PinewoodBike.find()
    res.status(200).json({ pinewoodBikes })
  } catch (error) {
    res.status(500).json({ error })
  }
}

const updatePinewoodBike = async (req, res, next) => {
  try {
    const pinewoodBikeId = req.params.pinewoodBikeId

    const pinewoodBike = await PinewoodBike.findById(pinewoodBikeId)
    if (pinewoodBike) {
      pinewoodBike.set(req.body)
      const updatedPinewoodBike = await pinewoodBike.save()
      res.status(201).json({ pinewoodBike: updatedPinewoodBike })
    } else {
      res.status(404).json({ message: 'Not found' })
    }
  } catch (error) {
    res.status(500).json({ error })
  }
}

const deletePinewoodBike = async (req, res, next) => {
  try {
    const pinewoodBikeId = req.params.pinewoodBikeId

    const deletedPinewoodBike = await PinewoodBike.findByIdAndDelete(pinewoodBikeId)
    if (deletedPinewoodBike) {
      res.status(201).json({ message: 'Deleted' })
    } else {
      res.status(404).json({ message: 'Not found' })
    }
  } catch (error) {
    res.status(500).json({ error })
  }
}

const filterByPriceRange = async (req, res, next) => {
  try {
    const { minPrice, maxPrice } = req.query

    const pinewoodBikes = await PinewoodBike.find({
      price: { $gte: minPrice, $lte: maxPrice }
    })

    res.status(200).json({ pinewoodBikes })
  } catch (error) {
    res.status(500).json({ error })
  }
}

const filterByCategory = async (req, res, next) => {
  try {
    const { category } = req.query

    let query = {}

    if (category === 'mountain' || category === 'road' || category === 'gravel') {
      query = { category }
    }

    const pinewoodBikes = await PinewoodBike.find(query)

    res.status(200).json({ pinewoodBikes })
  } catch (error) {
    res.status(500).json({ error })
  }
}

const getAllModels = async (req, res, next) => {
  try {
    const models = await PinewoodBike.distinct('model')
    res.status(200).json({ models })
  } catch (error) {
    res.status(500).json({ error })
  }
}

const filterByPriceCategory = async (req, res, next) => {
  try {
    const { category, minPrice, maxPrice } = req.query

    let query = {}

    if (category === 'mountain' || category === 'road' || category === 'gravel') {
      query = { category }
    }

    if (minPrice && maxPrice) {
      query = { ...query, price: { $gte: minPrice, $lte: maxPrice } }
    }

    const pinewoodBikes = await PinewoodBike.find(query)

    res.status(200).json({ pinewoodBikes })
  } catch (error) {
    res.status(500).json({ error })
  }
}

module.exports = {
  createPinewoodBike,
  filterByPriceCategory,
  readPinewoodBike,
  readAll,
  updatePinewoodBike,
  deletePinewoodBike,
  filterByPriceRange,
  filterByCategory,
  getAllModels
}
