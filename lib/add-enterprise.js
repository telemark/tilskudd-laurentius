'use strict'

const miss = require('mississippi')
const getMetadata = require('tfk-arkiv-metadatagenerator')
const p360 = require('p360')
const config = require('../config')

module.exports = miss.through((chunck, encoding, callback) => {
  let item = JSON.parse(chunck)

  if (!item.enterprise) {
    console.log(item._id + ': add-enterprise: skipping - no enterprise found')
    return callback(null, JSON.stringify(item))
  }

  console.log(item._id + ': add-enterprise')
  console.log(item._id + ': add-enterprise: ' + item.enterprise.name)

  const addEnterprise = {
    generator: 'add-enterprise',
    name: item.enterprise.name,
    enterpriseNumber: item.enterprise.enterpriseNumber,
    area: 'Telemark',
    streetAddress: item.enterprise.officeAddress.streetAddress,
    zipCode: item.enterprise.officeAddress.zipCode,
    zipPlace: item.enterprise.officeAddress.zipPlace
  }

  let options = getMetadata(addEnterprise)
  options.p360 = config.p360

  p360(options, (err, data) => {
    if (err) {
      console.error(JSON.stringify(err))
      return callback(err)
    } else {
      console.log(item._id + ': add-enterprise: ' + item.enterprise.name + ': Updated or created enterprise')
      return callback(null, JSON.stringify(item))
    }
  })
})
