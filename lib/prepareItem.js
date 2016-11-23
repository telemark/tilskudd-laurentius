'use strict'

const miss = require('mississippi')

module.exports = miss.through((chunck, encoding, callback) => {
  let item = JSON.parse(chunck)

  if (item.dsfError) {
    console.log(item._id + ': prepare-item: Skipping - dsfError')
    return callback(null, JSON.stringify(item))
  }
  item.contacts = []
  item.contacts.push(item.privatePerson)

  // console.log(JSON.stringify(item, null, 2))
  return callback(null, JSON.stringify(item))
})
