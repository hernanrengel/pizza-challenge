import React from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Grid,
    Chip,
    Divider,
    Stack,
    Button,
    Paper,
    useTheme,
    alpha,
} from '@mui/material';
import { useAppSelector } from '../store/hooks';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useNavigate } from 'react-router-dom';

const OrdersPage: React.FC = () => {
    const { orders } = useAppSelector((state) => state.orders);
    const navigate = useNavigate();
    const theme = useTheme();

    const totalSpent = orders.reduce((acc, order) => acc + order.total, 0);
    const totalPizzas = orders.reduce(
        (acc, order) =>
            acc + order.items.reduce((sum, item) => sum + item.quantity, 0),
        0
    );

    if (orders.length === 0) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '60vh',
                    textAlign: 'center',
                    py: 8,
                }}
            >
                <Box
                    sx={{
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        p: 4,
                        borderRadius: '50%',
                        mb: 3,
                    }}
                >
                    <ReceiptLongIcon
                        sx={{ fontSize: 80, color: theme.palette.primary.main }}
                    />
                </Box>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    No orders yet
                </Typography>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 4, maxWidth: 400 }}
                >
                    Looks like you haven't ordered anything yet. Go back to the menu and
                    start your delicious journey!
                </Typography>
                <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate('/')}
                    startIcon={<LocalPizzaIcon />}
                    sx={{
                        borderRadius: 3,
                        px: 4,
                        py: 1.5,
                        fontWeight: 'bold',
                        textTransform: 'none',
                        fontSize: '1.1rem',
                    }}
                >
                    Browse Menu
                </Button>
            </Box>
        );
    }

    return (
        <Box sx={{ pb: 8 }}>
            <Box sx={{ mb: 6, textAlign: 'center' }}>
                <Typography variant="h3" fontWeight="900" gutterBottom>
                    Order History
                </Typography>
                <Typography variant="h6" color="text.secondary">
                    Track your past delicious moments
                </Typography>
            </Box>

            {/* Summary Dashboard */}
            <Grid container spacing={3} sx={{ mb: 6 }}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            borderRadius: 4,
                            bgcolor: alpha(theme.palette.primary.main, 0.05),
                            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                        }}
                    >
                        <Box
                            sx={{
                                p: 1.5,
                                borderRadius: 3,
                                bgcolor: 'background.paper',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                            }}
                        >
                            <ShoppingBagIcon color="primary" fontSize="large" />
                        </Box>
                        <Box>
                            <Typography variant="body2" color="text.secondary" fontWeight="bold">
                                TOTAL ORDERS
                            </Typography>
                            <Typography variant="h4" fontWeight="900" color="primary.main">
                                {orders.length}
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            borderRadius: 4,
                            bgcolor: alpha(theme.palette.success.main, 0.05),
                            border: `1px solid ${alpha(theme.palette.success.main, 0.1)}`,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                        }}
                    >
                        <Box
                            sx={{
                                p: 1.5,
                                borderRadius: 3,
                                bgcolor: 'background.paper',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                            }}
                        >
                            <AttachMoneyIcon color="success" fontSize="large" />
                        </Box>
                        <Box>
                            <Typography variant="body2" color="text.secondary" fontWeight="bold">
                                TOTAL SPENT
                            </Typography>
                            <Typography variant="h4" fontWeight="900" color="success.main">
                                ${totalSpent.toFixed(2)}
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            borderRadius: 4,
                            bgcolor: alpha(theme.palette.warning.main, 0.05),
                            border: `1px solid ${alpha(theme.palette.warning.main, 0.1)}`,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                        }}
                    >
                        <Box
                            sx={{
                                p: 1.5,
                                borderRadius: 3,
                                bgcolor: 'background.paper',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                            }}
                        >
                            <LocalPizzaIcon color="warning" fontSize="large" />
                        </Box>
                        <Box>
                            <Typography variant="body2" color="text.secondary" fontWeight="bold">
                                PIZZAS ORDERED
                            </Typography>
                            <Typography variant="h4" fontWeight="900" color="warning.main">
                                {totalPizzas}
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                {orders.map((order) => (
                    <Grid size={{ xs: 12 }} key={order.id}>
                        <Card
                            elevation={2}
                            sx={{
                                borderRadius: 4,
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
                                },
                            }}
                        >
                            <CardContent sx={{ p: 4 }}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'flex-start',
                                        mb: 3,
                                        flexWrap: 'wrap',
                                        gap: 2,
                                    }}
                                >
                                    <Box>
                                        <Stack direction="row" alignItems="center" gap={1} mb={1}>
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    bgcolor: 'grey.100',
                                                    px: 1,
                                                    py: 0.5,
                                                    borderRadius: 1,
                                                    fontFamily: 'monospace',
                                                }}
                                            >
                                                #{order.id.slice(0, 8)}
                                            </Typography>
                                            <Chip
                                                label="Completed"
                                                color="success"
                                                size="small"
                                                sx={{ fontWeight: 'bold' }}
                                            />
                                        </Stack>
                                        <Typography variant="h5" fontWeight="bold">
                                            {new Date(order.date).toLocaleDateString(undefined, {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            at {new Date(order.date).toLocaleTimeString()}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ textAlign: 'right' }}>
                                        <Typography variant="h4" fontWeight="900" color="primary">
                                            ${order.total.toFixed(2)}
                                        </Typography>
                                        {order.totalDiscount > 0 && (
                                            <Typography
                                                variant="body2"
                                                color="success.main"
                                                fontWeight="bold"
                                            >
                                                You saved ${order.totalDiscount.toFixed(2)}!
                                            </Typography>
                                        )}
                                    </Box>
                                </Box>

                                <Divider sx={{ my: 3, borderStyle: 'dashed' }} />

                                <Box sx={{ mb: 2 }}>
                                    <Typography
                                        variant="subtitle2"
                                        color="text.secondary"
                                        sx={{ mb: 2, textTransform: 'uppercase', letterSpacing: 1 }}
                                    >
                                        Items Ordered
                                    </Typography>
                                    <Grid container spacing={2}>
                                        {order.items.map((item) => (
                                            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.id}>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        p: 1.5,
                                                        borderRadius: 2,
                                                        bgcolor: 'background.default',
                                                    }}
                                                >
                                                    <Box
                                                        component="img"
                                                        src={item.imageUrl}
                                                        alt={item.name}
                                                        sx={{
                                                            width: 50,
                                                            height: 50,
                                                            borderRadius: 2,
                                                            objectFit: 'cover',
                                                            mr: 2,
                                                        }}
                                                    />
                                                    <Box>
                                                        <Typography variant="subtitle2" fontWeight="bold">
                                                            {item.quantity}x {item.name}
                                                        </Typography>
                                                        <Typography variant="caption" color="text.secondary">
                                                            {item.size} • $
                                                            {(item.price * item.quantity).toFixed(2)}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default OrdersPage;
