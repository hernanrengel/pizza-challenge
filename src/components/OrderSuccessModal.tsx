import React, { useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    Typography,
    Box,
    CircularProgress,
    Fade,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

interface OrderSuccessModalProps {
    open: boolean;
    onClose: () => void;
}

const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
    open,
    onClose,
}) => {
    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        if (open) {
            timer = setTimeout(() => {
                onClose();
            }, 3000);
        }
        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [open, onClose]);

    return (
        <Dialog
            open={open}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    p: 2,
                    textAlign: 'center',
                },
            }}
        >
            <DialogContent>
                <Fade in={open} timeout={500}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            py: 4,
                        }}
                    >
                        <CheckCircleOutlineIcon
                            color="success"
                            sx={{ fontSize: 80, mb: 2 }}
                        />
                        <Typography variant="h4" gutterBottom fontWeight="bold">
                            Order Confirmed!
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                            Your delicious pizza is being prepared.
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <CircularProgress size={24} />
                            <Typography variant="body2" color="text.secondary">
                                Redirecting to orders...
                            </Typography>
                        </Box>
                    </Box>
                </Fade>
            </DialogContent>
        </Dialog>
    );
};

export default OrderSuccessModal;
