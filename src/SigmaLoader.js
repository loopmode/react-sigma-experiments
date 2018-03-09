// based on https://github.com/alx/parasol/blob/master/src/Components/Sigma/Loader.js
import PropTypes from "prop-types";
import React, { PureComponent } from "react";

export default class SigmaLoader extends PureComponent {
    static propTypes = {
        sigma: PropTypes.object,
        graph: PropTypes.object,
        children: PropTypes.node
    };

    state = { loaded: false };

    componentDidMount() {
        this.applyGraph(this.props.graph);
    }

    componentWillReceiveProps(props) {
        if (props.graph !== this.props.sigma.graph) {
            this.setState({ loaded: false }, () =>
                this.applyGraph(props.graph)
            );
        }
    }

    embedProps(elements, extraProps) {
        return React.Children.map(elements, element =>
            React.cloneElement(element, extraProps)
        );
    }

    render() {
        if (!this.state.loaded) return null;
        return this.embedProps(this.props.children, {
            sigma: this.props.sigma
        });
    }

    applyGraph(graph) {
        if (graph && this.props.sigma) {
            this.props.sigma.graph.clear();
            this.props.sigma.graph.read(graph);
            this.props.sigma.refresh();
        }
        this.setState({ loaded: true });
    }
}
