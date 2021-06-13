import { makeStyles } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React from "react";
import { SelectionStepResult } from "../../logic/algo/stepModels";
import { ComponentWithDescriptionOptions } from "./ComponentWithDescriptionOptions";
import { RenderTree } from "./RenderTreeHelper";
import { Text, Title } from "./styled";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export function SelectionDescription({
  stepResult,
}: ComponentWithDescriptionOptions<SelectionStepResult>): JSX.Element {
  const { selectedNodeToVisit, alreadyVisitedNodes } = stepResult;
  const classes = useStyles();
  return (
    <>
      <Title>Selection</Title>
      <RenderTree label="Node to visit: " treeRoot={selectedNodeToVisit} />
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell align="left">Visited node id</TableCell>
            <TableCell align="left">Visit count</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from(alreadyVisitedNodes.keys()).map((node) => (
            <TableRow key={node.id}>
              <TableCell align="left">{node.id}</TableCell>
              <TableCell align="left">{alreadyVisitedNodes.get(node)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
