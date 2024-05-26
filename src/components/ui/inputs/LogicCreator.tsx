import React, { useState } from "react";
import {
  Paper,
  Grid,
  Box,
  List,
  ListItem,
  ListItemText,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  OutlinedInput,
  IconButton,
} from "@mui/material";
import { useFormikContext } from "formik";
import { IRule } from "@/types/rule.types";
import DeleteIcon from "@mui/icons-material/Delete";

const LogicCreator: React.FC = () => {
  const { values, setFieldValue } = useFormikContext<any>();
  const polygons = values.polygons || [];
  const tags = values.tags || [];
  const rules = values.rules || [];

  const [polygon, setPolygon] = useState("");
  const [allowedDropOffs, setAllowedDropOffs] = useState<string[]>([]);
  const [shiftTags, setShiftTags] = useState<string[]>([]);

  const handleAddRule = () => {
    const newRule: IRule = {
      polygon,
      allowedDropOffs,
      tags: shiftTags,
    };
    const updatedRules = [...rules, newRule];
    setFieldValue("rules", updatedRules);
    setPolygon("");
    setAllowedDropOffs([]);
    setShiftTags([]);
  };

  const handleDeleteRule = (index: number) => {
    const updatedRules = rules.filter((_: any, i: any) => i !== index);
    setFieldValue("rules", updatedRules);
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Polygon</InputLabel>
            <Select
              value={polygon}
              onChange={(e) => setPolygon(e.target.value as string)}
              input={<OutlinedInput label="Polygon" />}
            >
              {polygons.map((poly: string) => (
                <MenuItem key={poly} value={poly}>
                  {poly}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Shift Tags</InputLabel>
            <Select
              multiple
              value={shiftTags}
              onChange={(e) => setShiftTags(e.target.value as string[])}
              input={<OutlinedInput label="Shift Tags" />}
              renderValue={(selected) => (selected as string[]).join(", ")}
            >
              {tags?.map((tag: string) => (
                <MenuItem key={tag} value={tag}>
                  <Checkbox checked={shiftTags.indexOf(tag) > -1} />
                  <ListItemText primary={tag} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Allowed DO</InputLabel>
            <Select
              multiple
              value={allowedDropOffs}
              onChange={(e) => setAllowedDropOffs(e.target.value as string[])}
              input={<OutlinedInput label="Allowed DO" />}
              renderValue={(selected) => (selected as string[]).join(", ")}
            >
              {polygons.map((poly: string) => (
                <MenuItem key={poly} value={poly}>
                  <Checkbox checked={allowedDropOffs.indexOf(poly) > -1} />
                  <ListItemText primary={poly} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleAddRule}>
            Add Rule
          </Button>
        </Grid>
      </Grid>
      <List>
        {rules.map((rule: IRule, index: number) => (
          <ListItem
            key={index}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDeleteRule(index)}
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText
              primary={`Polygon: ${rule.polygon}`}
              secondary={`DO: ${rule.allowedDropOffs.join(
                ", "
              )} | Tags: ${rule.tags.join(", ")}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default LogicCreator;
