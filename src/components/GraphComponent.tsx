import { identity } from "lodash";
import { AutoComplete } from "material-ui";
import React from "react";
import { Graph } from "react-d3-graph";
import { HtmlElementProps } from "../utlis";

// graph payload (with minimalist structure)
const exampleData = {
  nodes: [{ id: "Node1" }, { id: "Node2" }, { id: "Node3" }, { id: "Node4" }, { id: "Node5" }],
  links: [
    { source: "Node1", target: "Node2" },
    { source: "Node1", target: "Node4" },
    { source: "Node4", target: "Node3" },
    { source: "Node4", target: "Node5" },
  ],
};

// the graph configuration, just override the ones you need
const myConfig = {
  nodeHighlightBehavior: true,
  node: {
    color: "lightgray",
    highlightColor: "orange",
    size: 300,
  },
  link: {
    highlightColor: "orange",
  },
};

export function GraphVis({
  data,
}: {
  data: {
    nodes: { id: string; x: number; y: number }[];
    links: { source: string; target: string }[];
  };
}): JSX.Element {
  const dataModified = data;
  dataModified.nodes = data.nodes.map((n: { id: string; x: number; y: number }) => ({
    ...{
      id: n.id,
      // unfortunately cannot automatically locate nodes RN
      x: n.x,
      y: n.y,
    },
    n,
  }));
  return (
    <Graph
      id="graph" // id is mandatory
      data={data} // props.data to receive data from arguments
      config={myConfig}
    />
  );
}
