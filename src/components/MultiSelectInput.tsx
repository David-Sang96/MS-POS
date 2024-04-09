import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { AddonCategory, Menu, MenuCategory } from "@prisma/client";
import { SetStateAction } from "react";

interface Props {
  title: string;
  selectedIds: number[];
  setSelectedIds: (value: SetStateAction<number[]>) => void;
  items: MenuCategory[] | Menu[] | AddonCategory[];
}

const MultiSelectInput = ({
  title,
  selectedIds,
  setSelectedIds,
  items,
}: Props) => {
  return (
    <FormControl fullWidth>
      <InputLabel>{title}</InputLabel>
      <Select
        input={<OutlinedInput label={title} />}
        multiple
        value={selectedIds}
        onChange={(evt) => {
          const item = evt.target.value as number[];
          setSelectedIds(item);
        }}
        renderValue={() =>
          selectedIds
            .map((selectedId) => items.find((item) => item.id === selectedId))
            .map((item: any) => item.name)
            .join(", ")
        }
      >
        {items.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            <Checkbox checked={selectedIds.includes(item.id)} />
            <ListItemText primary={item.name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultiSelectInput;
