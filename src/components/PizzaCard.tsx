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
} from '@mui/material';
import type { Pizza, PizzaSize } from '../types';

interface PizzaCardProps {
    pizza: Pizza;
}

const PizzaCard: React.FC<PizzaCardProps> = ({ pizza }) => {
    const [selectedSize, setSelectedSize] = useState<PizzaSize['size']>('Medium');

    const handleSizeChange = (
        _event: React.MouseEvent<HTMLElement>,
        newSize: PizzaSize['size'] | null
    ) => {
        if (newSize !== null) {
            setSelectedSize(newSize);
        }
    };

    const currentPrice =
        pizza.sizes.find((s) => s.size === selectedSize)?.price || 0;

    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 4,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                overflow: 'visible',
                position: 'relative',
                mt: 4, // Add margin top to allow image to overlap if needed, or just spacing
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
                                    backgroundColor: '#001e3c', // Dark navy like in the image
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

            {/* Add to Cart Button - Kept for functionality but styled minimally */}
            <CardActions sx={{ p: 2, pt: 0 }}>
                <Button
                    variant="contained"
                    fullWidth
                    sx={{
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 'bold',
                        boxShadow: 'none',
                    }}
                >
                    Add to Cart
                </Button>
            </CardActions>
        </Card>
    );
};

export default PizzaCard;
