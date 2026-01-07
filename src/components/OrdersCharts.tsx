import React from 'react';
import {
    Box,
    Typography,
    Paper,
    Grid,
    useTheme,
    alpha,
} from '@mui/material';
import {
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import type { Order } from '../types';

interface OrdersChartsProps {
    orders: Order[];
}

const OrdersCharts: React.FC<OrdersChartsProps> = ({ orders }) => {
    const theme = useTheme();

    if (orders.length === 0) {
        return null;
    }

    return (
        <Grid container spacing={3} sx={{ mb: 6 }}>
            <Grid size={{ xs: 12, md: 6 }}>
                <Paper
                    elevation={0}
                    sx={{
                        p: 3,
                        borderRadius: 4,
                        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                        height: '100%',
                    }}
                >
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        Orders by Category
                    </Typography>
                    <Box sx={{ height: 300, width: '100%' }}>
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie
                                    data={Object.entries(
                                        orders
                                            .flatMap((o) => o.items)
                                            .reduce((acc, item) => {
                                                const cat = item.category || 'Other';
                                                acc[cat] = (acc[cat] || 0) + item.quantity;
                                                return acc;
                                            }, {} as Record<string, number>)
                                    ).map(([name, value]) => ({ name, value }))}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {Object.keys(
                                        orders
                                            .flatMap((o) => o.items)
                                            .reduce((acc, item) => {
                                                const cat = item.category || 'Other';
                                                acc[cat] = (acc[cat] || 0) + item.quantity;
                                                return acc;
                                            }, {} as Record<string, number>)
                                    ).map((_, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={
                                                [
                                                    '#0088FE',
                                                    '#00C49F',
                                                    '#FFBB28',
                                                    '#FF8042',
                                                    '#8884d8',
                                                ][index % 5]
                                            }
                                        />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </Box>
                </Paper>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <Paper
                    elevation={0}
                    sx={{
                        p: 3,
                        borderRadius: 4,
                        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                        height: '100%',
                    }}
                >
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        Order Value History
                    </Typography>
                    <Box sx={{ height: 300, width: '100%' }}>
                        <ResponsiveContainer>
                            <BarChart
                                data={orders
                                    .slice()
                                    .reverse()
                                    .map((order) => ({
                                        id: order.id,
                                        date: new Date(order.date).toLocaleDateString(undefined, {
                                            month: 'short',
                                            day: 'numeric',
                                        }),
                                        fullDate: new Date(order.date).toLocaleString(),
                                        amount: order.total,
                                    }))}
                            >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis
                                    dataKey="id"
                                    tickFormatter={(value) => {
                                        const order = orders.find((o) => o.id === value);
                                        if (!order) return '';
                                        return new Date(order.date).toLocaleDateString(undefined, {
                                            month: 'short',
                                            day: 'numeric',
                                        });
                                    }}
                                />
                                <YAxis
                                    tickFormatter={(value) => `$${value}`}
                                />
                                <Tooltip
                                    formatter={(value: number | undefined) => [
                                        value !== undefined ? `$${value.toFixed(2)}` : '',
                                        'Amount'
                                    ]}
                                    labelFormatter={(_label, payload) => {
                                        if (payload && payload.length > 0) {
                                            return payload[0].payload.fullDate;
                                        }
                                        return '';
                                    }}
                                />
                                <Bar
                                    dataKey="amount"
                                    fill={theme.palette.primary.main}
                                    radius={[4, 4, 0, 0]}
                                    name="Order Total"
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default OrdersCharts;
