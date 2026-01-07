import React from 'react';
import { Box, Typography, IconButton, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

interface PromoBannerProps {
  onClose: () => void;
}

const PromoBanner: React.FC<PromoBannerProps> = ({ onClose }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        mb: 3,
        borderRadius: 4,
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(255, 107, 139, 0.3)',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, zIndex: 1 }}>
        <Box
          sx={{
            bgcolor: 'rgba(255,255,255,0.2)',
            p: 1,
            borderRadius: '50%',
            display: 'flex',
          }}
        >
          <LocalOfferIcon sx={{ color: 'white' }} />
        </Box>
        <Box>
          <Typography variant="subtitle1" fontWeight="bold">
            Bulk Discount Available!
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            Order <strong>3 or more</strong> of the same pizza and get{' '}
            <strong>10% off</strong> instantly.
          </Typography>
        </Box>
      </Box>
      <IconButton
        onClick={onClose}
        size="small"
        sx={{
          color: 'white',
          bgcolor: 'rgba(255,255,255,0.1)',
          '&:hover': {
            bgcolor: 'rgba(255,255,255,0.2)',
          },
        }}
      >
        <CloseIcon />
      </IconButton>
    </Paper>
  );
};

export default PromoBanner;
