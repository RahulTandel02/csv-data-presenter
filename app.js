const express = require('express')
const csv = require('csv-parser')
const fs = require('fs')
const app = express()
const moment = require('moment')
const cors = require('cors')

app.use(cors())

async function readCSV() {
    const result = []
    await new Promise((resolve, reject) => {
        fs.createReadStream('./sample-data-v2.csv')
            .pipe(csv())
            .on('error', (err) => {
                reject()
            })
            .on('data', (data) => result.push(data))
            .on('end', () => {
                resolve()
                console.log('done')
            })
    })
    result.sort((a, b) => {
        const aDate = moment(a.timestamp)
        const bDate = moment(b.timestamp)
        if (aDate.isBefore(bDate)) {
            return -1
        }
        else if (aDate.isAfter(bDate)) {
            return 1
        }
        return 0
    })
    return result
}

const excelData = readCSV()


app.get('/api/inventory', async (req, res) => {
    try {
        let result = await excelData
        let recentDate
        let newUnits = 0
        let newUnitsMSRP = 0
        let newAvgMSRP
        let usedUnits = 0
        let usedUnitMSRP = 0
        let usedAvgMSRP
        let cpoUnits = 0
        let cpoMSRP = 0
        let newChart = []
        const inventoryCountChart = []

        recentDate = new Date(result[result.length - 1].timestamp)
        result.forEach((data) => {
            if (recentDate < new Date(data.timestamp)) {
                recentDate = data.timestamp
            }
            if (data.condition === 'new') {
                newUnits += 1
                newUnitsMSRP += +data.price.replace('USD', '')

            }
            if (data.condition === 'used') {
                usedUnits += 1
                usedUnitMSRP += +data.price.replace('USD', '')
            }
            if (data.condition === 'cpo') {
                cpoUnits += 1
                cpoMSRP += +data.price.replace('USD', '')
            }
        })
        newAvgMSRP = Math.round(newUnitsMSRP / newUnits, 2)
        usedAvgMSRP = Math.round(usedUnitMSRP / usedUnits, 2)
        return res.send({ newChart, recentDate, newUnits, newUnitsMSRP, newAvgMSRP, usedAvgMSRP, usedUnitMSRP, usedUnits, cpoMSRP, cpoUnits })

    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: 'failed', message: error.message })
    }
})

app.get('/api/inventory-count', async (req, res) => {
    try {
        const condition = req.query.condition || 'new'
        const { make } = req.query
        let to = req.query.to ? moment(req.query.to, 'MM-DD-YYYY') : moment().startOf('year')
        let from = req.query.from ? moment(req.query.from, 'MM-DD-YYYY') : moment().endOf('year')
        let dataFormat = req.query.format || 'month'
        const newChart = []
        const result = await excelData

        result.forEach((data) => {
            if (data.condition === condition && (make && make.includes(data.brand) || !make)) {
                const date = moment(data.timestamp)
                if (moment(data.timestamp).isBetween(to, from)) {
                    const index = newChart.findIndex((d) => {
                        return date.isSame(d.date, dataFormat)
                    })
                    if (index === -1) {
                        let label
                        if (dataFormat === 'month') {
                            label = moment(date.get('M') + 1, 'M').format('MMM')
                        } else {
                            const startOfMonth = moment(date).startOf('month');
                            const startOfWeek = moment(date).startOf('week');
                            label = `${moment(date.get('M') + 1, 'M').format('MMM')} week ${Math.ceil((startOfWeek.diff(startOfMonth, 'days') + 1) / 7)}`;
                        }
                        newChart.push({ date, value: 1, label })
                    } else {
                        newChart[index].value += 1
                    }
                }
            }
        })

        return res.send(newChart)
    } catch (error) {
        console.log(error)
        return res.status(500).send(error.message)
    }
})

app.get('/api/inventory-msrp', async (req, res) => {
    try {
        const condition = req.query.condition || 'new'
        const { make } = req.query
        let to = req.query.to ? moment(req.query.to, 'MM-DD-YYYY') : moment().startOf('year')
        let from = req.query.from ? moment(req.query.from, 'MM-DD-YYYY') : moment().endOf('year')
        let dataFormat = req.query.format || 'month'

        console.log(to, from, dataFormat)
        const newChart = []
        const result = await excelData

        result.forEach((data) => {
            if (data.condition === condition && (make && make.includes(data.brand) || !make)) {
                const date = moment(data.timestamp)
                if (moment(data.timestamp).isBetween(to, from)) {
                    const index = newChart.findIndex((d) => {
                        return date.isSame(d.date, dataFormat)
                    })
                    if (index === -1) {
                        let label
                        if (dataFormat === 'month') {
                            label = moment(date.get('M') + 1, 'M').format('MMM')
                        } else {
                            const startOfMonth = moment(date).startOf('month');
                            const startOfWeek = moment(date).startOf('week');
                            label = `${moment(date.get('M') + 1, 'M').format('MMM')} week ${Math.ceil((startOfWeek.diff(startOfMonth, 'days') + 1) / 7)}`;
                        }
                        newChart.push({ date, value: +data.price.replace('USD', ''), label })
                    } else {
                        newChart[index].value += +data.price.replace('USD', '')
                    }
                }
            }
        })

        return res.send(newChart)
    } catch (error) {
        console.log(error)
        return res.status(500).send(error.message)
    }
})

