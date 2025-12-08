import React from 'react';
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputAdornment,
  Button,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Clear as ClearIcon,
  Refresh as RefreshIcon,
  CloudDownload as ExportIcon,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// Search Box
export const SearchBox = ({ value, onChange, placeholder = 'Search...', sx = {} }) => (
  <TextField
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    size="small"
    sx={{ minWidth: 250, ...sx }}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <SearchIcon fontSize="small" />
        </InputAdornment>
      ),
      endAdornment: value && (
        <InputAdornment position="end">
          <IconButton size="small" onClick={() => onChange('')}>
            <ClearIcon fontSize="small" />
          </IconButton>
        </InputAdornment>
      ),
    }}
  />
);

// Select Filter
export const SelectFilter = ({ label, value, onChange, options, minWidth = 150 }) => (
  <FormControl size="small" sx={{ minWidth }}>
    <InputLabel>{label}</InputLabel>
    <Select value={value} onChange={(e) => onChange(e.target.value)} label={label}>
      <MenuItem value="all">All</MenuItem>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

// Date Range Filter (Simplified without date picker dependency)
export const DateRangeFilter = ({ startDate, endDate, onStartChange, onEndChange }) => (
  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
    <TextField
      type="date"
      size="small"
      label="From"
      value={startDate}
      onChange={(e) => onStartChange(e.target.value)}
      InputLabelProps={{ shrink: true }}
      sx={{ width: 150 }}
    />
    <TextField
      type="date"
      size="small"
      label="To"
      value={endDate}
      onChange={(e) => onEndChange(e.target.value)}
      InputLabelProps={{ shrink: true }}
      sx={{ width: 150 }}
    />
  </Box>
);

// Filter Bar - Combines multiple filters
export const FilterBar = ({
  searchValue,
  onSearchChange,
  searchPlaceholder,
  filters = [],
  onClear,
  onRefresh,
  onExport,
  children,
}) => (
  <Box
    sx={{
      display: 'flex',
      gap: 2,
      flexWrap: 'wrap',
      alignItems: 'center',
      p: 2,
      bgcolor: 'background.paper',
      borderRadius: 1,
      mb: 2,
    }}
  >
    {searchValue !== undefined && (
      <SearchBox value={searchValue} onChange={onSearchChange} placeholder={searchPlaceholder} sx={{ flex: 1 }} />
    )}

    {filters.map((filter, index) => (
      <SelectFilter
        key={index}
        label={filter.label}
        value={filter.value}
        onChange={filter.onChange}
        options={filter.options}
        minWidth={filter.minWidth}
      />
    ))}

    {children}

    <Box sx={{ display: 'flex', gap: 0.5, ml: 'auto' }}>
      {onClear && (
        <Tooltip title="Clear Filters">
          <IconButton onClick={onClear} size="small">
            <ClearIcon />
          </IconButton>
        </Tooltip>
      )}
      {onRefresh && (
        <Tooltip title="Refresh">
          <IconButton onClick={onRefresh} size="small" color="primary">
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      )}
      {onExport && (
        <Tooltip title="Export">
          <IconButton onClick={onExport} size="small" color="primary">
            <ExportIcon />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  </Box>
);

// Active Filters Display
export const ActiveFilters = ({ filters, onRemove, onClearAll }) => {
  const activeFilters = filters.filter((f) => f.value && f.value !== 'all');

  if (activeFilters.length === 0) return null;

  return (
    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2, alignItems: 'center' }}>
      <FilterIcon fontSize="small" color="action" />
      {activeFilters.map((filter, index) => (
        <Chip
          key={index}
          label={`${filter.label}: ${filter.displayValue || filter.value}`}
          size="small"
          onDelete={() => onRemove(filter.key)}
          color="primary"
          variant="outlined"
        />
      ))}
      {activeFilters.length > 1 && (
        <Button size="small" onClick={onClearAll} sx={{ ml: 1 }}>
          Clear All
        </Button>
      )}
    </Box>
  );
};

export default {
  SearchBox,
  SelectFilter,
  DateRangeFilter,
  FilterBar,
  ActiveFilters,
};
