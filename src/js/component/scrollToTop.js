import React from "react";
import { withRouter } from "react-router";
import PropTypes from "prop-types";

class ScrollToTop extends React.Component {
	componentDidUpdate(prevProps) {
		if (this.props.location !== prevProps.location) {
			window.scrollTo(0, 0);
		}
	}

	render() {
		return this.props.children;
	}
}

export default withRouter(ScrollToTop);

ScrollToTop.propTypes = {
	location: PropTypes.object,
	children: PropTypes.any
};
