// @ts-nocheck

import React from "react";
import PropTypes from "prop-types";
import { Card, Row, Col, Form, Table } from "react-bootstrap";

class CountryReports extends React.Component {
  constructor(props) {
    super(props);

    this.mapRef = React.createRef();

    this.createGoogleMaps = this.createGoogleMaps.bind(this);
    this.initCountriesMap = this.initCountriesMap.bind(this);
  }

  componentDidMount() {
    this.createGoogleMaps().then(this.initCountriesMap);
  }

  render() {
    const { title, countries } = this.props;

    return (
      <Card className="country-stats">
        <Card.Header className="border-bottom d-flex align-items-center justify-content-between">
          <h6 className="mb-0">{title}</h6>
          <div className="block-handle" />
        </Card.Header>

        <Card.Body className="p-0">
          {/* Map Container */}
          <div ref={this.mapRef} style={{ width: "100%", height: "180px" }} />

          {/* Countries Table List */}
          <Table className="m-0" responsive>
            <tbody>
              {countries.map((country, idx) => (
                <tr key={idx}>
                  <td>
                    <img
                      className="country-flag mx-1"
                      src={country.flag}
                      alt={country.title}
                      style={{ height: 18, verticalAlign: "middle" }}
                    />
                    {country.title}
                  </td>
                  <td className="text-end">{country.visitorsAmount}</td>
                  <td className="text-end">{country.visitorsPercentage}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>

        <Card.Footer className="border-top">
          <Row>
            <Col>
              <Form.Select size="sm" value="last-week" style={{ maxWidth: 130 }} onChange={() => {}}>
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

  createGoogleMaps() {
    if (window.__SDPGoogleChartLoaded__) {
      return Promise.resolve();
    }

    window.__SDPGoogleChartLoaded__ = true;

    return new Promise((resolve, reject) => {
      const gmap = document.createElement("script");
      gmap.src = "https://www.gstatic.com/charts/loader.js";
      gmap.type = "text/javascript";
      gmap.onload = resolve;
      gmap.onerror = reject;
      document.body.appendChild(gmap);
    });
  }

  initCountriesMap() {
    /* global google */
    google.charts.load("current", {
      packages: ["geochart"],
      mapsApiKey: "AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY"
    });

    google.charts.setOnLoadCallback(() => {
      const data = google.visualization.arrayToDataTable(this.props.mapsData);

      const options = {
        colorAxis: {
          colors: ["#B9C2D4", "#E4E8EF"]
        },
        legend: false,
        width: "100%"
      };

      const chart = new google.visualization.GeoChart(this.mapRef.current);

      function drawGeochart() {
        chart.draw(data, options);
      }

      drawGeochart();
      window.addEventListener("resize", drawGeochart);
    });
  }
}

CountryReports.propTypes = {
  title: PropTypes.string,
  countries: PropTypes.array,
  mapsData: PropTypes.array
};

CountryReports.defaultProps = {
  title: "Users by Country",
  countries: [
    {
      flag: require("../../images/flags/flag-us.png"),
      title: "United States",
      visitorsAmount: "12,291",
      visitorsPercentage: "23.32%"
    },
    {
      flag: require("../../images/flags/flag-uk.png"),
      title: "United Kingdom",
      visitorsAmount: "11,192",
      visitorsPercentage: "18.8%"
    },
    {
      flag: require("../../images/flags/flag-au.png"),
      title: "Australia",
      visitorsAmount: "9,291",
      visitorsPercentage: "12.3%"
    },
    {
      flag: require("../../images/flags/flag-jp.png"),
      title: "Japan",
      visitorsAmount: "2,291",
      visitorsPercentage: "8.14%"
    }
  ],
  mapsData: [
    ["Country", "Users"],
    ["United States", 12219],
    ["United Kingdom", 11192],
    ["Australia", 9291],
    ["Japan", 2291]
  ]
};

export default CountryReports;
