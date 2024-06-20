import moment from "moment"
import { useContext, useEffect, useState } from "react"
import { Offcanvas } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { fetchData, fetchDataMSRP, fetchHistoryLogAction } from "../actions"
import MyContext from "../contex"

function Filter() {

    const [show, setShow] = useState(false)
    const dispatch = useDispatch()
    const { filterData, setfilterData } = useContext(MyContext)
    const [status, setStatus] = useState('')
    function handleShow() {
        setShow(true)
    }

    function handleClose() {
        setShow(false)
    }

    useEffect(() => {
        dispatch(fetchDataMSRP(filterData))
        dispatch(fetchData(filterData))
        dispatch(fetchHistoryLogAction(filterData))
    }, [filterData])

    function handleFilterUpdate() {
        console.log(status)
        if (status === 'lastmonth') {
            const to = moment().subtract(1, 'months').startOf('month').format('MM-DD-YYYY')
            const from = moment().subtract(1, 'months').endOf('month').format('MM-DD-YYYY')
            setfilterData({ ...filterData, to, from, format: 'week' })
            console.log(filterData)
            // handleChange()
        }
        if (status === 'thismonth') {
            const to = moment().startOf('month').format('MM-DD-YYYY')
            const from = moment().endOf('month').format('MM-DD-YYYY')
            setfilterData({ ...filterData, to, from, format: 'week' })
            // handleChange()
        }
        if (status === 'lastthreemonths') {
            const to = moment().subtract(3, 'months').startOf('month').format('MM-DD-YYYY')
            const from = moment().endOf('month').format('MM-DD-YYYY')
            setfilterData({ ...filterData, to, from, format: 'week' })
            // handleChange()
        }
        if (status === 'lastsixmonths') {
            const to = moment().subtract(6, 'months').startOf('month').format('MM-DD-YYYY')
            const from = moment().endOf('month').format('MM-DD-YYYY')
            setfilterData({ ...filterData, to, from, format: 'week' })
            // handleChange()
        }
        if (status === 'thisyear') {
            const to = moment().startOf('year').format('MM-DD-YYYY')
            const from = moment().endOf('year').format('MM-DD-YYYY')
            setfilterData({ ...filterData, to, from, format: 'month' })
            // handleChange()
        }
    }

    return (
        <>
            <div className='d-flex justify-content-between align-items-center mt-4 pb-3  border-bottom '>
                <h2 className='fs-4'>Inventory</h2>
                <div className='d-flex justify-content-end align-items-center w-75'>
                    <span className='me-3'>Select Dealer</span>
                    <select className='me-4 w-50 form-control'>
                        <option>1</option>
                        <option>2</option>
                    </select>
                    <button className='btn btn-warning' type="button" onClick={handleShow}>Filter Data by</button>
                </div>
            </div>{/* Inventory header*/}

            <Offcanvas show={show} onHide={handleClose} placement='end'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Filter Data By</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div>
                        <h5>Duration</h5>
                        <ul style={{ listStyle: 'none' }}>
                            <li>
                                <div className='form-check'  >
                                    <input className='form-check-input' type='radio' name='duration' id="lastmonth" onClick={() => setStatus('lastmonth')} />
                                    <label className='form-check-label'  >Last Month</label>
                                </div>
                            </li>
                            <li>
                                <div className='form-check'>
                                    <input className='form-check-input' type='radio' name='duration' id="thismonth" onClick={() => setStatus('thismonth')} />
                                    <label className='form-check-label'>This month</label>
                                </div>
                            </li>
                            <li>
                                <div className='form-check'>
                                    <input className='form-check-input' type='radio' name='duration' id="lastthreemonth" onClick={() => setStatus('lastthreemonths')} />
                                    <label className='form-check-label'>Last 3 months</label>
                                </div>
                            </li>
                            <li>
                                <div className='form-check'>
                                    <input className='form-check-input' type='radio' name='duration' id="lastsixmonth" onClick={() => setStatus('lastsixmonths')} />
                                    <label className='form-check-label'>Last 6 months</label>
                                </div>
                            </li>
                            <li>
                                <div className='form-check'>
                                    <input className='form-check-input' type='radio' name='duration' id="year" onClick={() => setStatus('thisyear')} />
                                    <label className='form-check-label'>This year</label>
                                </div>
                            </li>
                        </ul>
                        <button type="button" className="btn btn-warning" onClick={() => handleFilterUpdate()}>Apply filter</button>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default Filter