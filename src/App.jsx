import {useEffect, useState} from 'react'
import Cart from './components/cart';
import DataTable from './components/DataTable';
import IndiaMap from '@svg-maps/india';
import { SVGMap } from 'react-svg-map';
import 'react-svg-map/lib/index.css';
import './App.css';
import axios from 'axios';

const sampleData = [
    { state: 'Maharashtra', suspected: 500000, tested: 20000, confirmed: 1000000, deaths: 20000 },
    { state: 'Karnataka', suspected: 50000, tested: 2000, confirmed: 100000, deaths: 2000 },
    { state: 'Tamil Nadu', suspected: 50000, tested: 2000, confirmed: 100000, deaths: 2000 },
    { state: 'Delhi', suspected: 50000, tested: 2000, confirmed: 100000, deaths: 2000 },
    { state: 'Kerala', suspected: 50000, tested: 2000, confirmed: 100000, deaths: 2000 },
    { state: 'Uttar Pradesh', suspected: 50000, tested: 2000, confirmed: 100000, deaths: 2000 },
    { state: 'West Bengal', suspected: 50000, tested: 2000, confirmed: 100000, deaths: 2000 },
    { state: 'Odisha', suspected: 50000, tested: 2000, confirmed: 100000, deaths: 2000 },
    { state: 'Rajasthan', suspected: 50000, tested: 2000, confirmed: 100000, deaths: 2000 },
    { state: 'Gujarat', suspected: 50000, tested: 2000, confirmed: 100000, deaths: 2000 },
    { state: 'Madhya Pradesh', suspected: 50000, tested: 2000, confirmed: 100000, deaths: 2000 },
    { state: 'Haryana', suspected: 50000, tested: 2000, confirmed: 100000, deaths: 2000 },
    { state: 'Bihar', suspected: 50000, tested: 2000, confirmed: 100000, deaths: 2000 },
    { state: 'Punjab', suspected: 50000, tested: 2000, confirmed: 100000, deaths: 2000 },
    { state: 'Chhattisgarh', suspected: 50000, tested: 2000, confirmed: 100000, deaths: 200 },
    { state: 'Jharkhand', suspected: 50000, tested: 2000, confirmed: 100000, deaths: 2000 },
    { state: 'Uttarakhand', suspected: 50000, tested: 2000, confirmed: 100000, deaths: 2000 },
    { state: 'Goa', suspected: 50000, tested: 2000, confirmed: 100000, deaths: 2000 },
    { state: 'Tripura', suspected: 50000, tested: 2000, confirmed: 100000, deaths: 200 },
    { state: 'Manipur', suspected: 50000, tested: 2000, confirmed: 100000, deaths: 2000 },
    { state: 'Nagaland', suspected: 50000, tested: 2000, confirmed: 100000, deaths: 2000 },
    { state: 'Mizoram', suspected: 50000, tested: 2000, confirmed: 100000, deaths: 2000 },
    { state: 'Arunachal Pradesh', suspected: 50000, tested: 2000, confirmed: 100000, deaths: 2000 },
    { state: 'Sikkim', suspected: 50000, tested: 2000, confirmed: 100000, deaths: 2000 },
    { state: 'Meghalaya', suspected: 50000, tested: 2000, confirmed: 100000, deaths: 200 },
    { state: 'Assam', suspected: 50000, tested: 2000, confirmed: 100000, deaths: 2000 },
    { state: 'Puducherry', suspected: 50000, tested: 2000, confirmed: 100000, deaths: 2000 },
    { state: 'Chandigarh', suspected: 50000, tested: 2000, confirmed: 100000, deaths: 2000 },
    { state: 'Dadra and Nagar Haveli and Daman and Diu', suspected: 50000, tested: 2000, confirmed: 100000, deaths: 2000 },
    { state: 'Ladakh', suspected: 50000, tested: 2000, confirmed: 100000, deaths: 2000 },
    { state: 'Lakshadweep', suspected: 50000, tested: 2000, confirmed: 100000, deaths: 2000 },
    { state: 'Andaman and Nicobar Islands', suspected: 50000, tested: 2000, confirmed: 100000, deaths: 2000 },
    { state: 'Telangana', suspected: 50000, tested: 2000, confirmed: 100000, deaths: 2000 },
    { state: 'Andhra Pradesh', suspected: 50000, tested: 2000, confirmed: 100000, deaths: 2000 },
    { state: 'Arunachal Pradesh', suspected: 50000, tested: 2000, confirmed: 100000, deaths: 2000 },
    { state: 'Himachal Pradesh', suspected: 50000, tested: 2000, confirmed: 100000, deaths: 2000 },
    { state: 'Jammu and Kashmir', suspected: 50000, tested: 2000, confirmed: 100000, deaths: 2000 },
    { state: 'Ladakh', suspected: 50000, tested: 2000, confirmed: 100000, deaths: 2000 },
    { state: 'Uttar Pradesh', suspected: 50000, tested: 2000, confirmed: 100000, deaths: 2000 },
    { state: 'West Bengal', suspected: 50000, tested: 2000, confirmed: 100000, deaths: 2000 },
    { state: 'Odisha', suspected: 50000, tested: 2000, confirmed: 100000, deaths: 2000 },
    { state: 'Rajasthan', suspected: 50000, tested: 2000, confirmed: 100000, deaths: 2000 },
    { state: 'Gujarat', suspected: 50000, tested: 2000, confirmed: 100000, deaths: 2000 },
    { state: 'Madhya Pradesh', suspected: 50000, tested: 2000, confirmed: 100000, deaths: 2000 },
    { state: 'Haryana', suspected: 50000, tested: 2000, confirmed: 100000, deaths: 2000 },
    { state: 'Bihar', suspected: 50000, tested: 2000, confirmed: 100000, deaths: 2000 },
    { state: 'Punjab', suspected: 50000, tested: 2000, confirmed: 100000, deaths: 2000 },
    { state: 'Chhattisgarh', suspected: 50000, tested: 2000, confirmed: 100000, deaths: 200 },
    { state: 'Jharkhand', suspected: 50000, tested: 2000, confirmed: 100000, deaths: 2000 },
    { state: 'Uttarakhand', suspected: 50000, tested: 2000, confirmed: 100000, deaths: 2000 },
    { state: 'Goa', suspected: 50000, tested: 2000, confirmed: 100000, deaths: 2000 },
    { state: 'Tripura', suspected: 50000, tested: 2000, confirmed: 100000, deaths: 200 },
    { state: 'Manipur', suspected: 50000, tested: 2000, confirmed: 100000, deaths: 2000 },
    { state: 'Nagaland', suspected: 50000, tested: 2000, confirmed: 100000, deaths: 2000 },
    { state: 'Mizoram', suspected: 50000, tested: 2000, confirmed: 100000, deaths: 2000 },
    { state: 'Arunachal Pradesh', suspected: 50000, tested: 2000, confirmed: 100000, deaths: 2000 },
    { state: 'Sikkim', suspected: 50000, tested: 2000, confirmed: 100000, deaths: 2000 },
    { state: 'Meghalaya', suspected: 50000, tested: 2000, confirmed: 100000, deaths: 200 },
];

function App() {
    const [selectedState, setSelectedState] = useState("INDIA");
    const [stateData, setStateData] = useState({suspected: "0", tested: "0", confirmed: "0", deaths: "0"});
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
            console.log(state);
            setSelectedState(state);
            const response = await axios.get(`http://127.0.0.1:5000/api/data?state=${state}`);
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
                        <input type="date" onChange={e => setDate(e.target.value)}/>
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
