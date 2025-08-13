import React, { useState } from "react";
import { ListGroupItem } from "react-bootstrap";
import RangeSlider from 'react-bootstrap-range-slider';

const Sliders = () => {
  // State for sliders
  const [value1, setValue1] = useState(85);
  const [value2, setValue2] = useState(15);
  const [range, setRange] = useState([35, 65]); // For double slider, use rc-slider or similar

  return (
    <ListGroupItem className="px-3">
      <div className="mb-2 pb-1">
        <strong className="text-muted d-block">Custom Sliders</strong>
        {/* Single slider, green */}
        <RangeSlider
          className="my-4"
          value={value1}
          onChange={e => setValue1(Number(e.target.value))}
          tooltip="on"
          min={0}
          max={100}
          variant="success"
        />

        {/* Single slider, info color */}
        <RangeSlider
          className="my-4"
          value={value2}
          onChange={e => setValue2(Number(e.target.value))}
          tooltip="off"
          min={0}
          max={100}
          variant="info"
        />

        {/* Multi-handle slider: Use rc-slider for this feature */}
        {/* Example with rc-slider */}
        {/* 
        import Slider from 'rc-slider';
        import 'rc-slider/assets/index.css';

        <Slider
          range
          value={range}
          onChange={setRange}
          min={0}
          max={100}
          marks={{ 0: '0', 25: '25', 50: '50', 75: '75', 100: '100' }}
        />
        */}
      </div>
    </ListGroupItem>
  );
};

export default Sliders;
