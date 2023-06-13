import { ChangeEvent, useState } from "react";

interface SliderProps {
  onChangeSlider: (value: number) => void;
}

const Slider: React.FC<SliderProps> = ({ onChangeSlider }) => {
  const [value, setValue] = useState(50);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setValue(value);
    onChangeSlider(value);
  };

  return (
    <div className="flex items-center">
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={handleChange}
        className="slider h-px w-full appearance-none bg-white accent-white focus:outline-none"
      />
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border: 1px solid white;
          border-radius: 50%;
          background: black;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default Slider;
