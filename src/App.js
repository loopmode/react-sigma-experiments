// import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import ReactDOM from "react-dom";
import css from "./App.scss";

import { Sigma, EdgeShapes, ForceAtlas2 } from "react-sigma";

import SigmaLoader from "./SigmaLoader";

const STAGE_WIDTH = 500;
const STAGE_HEIGHT = 500;
const NODE_SIZE = 3;

const MARGIN = 50;

class App extends PureComponent {
    state = {
        graph: {
            nodes: [
                { id: "a", label: "A", x: MARGIN, y: MARGIN, size: NODE_SIZE },
                {
                    id: "b",
                    label: "B",
                    x: MARGIN,
                    y: STAGE_HEIGHT - MARGIN,
                    size: NODE_SIZE
                },
                {
                    id: "c",
                    label: "C",
                    x: STAGE_WIDTH - MARGIN,
                    y: STAGE_HEIGHT - MARGIN,
                    size: NODE_SIZE
                }
            ],
            edges: [
                { id: "a_to_b", source: "a", target: "b", label: "A -> B" },
                { id: "b_to_c", source: "b", target: "c", label: "B -> C" },
                { id: "c_to_a", source: "c", target: "a", label: "C -> A" },
                { id: "b_to_a", source: "b", target: "a", label: "B -> A" }
            ]
        }
    };

    render() {
        return (
            <div className="App">
                <div
                    className={css.Sigma}
                    style={{ width: STAGE_WIDTH, height: STAGE_HEIGHT }}
                >
                    <Sigma
                        ref={this.handleSigmaRef}
                        style={{ width: STAGE_WIDTH, height: STAGE_HEIGHT }}
                        settings={{
                            drawEdges: true,
                            drawEdgeLabels: true
                            // zoomMin: 1,
                            // zoomMax: 1,
                            // autoResize: false,
                            // autoRescale: true
                        }}
                        onClickStage={this.handleClickStage}
                    >
                        <SigmaLoader graph={this.state.graph}>
                            <EdgeShapes default="curvedArrow" />
                            <ForceAtlas2 iterationsPerRender={1} timeout={1} />
                        </SigmaLoader>
                    </Sigma>
                </div>
            </div>
        );
    }
    handleSigmaRef = ref => {
        this.sigma = ref && ref.sigma;
        this.sigmaElement = ref && ReactDOM.findDOMNode(ref);
    };
    handleClickStage = ({ data }) => {
        let { clientX, clientY } = data.captor;

        // converting the coords is the tricky part
        // see https://github.com/jacomyal/sigma.js/blob/master/examples/add-node-on-click.html#L410-L415

        let x = clientX - STAGE_WIDTH / 2;
        let y = clientY - STAGE_HEIGHT / 2;
        const p = this.sigma.camera.cameraPosition(clientX, clientY);
        x = p.x;
        y = p.y;

        const { nodes, edges } = this.state.graph;

        const graph = {
            nodes: [
                ...nodes,
                {
                    x,
                    y,
                    id: `n_${Date.now()}`,
                    label: `Node ${nodes.length + 1}`,
                    size: NODE_SIZE
                }
            ],
            edges: edges
        };

        this.setState({ graph });
    };
}

export default App;
