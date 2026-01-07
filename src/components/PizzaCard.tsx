import React, { useState } from 'react';
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    Button,
    Box,
    ToggleButton,
    ToggleButtonGroup,
    Chip,
    IconButton,
} from '@mui/material';
import type { Pizza, PizzaSize } from '../types';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addToCart, updateQuantity, removeFromCart } from '../store/cartSlice';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

interface PizzaCardProps {
    pizza: Pizza;
}

const PizzaCard: React.FC<PizzaCardProps> = ({ pizza }) => {
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector((state) => state.cart.items);
    const [selectedSize, setSelectedSize] = useState<PizzaSize['size']>('Medium');

    const [localQuantity, setLocalQuantity] = useState(1);

    // Check if the current pizza + size is in the cart
    const cartItem = cartItems.find(
        (item) => item.pizzaId === pizza.id && item.size === selectedSize
    );
    const isInCart = !!cartItem;

    // Derived state: if in cart, use cart quantity; otherwise use local quantity
    const displayQuantity =
        isInCart && cartItem ? cartItem.quantity : localQuantity;

    const handleSizeChange = (
        _event: React.MouseEvent<HTMLElement>,
        newSize: PizzaSize['size'] | null
    ) => {
        if (newSize !== null) {
            setSelectedSize(newSize);
            // Reset local quantity when size changes (if not in cart)
            if (
                !cartItems.find(
                    (item) => item.pizzaId === pizza.id && item.size === newSize
                )
            ) {
                setLocalQuantity(1);
            }
        }
    };

    const currentPrice =
        pizza.sizes.find((s) => s.size === selectedSize)?.price || 0;

    const handleIncrement = () => {
        if (isInCart && cartItem) {
            dispatch(
                updateQuantity({ id: cartItem.id, quantity: cartItem.quantity + 1 })
            );
        } else {
            setLocalQuantity((prev) => prev + 1);
        }
    };

    const handleDecrement = () => {
        if (isInCart && cartItem) {
            if (cartItem.quantity > 1) {
                dispatch(
                    updateQuantity({ id: cartItem.id, quantity: cartItem.quantity - 1 })
                );
            } else {
                dispatch(removeFromCart(cartItem.id));
            }
        } else {
            setLocalQuantity((prev) => Math.max(1, prev - 1));
        }
    };

    const handleAddToCart = () => {
        dispatch(
            addToCart({
                pizzaId: pizza.id,
                name: pizza.name,
                price: currentPrice,
                quantity: localQuantity,
                size: selectedSize,
                imageUrl: pizza.imageUrl,
            })
        );
        setLocalQuantity(1);
    };

    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 4,
                boxShadow: isInCart
                    ? '0 0 0 2px #1976d2, 0 4px 12px rgba(0,0,0,0.1)'
                    : '0 4px 12px rgba(0,0,0,0.1)',
                overflow: 'visible',
                position: 'relative',
                mt: 4,
                transition: 'box-shadow 0.3s ease',
            }}
        >
            <CardContent sx={{ flexGrow: 1, pt: 3 }}>
                {/* Header: Name and Price */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        mb: 1,
                    }}
                >
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ fontWeight: 'bold', lineHeight: 1.2 }}
                    >
                        {pizza.name}
                    </Typography>
                    <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                        $ {currentPrice.toFixed(2)}
                    </Typography>
                </Box>

                {/* Category Chip */}
                <Box sx={{ mb: 2 }}>
                    <Chip
                        label={pizza.category}
                        size="small"
                        variant="outlined"
                        color={pizza.category === 'Vegetarian' ? 'success' : 'default'}
                        sx={{
                            height: 24,
                            fontSize: '0.75rem',
                            fontWeight: 500,
                            borderColor: 'divider',
                        }}
                    />
                </Box>

                {/* Ingredients */}
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: '0.8rem', mb: 2, lineHeight: 1.4 }}
                >
                    <Box
                        component="span"
                        sx={{ fontWeight: 'bold', color: 'text.primary' }}
                    >
                        Ingredients:
                    </Box>{' '}
                    {pizza.ingredients.join(', ')}
                </Typography>

                {/* Image */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        my: 2,
                    }}
                >
                    <CardMedia
                        component="img"
                        image={pizza.imageUrl}
                        alt={pizza.name}
                        sx={{
                            width: '180px',
                            height: '180px',
                            objectFit: 'cover',
                            borderRadius: '50%',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                            transition: 'transform 0.3s ease',
                            '&:hover': {
                                transform: 'scale(1.05)',
                            },
                        }}
                    />
                </Box>

                {/* Size Selector */}
                <Box sx={{ mt: 'auto' }}>
                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: 'block', mb: 1 }}
                    >
                        Size
                    </Typography>
                    <ToggleButtonGroup
                        value={selectedSize}
                        exclusive
                        onChange={handleSizeChange}
                        aria-label="pizza size"
                        fullWidth
                        size="small"
                        sx={{
                            backgroundColor: '#f5f5f5',
                            borderRadius: 2,
                            '& .MuiToggleButton-root': {
                                border: 'none',
                                borderRadius: 2,
                                py: 1,
                                textTransform: 'none',
                                fontWeight: 500,
                                color: 'text.secondary',
                                '&.Mui-selected': {
                                    backgroundColor: '#001e3c',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: '#002e5c',
                                    },
                                },
                            },
                        }}
                    >
                        <ToggleButton value="Small">SMALL</ToggleButton>
                        <ToggleButton value="Medium">MEDIUM</ToggleButton>
                        <ToggleButton value="Large">LARGE</ToggleButton>
                    </ToggleButtonGroup>
                </Box>
            </CardContent>

            <CardActions sx={{ p: 2, pt: 0, flexDirection: 'column', gap: 2 }}>
                {/* Quantity Selector */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 2,
                        width: '100%',
                    }}
                >
                    <IconButton
                        size="small"
                        onClick={handleDecrement}
                        disabled={!isInCart && displayQuantity <= 1}
                        sx={{ border: '1px solid', borderColor: 'divider' }}
                    >
                        <RemoveIcon fontSize="small" />
                    </IconButton>
                    <Typography variant="body1" fontWeight="bold">
                        {displayQuantity}
                    </Typography>
                    <IconButton
                        size="small"
                        onClick={handleIncrement}
                        sx={{ border: '1px solid', borderColor: 'divider' }}
                    >
                        <AddIcon fontSize="small" />
                    </IconButton>
                </Box>

                {isInCart ? (
                    <Button
                        variant="outlined"
                        fullWidth
                        color="primary"
                        sx={{
                            borderRadius: 2,
                            textTransform: 'none',
                            fontWeight: 'bold',
                            boxShadow: 'none',
                            bgcolor: 'action.hover',
                        }}
                    >
                        In Cart (Total: ${(currentPrice * displayQuantity).toFixed(2)})
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={handleAddToCart}
                        sx={{
                            borderRadius: 2,
                            textTransform: 'none',
                            fontWeight: 'bold',
                            boxShadow: 'none',
                        }}
                    >
                        Add to Cart - ${(currentPrice * displayQuantity).toFixed(2)}
                    </Button>
                )}
            </CardActions>
        </Card>
    );
};

export default PizzaCard;
