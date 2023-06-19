import React, { useEffect, useState } from "react";
import "./dashboard.css";
import { Chart, ArcElement, CategoryScale, LinearScale, DoughnutController, Tooltip, Title, Legend,  BarController, BarElement, } from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";
import axiosInstance from "../../interceptors/axios";
import Swal from 'sweetalert2';
import { blue, green, orange } from "@mui/material/colors";

Chart.register(ArcElement, CategoryScale, LinearScale, DoughnutController,BarController, BarElement, Tooltip, Title, Legend );

function DoughnutChart({ data }) {
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          position: "nearest",
          intersect: false,
          callbacks: {
            label: function (context) {
              const label = context.label || "";
              const value = context.raw || 0;
              const percentage = Math.round((value / context.dataset.data.reduce((a, b) => a + b, 0)) * 100);
              const tooltipText = `${label}: ${percentage}%`;
              return `${tooltipText}`;
            },
          },
        },
        legend: {
          display: true,
          position: "bottom", // Display legend at the bottom
        },
      },
    };
    
    return (
      <div className="chart-container">
        <Doughnut data={data} options={options} height={200} width={200} />
      </div>
    );
  }

  function BarChart({ data }) {
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          position: "nearest",
          intersect: false,
        },
   
        legend: {
          display: true,
          position: "bottom",
        },
      },
    };
  
    return (
      <div className="chart-bar-container">
        <Bar data={data} options={options} height={400} width={600} />
      </div>
    );
  }
  
  
