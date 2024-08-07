import {useEffect, useState} from 'react'
import Cart from './components/cart';
import DataTable from './components/DataTable';
import IndiaMap from '@svg-maps/india';
import { SVGMap } from 'react-svg-map';
import 'react-svg-map/lib/index.css';
import './App.css';
import axios from 'axios';

function App() {
    const [selectedState, setSelectedState] = useState("INDIA");
    const [stateData, setStateData] = useState({suspected: "45,393", tested: "45,035", confirmed: "45,034", deaths: "5370"});
    const [error, setError] = useState(null);
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000');
                console.log(response.data);
                const formattedData = response.data.map(item => ({
                    id: item[0],
                    state: item[1],
                    date: item[2],
                    suspected: item[3],
                    tested: item[4],
                    confirmed: item[5],
                    deaths: item[6]
                }));
                setTableData(formattedData);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch data');
            }
        };
        fetchData();
    }, []);

    const handleStateClick = async (event) => {
        try {
            const state = event.target.getAttribute('name');
            const date = document.querySelector('input[type="date"]').value;
            console.log(state);
            setSelectedState(state);
            const response = await axios.get(`http://127.0.0.1:5000/api/data?state=${state}&date=${date}`);
            console.log(response.data);
            setStateData(response.data);
            setError(null);
        } catch (err) {
            console.log(err);
            setError(err.response?.data?.error || 'An error occurred');
            setStateData(null);
        }
    };

  return (
    <>
        <div className="dashboard">
            <div className="dashboard_header">
                <div className="state">
                    <h2>{selectedState}</h2>
                </div>
                <div className="date">
                    <span>
                        <b>Latest Recorded Date:</b>
                        <input type="date"/>
                    </span>
                    <select name="date" id="date">
                        <option value="volvo">Download</option>
                        <option value="saab">Check</option>
                        <option value="mercedes">Read</option>
                        <option value="audi">Update</option>
                    </select>
                </div>
            </div>
            <div className="dashboard_content">
                <div className="map">
                    <SVGMap className="svg-map" map={IndiaMap} onLocationClick={handleStateClick} />
                </div>
                <div className="data">
                    <div className="summary">
                        <Cart label="SUSPECTED" value={stateData.suspected} />
                        <Cart label="TESTED" value={stateData.tested} />
                        <Cart label="CONFIRMED" value={stateData.confirmed} />
                        <Cart label="DEATHS" value={stateData.deaths} />
                    </div>
                    <div className="table">
                        <DataTable data={tableData} />
                    </div>
                </div>
            </div>

        </div>
    </>
  )
}

export default App
