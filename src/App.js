import { useCallback, useEffect, useState } from 'react';
import './App.css';
import DataTable from './components/DataTable';
import Api from './services/apiCalls';

function App() {
  const [tableData, setTableData] = useState([]);
  const [tableDataError, setTableDataError] = useState('');
  const columnData = [
    {
      id: "checkbox",
      label: "Product Check"
    },
    {
      id: "product",
      label: "Product",
      numeric: false,
      width: "400px",
      isSortable: true
    },
    {
      id: "image",
      label: "Image",
      numeric: true,
      isSortable: false
    }
  ];
  useEffect(() => {
    const api = new Api();
    api
      .getPhotosList()
      .then((result) => setTableData(result.data))
      .catch((error) => setTableDataError(error));
  }, []);
  console.log(columnData)
  const onRowClick = useCallback((id, sort) => {
    const sortedData = tableData;
    sort ? sortedData.sort((a, b) => a.title < b.title ? 1 : -1) : sortedData.sort((a, b) => a.title > b.title ? 1 : -1);
    setTableData([...sortedData]);
  }, [tableData]);

  return (
    <div className="App">
      {tableDataError ? 
        <div>Error Found!</div> :
        <DataTable rowData={tableData} columnData={columnData}  onRowClick={onRowClick}/>
      }
    </div>
  );
}

export default App;
