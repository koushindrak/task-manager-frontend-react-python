// import {GridColDef, GridValueGetterParams} from "@mui/x-data-grid";
// import React from "react";
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {faPen, faTrash} from "@fortawesome/free-solid-svg-icons";
// import ReactTooltip from "react-tooltip";
//
// const columns1: GridColDef[] = [
//   { field: 'name', headerName: 'Name', width: 150,align:"center"},
//   { field: 'description', headerName: 'Description', width: 200 },
//   {
//     field: 'startDate',
//     headerName: 'Start Date',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: true,
//     filterable: true,
//     width: 160,
//     valueGetter: (params: GridValueGetterParams) =>
//       `${new Date(params.row.startDate).toLocaleString('en-US')}`
//   },
//   {
//     field: 'endDate',
//     headerName: 'End Date',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: true,
//     filterable: true,
//     width: 160,
//     valueGetter: (params: GridValueGetterParams) =>
//       `${new Date(params.row.endDate).toLocaleString('en-US')}`
//   },
//   {
//     field: 'actions',
//     headerName: 'Actions',
//     renderCell: (params) => {
//       const row = params.row;
//       return (
//         <div>
//           <button
//             data-tip
//             data-for={"edit" + row.id}
//             onClick={()=>{
//               this.setState({ selectedProjectId: row.original.id, addOrEditIsFetching: true, isEditProject:true });
//               this.props.getProjectsById(row.original.id)
//             }}
//           >
//             <FontAwesomeIcon icon={faPen} />
//           </button>
//           <ReactTooltip id={"edit" + row.id} place="bottom" type="dark">
//             <div className="tooltipText">
//               <p>Edit</p>
//             </div>
//           </ReactTooltip>
//
//           <button
//             data-tip
//             data-for={"delete" + row.id}
//             onClick={() => {
//               // Handle delete action
//             }}
//           >
//             <FontAwesomeIcon icon={faTrash} />
//           </button>
//           <ReactTooltip id={"delete" + row.id} place="bottom" type="dark">
//             <div className="tooltipText">
//               <p>Delete</p>
//             </div>
//           </ReactTooltip>
//         </div>
//       );
//     },
//   }
// ];
//
// const columns5 = [
//   {
//     Header: 'Actions',
//     Cell: row => {
//       return (
//         <div>
//           <button data-tip data-for={"edit" + row.original.id} onClick={()=>{
//             this.setState({ selectedProjectId: row.original.id, addOrEditIsFetching: true, isEditProject:true });
//             this.props.getProjectsById(row.original.id)
//           }}>
//             <FontAwesomeIcon icon={faPen} />
//           </button>
//           <ReactTooltip id={"edit" + row.original.id} place="bottom" type="dark">
//             <div className="tooltipText"><p>Edit</p></div>
//           </ReactTooltip>
//
//           <button data-tip data-for={"delete" + row.original.id} onClick={() => {
//             this.setState({ selectedProjectId: row.original.id });
//             this.props.deleteProject(row.original.id)
//           }}>
//             <FontAwesomeIcon icon={faTrash} />
//           </button>
//           <ReactTooltip id={"delete" + row.original.id} place="bottom" type="dark">
//             <div className="tooltipText"><p>Delete</p></div>
//           </ReactTooltip>
//         </div>
//       )
//     }
//   }
// ];
//


