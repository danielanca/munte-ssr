// @ts-nocheck

import React from "react";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  Card,
  Form,
} from "react-bootstrap";

import Chart from "../../utils/chart";

class UsersByDevice extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    const chartConfig = {
      type: "pie",
      data: this.props.chartData,
      options: {
        legend: {
          position: "bottom",
          labels: {
            padding: 25,
            boxWidth: 20
          }
        },
        cutoutPercentage: 0,
        tooltips: {
          custom: false,
          mode: "index",
          position: "nearest"
        },
        ...this.props.chartOptions
      }
    };
    new Chart(this.canvasRef.current, chartConfig);
  }

  render() {
    const { title } = this.props;
    return (
      <Card className="h-100">
        <Card.Header className="border-bottom">
          <h6 className="m-0">{title}</h6>
        </Card.Header>
        <Card.Body className="d-flex py-0">
          <canvas
            height="220"
            ref={this.canvasRef}
            className="blog-users-by-device m-auto"
          />
        </Card.Body>
        <Card.Footer className="border-top">
          <Row>
            <Col>
              <Form.Select
                size="sm"
                value="last-week"
                style={{ maxWidth: "130px" }}
                onChange={() => {}}
              >
                <option value="last-week">Last Week</option>
                <option value="today">Today</option>
                <option value="last-month">Last Month</option>
                <option value="last-year">Last Year</option>
              </Form.Select>
            </Col>
            <Col className="text-end view-report">
              {/* eslint-disable-next-line */}
              <a href="#">View full report &rarr;</a>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    );
  }
}

UsersByDevice.propTypes = {
  title: PropTypes.string,
  chartConfig: PropTypes.object,
  chartOptions: PropTypes.object,
  chartData: PropTypes.object
};

UsersByDevice.defaultProps = {
  title: "Users by device",
  chartData: {
    datasets: [
      {
        hoverBorderColor: "#ffffff",
        data: [68.3, 24.2, 7.5],
        backgroundColor: [
          "rgba(0,123,255,0.9)",
          "rgba(0,123,255,0.5)",
          "rgba(0,123,255,0.3)"
        ]
      }
    ],
    labels: ["Desktop", "Tablet", "Mobile"]
  }
};

export default UsersByDevice;
