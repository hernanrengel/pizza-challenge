import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Box,
  Chip,
  OutlinedInput,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
  Tooltip,
  InputAdornment,
  IconButton,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Divider,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch } from '../store/hooks';
import { addPizza } from '../store/menuSlice';
import { AVAILABLE_INGREDIENTS, AVAILABLE_CATEGORIES } from '../data/constants';
import type { Pizza } from '../types';

interface AddPizzaModalProps {
  open: boolean;
  onClose: () => void;
}

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  price: Yup.number()
    .required('Price is required')
    .positive('Price must be positive')
    .min(8, 'Price must be at least 8'),
  ingredients: Yup.array()
    .of(Yup.string())
    .min(1, 'Select at least one ingredient')
    .required('Ingredients are required'),
  category: Yup.string().required('Category is required'),
  imageUrl: Yup.string().url('Must be a valid URL'),
});

const AddPizzaModal: React.FC<AddPizzaModalProps> = ({ open, onClose }) => {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      name: '',
      price: '',
      ingredients: [] as string[],
      category: '',
      imageUrl: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      const basePrice = Number(values.price);
      const newPizza: Pizza = {
        id: uuidv4(),
        name: values.name,
        price: basePrice,
        ingredients: values.ingredients,
        category: values.category,
        imageUrl:
          values.imageUrl ||
          'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80', // Default image
      };

      dispatch(addPizza(newPizza));
      resetForm();
      onClose();
    },
  });

  const previewImage =
    formik.values.imageUrl ||
    'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80';

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ pb: 1 }}>
        <Typography variant="h5" component="div" fontWeight="bold">
          Add New Pizza
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Create a new delicious pizza for the menu.
        </Typography>
      </DialogTitle>
      <Divider />
      <form onSubmit={formik.handleSubmit}>
        <DialogContent sx={{ py: 3 }}>
          <Grid container spacing={4}>
            {/* Left Column: Form Fields */}
            <Grid size={{ xs: 12, md: 7 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <TextField
                  fullWidth
                  id="name"
                  name="name"
                  label="Pizza Name"
                  placeholder="e.g., Super Supreme"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />

                <Box sx={{ display: 'flex', gap: 2 }}>
                  <TextField
                    fullWidth
                    id="price"
                    name="price"
                    label="Price (Medium)"
                    type="number"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    error={formik.touched.price && Boolean(formik.errors.price)}
                    helperText={
                      (formik.touched.price && formik.errors.price) ||
                      'Base price for Medium size'
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip title="Small will be -$2, Large will be +$2">
                            <IconButton edge="end" size="small">
                              <InfoIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <FormControl
                    fullWidth
                    error={
                      formik.touched.category && Boolean(formik.errors.category)
                    }
                  >
                    <InputLabel id="category-label">Category</InputLabel>
                    <Select
                      labelId="category-label"
                      id="category"
                      name="category"
                      value={formik.values.category}
                      label="Category"
                      onChange={formik.handleChange}
                    >
                      {AVAILABLE_CATEGORIES.map((category) => (
                        <MenuItem key={category} value={category}>
                          {category}
                        </MenuItem>
                      ))}
                    </Select>
                    {formik.touched.category && formik.errors.category && (
                      <FormHelperText>{formik.errors.category}</FormHelperText>
                    )}
                  </FormControl>
                </Box>

                <FormControl
                  fullWidth
                  error={
                    formik.touched.ingredients &&
                    Boolean(formik.errors.ingredients)
                  }
                >
                  <InputLabel id="ingredients-label">Ingredients</InputLabel>
                  <Select
                    labelId="ingredients-label"
                    id="ingredients"
                    name="ingredients"
                    multiple
                    value={formik.values.ingredients}
                    onChange={formik.handleChange}
                    input={
                      <OutlinedInput
                        id="select-multiple-chip"
                        label="Ingredients"
                      />
                    }
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} size="small" />
                        ))}
                      </Box>
                    )}
                  >
                    {AVAILABLE_INGREDIENTS.map((ingredient) => (
                      <MenuItem key={ingredient} value={ingredient}>
                        {ingredient}
                      </MenuItem>
                    ))}
                  </Select>
                  {formik.touched.ingredients && formik.errors.ingredients && (
                    <FormHelperText>{formik.errors.ingredients}</FormHelperText>
                  )}
                </FormControl>

                <TextField
                  fullWidth
                  id="imageUrl"
                  name="imageUrl"
                  label="Image URL (Optional)"
                  placeholder="https://example.com/pizza.jpg"
                  value={formik.values.imageUrl}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.imageUrl && Boolean(formik.errors.imageUrl)
                  }
                  helperText={
                    (formik.touched.imageUrl && formik.errors.imageUrl) ||
                    'Leave empty for default image'
                  }
                />
              </Box>
            </Grid>

            {/* Right Column: Preview */}
            <Grid size={{ xs: 12, md: 5 }}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ mb: 2, textTransform: 'uppercase', letterSpacing: 1 }}
              >
                Live Preview
              </Typography>
              <Card
                sx={{
                  borderRadius: 4,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'visible',
                }}
              >
                <Box sx={{ position: 'relative', pt: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      my: 2,
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={previewImage}
                      alt="Pizza Preview"
                      sx={{
                        width: '180px',
                        height: '180px',
                        objectFit: 'cover',
                        borderRadius: '50%',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                        bgcolor: '#f5f5f5',
                      }}
                    />
                  </Box>
                </Box>

                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: 'bold', mb: 0.5 }}
                  >
                    {formik.values.name || 'Your Pizza Name'}
                  </Typography>
                  <Typography
                    variant="h5"
                    color="primary"
                    sx={{ fontWeight: 'bold', mb: 2 }}
                  >
                    ${' '}
                    {formik.values.price
                      ? Number(formik.values.price).toFixed(2)
                      : '0.00'}
                  </Typography>

                  {formik.values.category && (
                    <Chip
                      label={formik.values.category}
                      size="small"
                      color="primary"
                      variant="outlined"
                      sx={{ mb: 2 }}
                    />
                  )}

                  {formik.values.ingredients.length > 0 ? (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ lineHeight: 1.6 }}
                    >
                      <Box component="span" sx={{ fontWeight: 'bold' }}>
                        Ingredients:{' '}
                      </Box>
                      {formik.values.ingredients.join(', ')}
                    </Typography>
                  ) : (
                    <Typography
                      variant="body2"
                      color="text.disabled"
                      sx={{ fontStyle: 'italic' }}
                    >
                      Select ingredients to see them here...
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </DialogContent>
        <Divider />
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={onClose} size="large" sx={{ color: 'text.secondary' }}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            sx={{ px: 4, borderRadius: 2, fontWeight: 'bold' }}
          >
            Add Pizza
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddPizzaModal;
