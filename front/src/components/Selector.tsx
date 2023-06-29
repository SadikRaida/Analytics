// @ts-ignore
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import { ChangeEvent } from "react";


interface Props {
    values: any[],
    title: string,
    value: any,
    handleChange: (event: ChangeEvent<{ value: unknown }>) => void
}
export default function Selector({values, title, value, handleChange} : Props) {
    return (
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id={`selector-${title}`}>{title}</InputLabel>
            <Select
                labelId={`selector-${title}`}
                id={`selector-${title}`}
                value={value}
                onChange={handleChange}
                label={`${title}`}
            >
                {
                    values && values.length > 0 &&
                    values.map((value: any) => {
                        return <MenuItem key={value} value={value}>{value}</MenuItem>
                    })
                }
            </Select>
        </FormControl>
    )
}