function Dashboard() {
  const [chartData, setChartData] = useState(null);
  const [tecDash, setTecDash] = useState(null);
  const [bisDash, setBisDash] = useState(null);
  const [barChartData, setBarChartData] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [filter, setFilter] = useState("");
  const [fetchedData, setFetchedData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axiosInstance.get("/dashboard", {
          params: {
            period: filter, // Include the dropdownValue in the request parameters
            product: searchText,
          },
        });
        const dashData = response.data.data;
        console.log(response);
  
        // Update fetched data state
        setFetchedData(dashData);
  
        // Process the data for the charts
        const processedData = {
          labels: ["TOTAL ON-GOING", "TOTAL COMPLETED"],
          datasets: [
            {
              label: "Data 1",
              data: [dashData.total_ongoing, dashData.total_completed],
              backgroundColor: [orange[500], green[500]],
              hoverOffset: 4,
            },
          ],
        };
  
        const TECCompliancedash = {
          labels: ["TEC ON-GOING", "TEC COMPLETED", "TEC APPLICATION"],
          datasets: [
            {
              label: "Data 1",
              data: [dashData.total_ongoing_tec, dashData.total_completed_tec, dashData.total_application_tec],
              backgroundColor: [orange[500], green[500], blue[300]],
              hoverOffset: 4,
            },
          ],
        };
  
        const BISCompliancedash = {
          labels: ["BIS ON-GOING", "BIS COMPLETED", "BIS APPLICATION"],
          datasets: [
            {
              label: "Data 1",
              data: [dashData.total_ongoing_bis, dashData.total_completed_bis, dashData.total_application_bis],
              backgroundColor: [orange[500], green[500], blue[300]],
              hoverOffset: 4,
            },
          ],
        };

         // Process the data for the bar chart
    const barData = {
        labels: ["Total Application", "Total Application TEC", "Total Application BIS"],
        datasets: [
          {
            label: "TOTAL APPLICATION",
            data: [dashData.total_application, dashData.total_application_tec, dashData.total_application_bis],
            backgroundColor: [orange[500], green[500], blue[300]],
            hoverOffset: 4,
          },
        ],
      };
  
        // Modify labels and background colors based on searchText
        if (searchText !== "") {
          // Update labels
          processedData.labels = processedData.labels.map(label => `${searchText} ${label}`);
          TECCompliancedash.labels = TECCompliancedash.labels.map(label => `${searchText} ${label}`);
          BISCompliancedash.labels = BISCompliancedash.labels.map(label => `${searchText} ${label}`);
          barData.labels = barData.labels.map((label) => `${searchText} ${label}`);
  
          // Update background colors
          processedData.datasets[0].backgroundColor = [orange[500], green[500]];
          TECCompliancedash.datasets[0].backgroundColor = [orange[500], green[500], blue[300]];
          BISCompliancedash.datasets[0].backgroundColor = [orange[500], green[500], blue[300]];
          barData.datasets[0].backgroundColor = [orange[500], green[500], blue[300]];
        }
  
        setChartData(processedData);
        setTecDash(TECCompliancedash);
        setBisDash(BISCompliancedash);
        setBarChartData(barData);
  
        // Check if all data points are zero
        if (
          dashData.total_ongoing === 0 &&
          dashData.total_completed === 0 &&
          dashData.total_ongoing_tec === 0 &&
          dashData.total_completed_tec === 0 &&
          dashData.total_application_tec === 0 &&
          dashData.total_ongoing_bis === 0 &&
          dashData.total_completed_bis === 0 &&
          dashData.total_application_bis === 0
        ) {
          setShowPopup(true);
        } else {
          setShowPopup(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  
    fetchData();
  }, [searchText, filter]);
  

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredChartData = filterData(chartData, searchText, filter);
  const filteredTecDash = filterData(tecDash, searchText, filter);
  const filteredBisDash = filterData(bisDash, searchText, filter);
  const filteredBarChartData = filterData(barChartData, searchText, filter);

  function filterData(dashData, searchText, filter) {
    if (searchText === "" && filter === "") {
      return dashData;
    }

    const filteredLabels = dashData.labels.filter((label) => label.toLowerCase().includes(searchText.toLowerCase()));
    const filteredData = dashData.datasets.map((dataset) => ({
      ...dataset,
      dashData: dataset.data.slice(0, filteredLabels.length),
    }));

    return {
      labels: filteredLabels,
      datasets: filteredData,
    };
  }

  if (!fetchedData) {
    return (
      <div style={{ textAlign: 'center', fontSize: '80px', marginTop: '100px' }}>
       Page Loading...
      </div>
    );
  }

  if (showPopup && searchText.trim() !== "") {
    Swal.fire({
      title: 'Try another product',
      icon: 'info',
      confirmButtonText: 'OK',
    }).then(() => {
      setSearchText(""); // Reset searchText to empty string
    });
  }
  
  
  return (
    <div className="container-wrapper">
      <h1 style={{ fontSize: '29px', padding: '22px 79px', fontWeight: '100', color: "black" }}>Analytics Dashboard</h1>

      <div className="search-filter-container">
        <input type="search-dashbo" placeholder="Search By Product Name" value={searchText} onChange={handleSearchTextChange} />
        <select className ="search-dash" value={filter} onChange={handleFilterChange}>
          <option value="">Filter By Days</option>
          <option value="30">30 Days Ago</option>
          <option value="60">60 Days Ago</option>
          <option value="90">90 Days Ago</option>
          <option value="120">120 Days Ago</option>
          <option value="365">365 Days Ago</option>
          
        </select>
      </div>

      <div className="container-piechart">
        <div className="col-dash">
          <h4 style={{ fontSize: "18px", textAlign: "center", fontWeight: 100 }}>Total Application TEC and BIS</h4>
          <BarChart data={filteredBarChartData} />
        </div>
      </div>

      <div className="container-piechart">
        <div className="col-dash">
          <h4 style={{ fontSize: "18px", textAlign: "center", fontWeight: 100 }}>TOTAL On Going Vs TOTAL Completed</h4>
          <DoughnutChart data={filteredChartData} />
        </div>
      </div>

      <div className="container-piechart">
        <div className="col-dash">
          <h4 style={{ fontSize: "18px", textAlign: "center", fontWeight: 100 }}>TEC On Going Vs TEC Completed Vs TEC Application</h4>
          <DoughnutChart data={filteredTecDash} />
        </div>
      </div>

      <div className="container-piechart">
        <div className="col-dash">
          <h4 style={{ fontSize: "18px", textAlign: "center", fontWeight: 100 }}>BIS On Going Vs BIS Completed Vs BIS Application</h4>
          <DoughnutChart data={filteredBisDash} />
        </div>
      </div>

      
    </div>
  );
}

export default Dashboard;