app.get('/api/history-log', async (req, res) => {
    try {
        let result = await excelData
        let to = req.query.to ? moment(req.query.to, 'MM-DD-YYYY') : moment().startOf('year')
        let from = req.query.from ? moment(req.query.from, 'MM-DD-YYYY') : moment().endOf('year')
        // const start = req.query | 1
        // const offset = req.query | 10
        result = result.filter((d) => moment(d.timestamp).isBetween(to, from))
        // console.log(result[0])
        const data = []
        data[0] = {
            date: moment(result[0].timestamp).format('DD-MM-YYYY'),
            newInventory: result[0].condition === 'new' ? 1 : 0,
            newTotalInventory: result[0].condition === 'new' ? +result[0].price.replace('USD', '') : 0,
            usedInventory: result[0].condition === 'used' ? 1 : 0,
            usedTotalMSRP: result[0].condition === 'used' ? +result[0].price.replace('USD', '') : 0,
            cpoInventory: result[0].condition === 'cpo' ? 1 : 0,
            cpoTotalMSRP: result[0].condition === 'cpo' ? +result[0].price.replace('USD', '') : 0
        }
        // result.shift()

        for (let index = 1; index < result.length; index++) {
            const newEntry = { ...data[index - 1] }
            newEntry.date = moment(result[index].timestamp).format('DD-MM-YYYY')
            if (result[index].condition === 'new') {
                newEntry.newInventory = 1 + data[index - 1].newInventory
                newEntry.newTotalInventory = +result[index].price.replace('USD', '') + data[index - 1].newTotalInventory
            }
            else if (result[index].condition === 'used') {
                newEntry.usedInventory = 1 + data[index - 1].usedInventory
                newEntry.usedTotalMSRP = +result[index].price.replace('USD', '') + data[index - 1].usedTotalMSRP
            }
            else {
                newEntry.cpoInventory = 1 + data[index - 1].cpoInventory
                newEntry.cpoTotalMSRP = +result[index].price.replace('USD', '') + data[index - 1].cpoTotalMSRP
            }
            data.push(newEntry)
        }
        console.log(data[0])

        // result.forEach((d, index) => {
        //     // const newEntry = {
        //     //     date: d.timestamp,
        //     //     newInventory: d.condition === 'new' ? 1 + result[index - 1].newInventory : result[index - 1].newInventory,
        //     //     newTotalMSRP: d.condition === 'new' ? +d.price.replace('USD', '') + +result[index - 1].newTotalMSRP : +result[index - 1].newTotalMSRP,
        //     //     usedInventory: d.condition === 'used' ? 1 + result[index - 1].usedInventory : result[index - 1].usedInventory,
        //     //     usedTotalMSRP: d.condition === 'used' ? +d.price.replace('USD', '') + +result[index - 1].usedTotalMSRP : +result[index - 1].usedTotalMSRP,
        //     //     cpoInventory: d.condition === 'cpo' ? 1 + result[index - 1].cpoInventory : result[index - 1].cpoInventory,
        //     //     cpoTotalMSRP: d.condition === 'cpo' ? +d.price.replace('USD', '') + +result[index - 1].cpoTotalMSRP : +result[index - 1].cpoTotalMSRP
        //     // }
        //     const newEntry = index === 0 ? data[0] : data[index - 1]
        //     if (d.condition === 'new') {
        //         newEntry.newInventory = 1 + data[index - 1].newInventory
        //         newEntry.newTotalInventory = +d.price.replace('USD', '') + data[index - 1].newTotalInventory
        //     }
        //     else if (d.condition === 'used') {
        //         newEntry.usedInventory = 1 + data[index - 1].usedInventory
        //         newEntry.usedTotalMSRP = +d.price.replace('USD', '') + data[index - 1].usedTotalMSRP
        //     }
        //     else {
        //         newEntry.cpoInventory = 1 + data[index - 1].cpoInventory
        //         newEntry.cpoTotalMSRP = +d.price.replace('USD', '') + data[index - 1].cpoTotalMSRP
        //     }
        //     console.log(newEntry)
        //     data.push(newEntry)
        // })
        return res.send(data)
    } catch (error) {
        console.log(error)
        return res.status(500).send(error.message)
    }
})

app.listen(5000, () => {
    console.log('Listening on port 5000')
})