'use strict'

module.exports = (item, callback) => {
  const miss = require('mississippi')
  const streamifier = require('streamifier')
  const getNextJob = require('./lib/get-next-job')
  const prepareItem = require('./lib/prepareItem')
  const addContact = require('./lib/add-private-person')
  const addEnterprise = require('./lib/add-enterprise')
  const getCase = require('./lib/get-case')
  const addCase = require('./lib/add-case')
  const addDocuments = require('./lib/add-documents')
  const saveJob = require('./lib/save-job-archive')
  const cleanUp = require('./lib/cleanup-job')
  const sendStatusMessage = require('./lib/send-status-message')
  const starter = streamifier.createReadStream(JSON.stringify(item))

  function finished (error, data) {
    if (error) {
      callback(error, null)
    }
  }

  miss.pipe(
    starter,
    getNextJob,
    prepareItem,
    addEnterprise,
    addContact,
    getCase,
    addCase,
    addDocuments,
    saveJob,
    cleanUp,
    sendStatusMessage,
    finished
  )
}
