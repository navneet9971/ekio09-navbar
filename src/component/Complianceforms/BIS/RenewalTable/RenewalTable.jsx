import { useEffect, useState } from "react"
import axiosInstance from "../../../../interceptors/axios";


function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date
      .getDate()
      .toString()
      .padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date
      .getFullYear()
      .toString()
      .slice(-2);
    return `${day}/${month}/${year}`;
  }

export default function RenewalTable(){

    const [tableData, setTableData] = useState([]);
    const idel = localStorage.getItem('ide');

    useEffect(()=>{
        async function populatedata(){
            axiosInstance.get(`application/compliance/${idel}/`)
      .then(response => {
        const data = response.data.data;
        console.log(data.uniqueid,data.application_name);
        console.log(data);
        setTableData(data);
      })}

      populatedata();

    }, [])



    return<>
    <div className="table-wrapper">
  <table className="Review">
    <thead>
      <tr>
       
        <th className="header" style={{ cursor: "default" }}>
          Model Number
        </th>
        <th className="header" style={{ cursor: "default" }}>
         Name Of Manufacuture
        </th>
        <th className="header" style={{ cursor: "default" }}>
          Product Name
        </th>
        <th className="header" style={{ cursor: "default" }}>
          Brand
        </th>
        <th className="header" style={{ cursor: "default" }}>
          Registration Number
        </th>
        <th className="header" style={{ cursor: "default" }}>
         Date
        </th>
       
        <th className="header" style={{ cursor: "default" }}>
          Compliance Name
        </th>
        
        <th className="header" style={{ cursor: "default" }}>
          Date of Expiry
        </th>
      </tr>
    </thead>

    <tbody>
      
          <tr>
            
            <td className="clickable1">{tableData.uniqueid}</td>
            <td className="clickable1">{tableData.fields?.Factory_name}</td>
            <td style={{ cursor: "default" }}>{tableData.application_name}</td>
            <td style={{ cursor: "default" }}>{tableData.fields?.Brand_trademark}</td>
            <td className="clickable1">{tableData.unique_number}</td>
            <td className="clickable1">{formatDate(tableData.startdate)}</td>
            <td style={{ cursor: "default" }}>{tableData.compliance_name}</td>
            <td style={{ cursor: "default" }}>{tableData.certificate_expiry}</td>
          </tr>
       
    </tbody>
  </table>
</div>
    </>
}