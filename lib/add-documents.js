'use strict'

const miss = require('mississippi')
const getMetadata = require('tfk-arkiv-metadatagenerator')
const p360 = require('p360')
const config = require('../config')

module.exports = miss.through((chunck, encoding, callback) => {
  let item = JSON.parse(chunck)

  console.log(item._id + ': add-documents')

  const areWeDoneYet = () => {
    if (item.documents.length > 0) {
      next()
    } else {
      return callback(null, JSON.stringify(item))
    }
  }

  const next = () => {
    const doc = item.documents.pop()
    const addThisDocuments = {
      generator: 'add-document',
      accessCode: 'U',
      title: doc.title,
      offTitle: doc.offTitle,
      category: doc.type,
      personalIdNumber: item.enterprise.enterpriseNumber,
      caseNumber: item.caseNumber,
      file: doc.data,
      fileTitle: doc.title + '.pdf',
      role: doc.role,
      responsiblePersonRecno: item.responsiblePersonRecno,
      responsibleEnterpriseRecno: item.responsibleEnterpriseRecno
    }
    if (doc.type === 'Dokument inn') {
      addThisDocuments.status = 'M'
    } else {
      addThisDocuments.status = 'E'
    }

    let options = getMetadata(addThisDocuments)
    options.p360 = config.p360

    p360(options, (err, data) => {
      if (err) {
        console.error(JSON.stringify(err))
        return callback(err)
      } else {
        console.log(item._id + ': add-documents: added document number: ' + data.CreateDocumentResult.DocumentNumber)
        areWeDoneYet()
      }
    })
  }
  if (item.documents) {
    next()
  } else {
    return callback(null, JSON.stringify(item))
  }
})
