import React from 'react';
import { Paper, Box, Typography, alpha, useTheme } from '@mui/material';
import type { SvgIconComponent } from '@mui/icons-material';

interface SummaryCardProps {
    title: string;
    value: string | number;
    icon: SvgIconComponent;
    color: 'primary' | 'success' | 'warning' | 'info' | 'error';
}

const SummaryCard: React.FC<SummaryCardProps> = ({
    title,
    value,
    icon: Icon,
    color,
}) => {
    const theme = useTheme();

    return (
        <Paper
            elevation={0}
            sx={{
                p: 3,
                borderRadius: 4,
                bgcolor: alpha(theme.palette[color].main, 0.05),
                border: `1px solid ${alpha(theme.palette[color].main, 0.1)}`,
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
                <Icon color={color} fontSize="large" />
            </Box>
            <Box>
                <Typography variant="body2" color="text.secondary" fontWeight="bold">
                    {title}
                </Typography>
                <Typography variant="h4" fontWeight="900" color={`${color}.main`}>
                    {value}
                </Typography>
            </Box>
        </Paper>
    );
};

export default SummaryCard;
