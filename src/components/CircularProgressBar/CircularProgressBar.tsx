import React, { useState, useEffect } from "react";
import "./circularProgressBar.scss";

interface CircularProgressBarProps {
  CurrentValue: number;
  StartValue: number;
  EndValue: number;
  LowValue: number;
  HighValue: number;
  Units: string;
  InnerColor: string;
  TextColor: string;
  Icon: string;
  Title: string;
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  CurrentValue,
  StartValue,
  EndValue,
  LowValue,
  HighValue,
  Units,
  InnerColor,
  TextColor,
  Icon,
  Title,
}) => {
  const [ScaleValue, setScaleValue] = useState(0);
  const [ShowCurrentValue, setCurrentValue] = useState(0);
  const [BarColor, setBarColor] = useState("#e74c3c");
  const [DashOffSet, setDashOffSet] = useState(0);

  const IntervalTime: number = 30; // here use mili seconds
  //const [AnimationTime,setAnimationTime] = useState(30);

  useEffect(() => {
    setCurrentValue(CurrentValue);
  }, [StartValue]);

  useEffect(() => {
    CalCulateScal(StartValue, EndValue, CurrentValue);
  }, [CurrentValue]);

  useEffect(() => {
    HandelScaleValue(ScaleValue);
  }, [ScaleValue]);

  const HandelScaleValue = (value: number) => {
    if (value === ShowCurrentValue) return; // Exit if the value hasn't changed
    const Steps = Math.abs(value - ShowCurrentValue);
    const Increment = (value - ShowCurrentValue) / Steps;
    const IntervalId: number = setInterval(() => {
      setCurrentValue((prevValue) => {
        const NewValue = Math.floor(prevValue + Increment + StartValue);
        UpdateBarColor(NewValue);
        return NewValue >= value ? value : NewValue;
      });
      if (ShowCurrentValue >= value) {
        clearInterval(IntervalId);
      }
    }, IntervalTime);
  };

  useEffect(() => {
    const percentage = ScaleValue / 100;
    const DashOffCal = Math.floor(472 - 472 * percentage);
    setDashOffSet(DashOffCal);
  }, [ScaleValue]);

  const UpdateBarColor = (value: number) => {
    let color: string;

    //const MidPoint = ((LowValue +HighValue)/2 ) + LowValue;

    if (value >= HighValue) {
      // Above or equal to HighValue, set to green
      color = "#2ecc71";
    } else if (value <= LowValue && value >= EndValue) {
      // Below or equal to LowValue, set to red
      color = "#e74c3c";
    } else {
      // Calculate the ratio of ShowCurrentValue between LowValue and HighValue
      const ratio = (value - LowValue) / (HighValue - LowValue);

      // Interpolate between red and green based on the ratio
      const red = Math.floor(255 * (1 - ratio));
      const green = Math.floor(255 * ratio);
      color = `rgb(${red}, ${green}, 0)`;
    }

    setBarColor(color);
  };

  const CalCulateScal = (Start: number, End: number, value: number) => {
    const Range = 100 / (End - Start);
    const div = (value - Start) * Range;

    setScaleValue(div);
  };
  console.log(ShowCurrentValue);
  //console.log(BarColor);
  //console.log(DashOffSet);

  return (
    <div className="progress-bar">
      <div className="outer">
        <div
          className="inner"
          style={{ backgroundColor: InnerColor, border: InnerColor }}
        >
          <div>
            {Icon ? <img alt="icon_stat" src={Icon} className="icon" /> : " "}
          </div>
          <div
            className="title"
            style={{ color: TextColor ? TextColor : "#ffffff" }}
          >
            {Title}
          </div>
          <div
            className="current-value"
            style={{ color: TextColor ? TextColor : "#ffffff" }}
          >
            {ShowCurrentValue
              ? ShowCurrentValue % 1 === 0
                ? ShowCurrentValue.toFixed(0)
                : ShowCurrentValue.toFixed(2)
              : "0"}
            {Units ? Units : "?"}
          </div>
        </div>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width="200px"
        height="200px"
      >
        <circle
          cx="100"
          cy="100"
          r="90"
          strokeLinecap="round"
          strokeDasharray="472"
          style={
            {
              "--BarColor": BarColor,
              "--DashOffSet": DashOffSet,
            } as React.CSSProperties
          }
        />
      </svg>
    </div>
  );
};

export default CircularProgressBar;
