import Tab from "@material-ui/core/Tab";
import React, { useState } from "react";
import { AlgorithmDescription } from "./AlghorithmDescriptionComponent";
import { CodeEditor } from "./CodeEditorComponent";
import { CodeEditorProps } from "./CodeEditorProps";
import { StyledWorkArea, TabHeader } from "./styles";
import { LibraryBooks, Code } from "@material-ui/icons";
import { TabLabel } from "./TabLabelProps";
import { useDispatch } from "react-redux";
import { ClearFileErrors } from "../../state/fileErrorsReducer";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return <>{value === index && children}</>;
}

function WorkAreaDockF(props: CodeEditorProps, ref?: React.Ref<HTMLDivElement>): JSX.Element {
  const [currentTab, setCurrentTab] = useState(0);
  const dispatch = useDispatch();
  function handleChange(event: React.ChangeEvent<Record<string, unknown>>, newValue: number) {
    dispatch(ClearFileErrors());
    setCurrentTab(newValue);
  }

  return (
    <StyledWorkArea {...props} ref={ref}>
      <TabHeader value={currentTab} onChange={handleChange} aria-label="styled tabs example">
        <Tab label={<TabLabel icon={Code} text="Code" />} />
        <Tab label={<TabLabel icon={LibraryBooks} text="Theory" />} />
      </TabHeader>
      <TabPanel value={currentTab} index={0}>
        <CodeEditor />
      </TabPanel>
      <TabPanel value={currentTab} index={1}>
        <AlgorithmDescription />
      </TabPanel>
    </StyledWorkArea>
  );
}

export const WorkAreaDock = React.forwardRef(WorkAreaDockF);
