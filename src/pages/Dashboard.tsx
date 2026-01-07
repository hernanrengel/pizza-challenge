import React, { useState, useMemo } from 'react';
import { Typography, Box, Grid, type SelectChangeEvent } from '@mui/material';
import { useAppSelector } from '../store/hooks';
import PizzaCard from '../components/PizzaCard';
import MenuFilters from '../components/MenuFilters';
import PromoBanner from '../components/PromoBanner';

const Dashboard: React.FC = () => {
    const { pizzas } = useAppSelector((state) => state.menu);
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('All');
    const [sortBy, setSortBy] = useState('name-asc');
    const [showPromo, setShowPromo] = useState(true);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleCategoryChange = (newCategory: string) => {
        setCategory(newCategory);
    };

    const handleSortChange = (event: SelectChangeEvent) => {
        setSortBy(event.target.value);
    };

    const filteredPizzas = useMemo(() => {
        return pizzas
            .filter((pizza) => {
                const matchesSearch = pizza.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());
                const matchesCategory =
                    category === 'All' || pizza.category === category;
                return matchesSearch && matchesCategory;
            })
            .sort((a, b) => {
                switch (sortBy) {
                    case 'name-asc':
                        return a.name.localeCompare(b.name);
                    case 'name-desc':
                        return b.name.localeCompare(a.name);
                    case 'price-asc':
                        return a.price - b.price;
                    case 'price-desc':
                        return b.price - a.price;
                    default:
                        return 0;
                }
            });
    }, [pizzas, searchTerm, category, sortBy]);

    return (
        <Box sx={{ flexGrow: 1, py: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom align="center">
                Our Menu
            </Typography>

            {showPromo && <PromoBanner onClose={() => setShowPromo(false)} />}

            <MenuFilters
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
                category={category}
                onCategoryChange={handleCategoryChange}
                sortBy={sortBy}
                onSortChange={handleSortChange}
            />

            <Grid container spacing={4}>
                {filteredPizzas.map((pizza) => (
                    <Grid key={pizza.id} size={{ xs: 12, sm: 6, md: 4 }}>
                        <PizzaCard pizza={pizza} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Dashboard;
