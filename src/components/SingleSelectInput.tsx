import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { AddonCategory, Location } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

interface Props {
  title: string;
  selectedId: number | undefined;
  setSelectedId: Dispatch<SetStateAction<number | undefined>>;
  items: AddonCategory[] | Location[];
}

const SingleSelectInput = ({
  title,
  selectedId,
  setSelectedId,
  items,
}: Props) => {
  return (
    <FormControl fullWidth>
      <InputLabel>{title}</InputLabel>
      <Select
        value={selectedId}
        label={title}
        onChange={(e) => setSelectedId(Number(e.target.value))}
      >
        {items.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SingleSelectInput;
