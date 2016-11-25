'use strict'

const miss = require('mississippi')
const getMetadata = require('tfk-arkiv-metadatagenerator')
const p360 = require('p360')
const config = require('../config')

module.exports = miss.through((chunck, encoding, callback) => {
  let item = JSON.parse(chunck)
  console.log(item._id + ': get-case-number')

  const getCase = {
    generator: 'get-case-number',
    caseNumber: item.caseNumber
  }

  let options = getMetadata(getCase)
  options.p360 = config.p360

  p360(options, (err, data) => {
    if (err) {
      console.error(JSON.stringify(err))
      return callback(err)
    } else {
      if (!data.GetCasesResult || !data.GetCasesResult.Cases || !data.GetCasesResult.Cases.CaseResult[0]) {
        return callback(JSON.stringify(item), null)
      }
      item.responsiblePersonRecno = data.GetCasesResult.Cases.CaseResult[0].ResponsiblePerson.Recno
      item.responsibleEnterpriseRecno = data.GetCasesResult.Cases.CaseResult[0].ResponsibleEnterprise.Recno
      return callback(null, JSON.stringify(item))
    }
  })
})
