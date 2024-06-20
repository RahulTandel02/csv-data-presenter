
import './App.css';
import Chart from './Chart';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, fetchDataMSRP, fetchHistoryLogAction, fetchInventoryOverviewData } from './actions';
import { PrimeReactProvider } from 'primereact/api';
import InventoryOverview from './components/InventoryOverview';
import Navbar from './components/Navbar';
import Filter from './components/Filter';
import MyContext from './contex';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';

// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
function App() {

  const dispatch = useDispatch()
  const { data, error, loading } = useSelector(state => state.inventory)
  const dataMSRP = useSelector(state => state.inventoryMSRP).data
  const result = useSelector(state => state.inventoryOverview)
  const history = useSelector(state => state.historyLog).data
  const dataRes = result.data
  // const FilterContext = createContext()
  const [filterData, setfilterData] = useState({
    condition: 'new',
    to: '',
    from: '',
    format: 'month',
  })


  function handleChange(condition) {
    // setfilterData({ ...filterData, condition })
    // e.preventDefault()
    dispatch(fetchData({ ...filterData, condition }))
  }

  function handleMSRP(condition) {
    dispatch(fetchDataMSRP({ ...fetchData, condition }))
  }


  useEffect(() => {
    dispatch(fetchInventoryOverviewData())
    dispatch(fetchDataMSRP(filterData))
    dispatch(fetchData(filterData))
    dispatch(fetchHistoryLogAction(filterData))
  }, [dispatch, filterData])

  return (
    <div className='w-100'>

      <Navbar></Navbar>
      <div className='container-fluid'>
        <MyContext.Provider value={{ filterData, setfilterData }}>
          <Filter ></Filter>
          <InventoryOverview dataRes={dataRes}></InventoryOverview>
          <div>
            <span className='fs-6 my-3 me-2'>Inventory count</span>
            <Chart handleChange={handleChange} data={data} id="chartdiv"></Chart>
            <div>
              <span className='fs-6 my-3 me-2'>Inventory count</span>
              <Chart handleChange={handleMSRP} data={dataMSRP} id="chartdiv2"></Chart>
            </div>
          </div> {/*Inventory count */}

          <PrimeReactProvider value={{ appendTo: 'self' }}>
            <div>
              <p className='fs-6 my-3 me-2'>History log</p>
              <div className="card">
                <DataTable value={history} paginator rows={10} stripedRows tableStyle={{ minWidth: '50rem' }}>
                  <Column field="date" header="Date"></Column>
                  <Column field="newInventory" header="New inventory"></Column>
                  <Column field="newTotalInventory" header="New total MSRP"></Column>
                  <Column field="usedInventory" header="Used inventory"></Column>
                  <Column field="usedTotalMSRP" header="Used total MSRP"></Column>
                  <Column field="cpoInventory" header="CPO inventory"></Column>
                  <Column field="cpoTotalMSRP" header="CPO total MSRP"></Column>
                </DataTable>
              </div>
            </div>
          </PrimeReactProvider>

        </MyContext.Provider>
      </div>

    </div>
  );
}

export default App;
