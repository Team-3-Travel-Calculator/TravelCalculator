import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const SelectForm = ({ label, array, value, handleChange }) => (
  <FormControl variant="outlined" className="w-60">
    <InputLabel id="select-label">{label}</InputLabel>
    <Select
      variant="outlined"
      labelId="select-label"
      id="selectId"
      value={value}
      onChange={handleChange}
    >
      {array &&
        array.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.value}
          </MenuItem>
        ))}
    </Select>
  </FormControl>
);
export default SelectForm;
