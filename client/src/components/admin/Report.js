import React, { useEffect, useState } from 'react';
import { Box } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const Report = () => {
    const [reportData, setReportData] = useState([]);

    useEffect(() => {
        const fetchReportData = async () => {
            try {
                const token = localStorage.getItem('token'); // Retrieve the token from storage
                if (!token) {
                    console.log('No token found, please log in');
                    return;
                }
                const response = await fetch('http://localhost:8001/reports/monthly-orders', {
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token}` // Pass the token in the Authorization header
                    }
                  });

                const data = await response.json();
                setReportData(data);
                console.log("Response: ", data)
            } catch (error) {
                console.error('Error fetching report data:', error);
            }
        };

        fetchReportData();
    }, []);

    return (
        <Box sx={{ paddingTop: 3, marginLeft: 32, justifyContent: 'center' }}>
            <ResponsiveContainer width="90%" height={400}>
                <LineChart data={reportData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="total_orders" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="total_earnings" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        </Box>
    );
};
