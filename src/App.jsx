import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  NodeToolbar,
  Panel,
} from "reactflow";
import "reactflow/dist/style.css";
import { useNodesState, useEdgesState, addEdge } from "reactflow";
import { useCallback, useState } from "react";

const initialNodes = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: { label: "1" },
    style: { backgroundColor: "#6ede87", color: "white" },
  },
  {
    id: "2",
    position: { x: 0, y: 100 },
    data: { label: "2" },
    style: { backgroundColor: "#6865A5", color: "white" },
  },
  {
    id: "3",
    position: { x: 0, y: 150 },
    data: { label: "3" },
    style: { backgroundColor: "#ff0072", color: "white" },
  },
];
const initialEdges = [{ id: "e1-2", source: "1", target: "2", animated: true }];
// add interectivity to the nodes

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [variant, setVariant] = useState("cross");
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );
  const nodeColor = (node) => {
    switch (node.type) {
      case "input":
        return "#6ede87";
      case "output":
        return "#6865A5";
      default:
        return "#ff0072";
    }
  };
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Panel>
          <div>variant:</div>
          <button onClick={() => setVariant("dots")}>dots</button>
          <button onClick={() => setVariant("lines")}>lines</button>
          <button onClick={() => setVariant("cross")}>cross</button>
        </Panel>
        <Controls />
        <MiniMap nodeColor={nodeColor} nodeStrokeWidth={3} zoomable pannable />
        <Background variant={variant} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}

export default App;
