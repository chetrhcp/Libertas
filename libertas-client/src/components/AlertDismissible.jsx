import React from "react";
import { Alert } from "react-bootstrap";

class AlertDismissible extends React.Component {
  constructor(props) {
    super(props);

    this.state = { show: false };
  }

  render() {
    return (
      <div>
        <Alert show={this.props.show} variant="success">
          <Alert.Heading>Success!</Alert.Heading>
          <hr />
        </Alert>
      </div>
    );
  }
}

export default AlertDismissible;
