import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SystemMonitor = () => {
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/system-info')
      .then(res => {
        setInfo(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch system info:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2>System Monitor</h2>
      {loading ? (
        <p>Loading system info...</p>
      ) : (
        <>
          <p>CPU Load: {info.cpuLoad ?? 'N/A'}</p>
          <p>Total Memory: {info.totalMem ? (info.totalMem / 1024 ** 3).toFixed(2) + ' GB' : 'N/A'}</p>
          <p>Free Memory: {info.freeMem ? (info.freeMem / 1024 ** 3).toFixed(2) + ' GB' : 'N/A'}</p>
          <p>Uptime: {info.uptime ? (info.uptime / 3600).toFixed(2) + ' hrs' : 'N/A'}</p>
        </>
      )}
    </div>
  );
};

export default SystemMonitor;