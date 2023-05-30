// import React from 'react';
// import { PieChart } from 'react-minimal-pie-chart';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// const DashboardPage = () => {
//   // Dummy data for the pie charts
//   const pieChartData = [
//     { title: 'Category A', value: 200, date: '2023-05-30', complianceType: 'TEC' },
//     { title: 'Category B', value: 300, date: '2023-05-30', complianceType: 'TEC' },
//     { title: 'Category C', value: 100, date: '2023-05-30', complianceType: 'BIS' },
//     { title: 'Category D', value: 400, date: '2023-05-30', complianceType: 'BIS' },
//     { title: 'Category E', value: 150, date: '2023-05-30', complianceType: 'BIS' },
//   ];

//   // Dummy data for the bar chart
//   const barChartData = [
//     { name: 'Jan', value: 150, date: '2023-05-30', complianceType: 'TEC' },
//     { name: 'Feb', value: 200, date: '2023-05-30', complianceType: 'TEC' },
//     { name: 'Mar', value: 300, date: '2023-05-30', complianceType: 'BIS' },
//     { name: 'Apr', value: 250, date: '2023-05-30', complianceType: 'BIS' },
//     { name: 'May', value: 400, date: '2023-05-30', complianceType: 'BIS' },
//   ];

//   // Filter pie chart data by date and compliance type
//   const filteredPieChartData = pieChartData.filter(
//     (data) => data.date === '2023-05-30' && data.complianceType === 'TEC'
//   );

//   // Filter bar chart data by date and compliance type
//   const filteredBarChartData = barChartData.filter(
//     (data) => data.date === '2023-05-30' && data.complianceType === 'TEC'
//   );

//   // Custom colors for pie chart categories
//   const pieChartColors = ['#8884d8', '#82ca9d', '#ffc658', '#ffc658', '#ffc658'];

//   return (
//     <div className="dashboard-page">
//       <div className="pie-charts">
//         <h2>Pie Charts</h2>
//         <div className="pie-chart-container">
//           <PieChart
//             data={filteredPieChartData}
//             animate
//             animationDuration={500}
//             animationEasing="ease-out"
//             radius={PieChart.defaultProps.radius - 10}
//             lineWidth={50}
//             segmentsShift={2}
//           >
//             {filteredPieChartData.map((entry, index) => (
//               <text
//                 key={`label-${index}`}
//                 x={entry.x}
//                 y={entry.y}
//                 textAnchor="middle"
//                 dominantBaseline="central"
//                 style={{ fontFamily: 'sans-serif', fontSize: '5px' }}
//               >
//                 {entry.title}
//               </text>
//             ))}
//           </PieChart>
//         </div>
//         {/* Render more pie charts */}
//       </div>

//       <div className="bar-chart">
//         <h2>Bar Chart</h2>
//         <div className="bar-chart-container">
//           <BarChart width={600} height={300} data={filteredBarChartData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="value" fill="#8884d8" />
//           </BarChart>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardPage;
