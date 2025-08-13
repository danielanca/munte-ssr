// @ts-nocheck

import React from "react";
import classNames from "classnames";
import { InputGroup, FormControl } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class RangeDatePicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: null,
      endDate: null,
    };

    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
  }

  handleStartDateChange(date) {
    this.setState({ startDate: date });
  }

  handleEndDateChange(date) {
    this.setState({ endDate: date });
  }

  componentDidUpdate(_, prevState) {
    // Only call when both dates are set and changed
    const { startDate, endDate } = this.state;
    if (
      startDate &&
      endDate &&
      (startDate !== prevState.startDate || endDate !== prevState.endDate)
    ) {
      this.props.onValues?.({ dates: { startDate, endDate } });
      this.setState({ startDate: null, endDate: null });
    }
  }

  render() {
    const { className } = this.props;
    const classes = classNames(className, "d-flex", "my-auto", "date-range");

    return (
      <InputGroup className={classes}>
        <DatePicker
          selected={this.state.startDate}
          onChange={this.handleStartDateChange}
          selectsStart
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          placeholderText="Start Date"
          className="form-control text-center bg-light fw-bold"
          dateFormat="yyyy/MM/dd"
        />
        <DatePicker
          selected={this.state.endDate}
          onChange={this.handleEndDateChange}
          selectsEnd
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          minDate={this.state.startDate}
          placeholderText="End Date"
          className="form-control text-center bg-light fw-bold"
          dateFormat="yyyy/MM/dd"
        />
        <InputGroup.Text>
          <i className="material-icons">&#xE916;</i>
        </InputGroup.Text>
      </InputGroup>
    );
  }
}

export default RangeDatePicker;
