import React from 'react';
import './AuditLogs.css';
import {useState,useEffect} from 'react';

const AuditLogs = () => {
    const [auditLog,setAuditLog] = useState([]);

    useEffect(() => {
      const getAudits =async ()=>{
        try{
          const token = localStorage.getItem('access_token');
          const role = localStorage.getItem('role');
          if(role==='admin'){
            const response = await fetch('http://localhost:5000/api/audits/getAllBusinessAudit',{
              method : 'GET',
              headers : {
                'Authorization' : token
              }
            });
  
            const data = await response.json();
  
            if(response.ok){
              setAuditLog(data);
            }
            else{
              console.error(data.message || 'Failed to fetch audit log');
            }
  
          }
          else{
            alert('User is not an admin');
            console.error('User is not an admin');
          }
        }catch(err){
          console.error(`'Something went wrong!',${err.message}`);
        }
      }
      getAudits();
    }, []);

    return (
      // <div className='audit-list'>
      // {auditLog.map((audit,ind)=>{
      //   return <div key={ind} className="audit-card">
      //   <p><strong>Action : </strong>{audit.action}</p>
      //   <p><strong>Performed By : </strong>{audit.performedByName}</p>
      //   <p><strong>Role : </strong>{audit.role}</p>
      //   <p><strong>Business ID : </strong>{audit.businessId}</p>
      //   <p><strong>Changes : </strong><ul>{Object.entries(audit.changes).map(([key, value]) => (
      // <li key={key}><strong>{key}:</strong> {String(value)}</li>))}</ul></p>
      //   <p><strong>Sold By : </strong>{audit.soldById ? audit.soldById.fullName : 'N/A'}</p>
      //   <p><strong>Timestamp : </strong>{new Date(audit.timeStamp).toLocaleString()}</p>
      //   </div>
      // })}
      //  </div>

      <div className='table-container'>
        <h2>Audit Logs</h2>
        <div className="table-scroll-wrapper">
        <table className="audit-table">
          <thead>
            <tr>
              <th>Action</th>
              <th>Performed By</th>
              <th>Role</th>
              <th>Business ID</th>
              <th>Changes</th>
              <th>Sold By</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {auditLog.map((audit,ind)=>{
              return <tr key={ind}>
              <td>{audit.action}</td>
              <td>{audit.performedByName}</td>
              <td>{audit.role}</td>
              <td>{audit.businessId}</td>
              <td><ul>{Object.entries(audit.changes).map(([key,value])=>{return <li key={key}><strong>{key} : </strong>{String(value)}</li>})}</ul></td>
              <td>{audit.soldById.fullName}</td>
              <td>{new Date(audit.timeStamp).toLocaleString('en-GB')}</td>
            </tr>
            })}
          </tbody>
        </table>
        </div>

      </div>
    );
}

export default AuditLogs;
