import React from 'react';
import {
    Box,
    TextField,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    type SelectChangeEvent,
    InputAdornment,
    Chip,
    Stack,
    Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface MenuFiltersProps {
    searchTerm: string;
    onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    category: string;
    onCategoryChange: (newCategory: string) => void;
    sortBy: string;
    onSortChange: (event: SelectChangeEvent) => void;
}

const CATEGORIES = ['All', 'Vegetarian', 'Meat', 'Spicy', 'Seafood'];

const MenuFilters: React.FC<MenuFiltersProps> = ({
    searchTerm,
    onSearchChange,
    category,
    onCategoryChange,
    sortBy,
    onSortChange,
}) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                p: 3,
                bgcolor: 'background.paper',
                borderRadius: 4,
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    gap: 2,
                    flexDirection: { xs: 'column', md: 'row' },
                }}
            >
                <TextField
                    label="Search Pizzas"
                    variant="outlined"
                    value={searchTerm}
                    onChange={onSearchChange}
                    fullWidth
                    size="small"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon color="action" />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ flexGrow: 1 }}
                />

                <FormControl size="small" sx={{ minWidth: 200 }}>
                    <InputLabel id="sort-select-label">Sort By</InputLabel>
                    <Select
                        labelId="sort-select-label"
                        id="sort-select"
                        value={sortBy}
                        label="Sort By"
                        onChange={onSortChange}
                    >
                        <MenuItem value="name-asc">Name (A-Z)</MenuItem>
                        <MenuItem value="name-desc">Name (Z-A)</MenuItem>
                        <MenuItem value="price-asc">Price (Low to High)</MenuItem>
                        <MenuItem value="price-desc">Price (High to Low)</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <Box>
                <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    sx={{ mb: 1, ml: 0.5 }}
                >
                    Categories
                </Typography>
                <Stack direction="row" spacing={1} sx={{ overflowX: 'auto', pb: 1 }}>
                    {CATEGORIES.map((cat) => (
                        <Chip
                            key={cat}
                            label={cat}
                            onClick={() => onCategoryChange(cat)}
                            color={category === cat ? 'primary' : 'default'}
                            variant={category === cat ? 'filled' : 'outlined'}
                            clickable
                            sx={{
                                fontWeight: category === cat ? 600 : 400,
                                transition: 'all 0.2s',
                            }}
                        />
                    ))}
                </Stack>
            </Box>
        </Box>
    );
};

export default MenuFilters;
