import React, { useState } from "react";
import { ReactComponent as Check } from "./../TdA/Custom_SVG/check.svg"
import MultiRangeSlider from "./MultiRangeSlider";

function CheckBox({ label, count, onChange, onSelect, onRemove, id }) {
  const [checked, setChecked] = useState(false);

  function onChanged() {
    if (checked) {
      onRemove(id)
    } else if (!checked) {
      onSelect(id)
    }
  }



  return (
    <div className="w-full">
      <label className="flex flex-row items-center justify-between">
        <div className="flex flex-row gap-2 items-center">
          <input type="checkbox" onChange={onChange} value={id} className="hidden" onInput={() => { setChecked(!checked); onChanged(); }} />
          <div className="rounded border-jet border-2 w-6 h-6 flex justify-center items-center">
            {checked && <div className="rounded-sm bg-jet w-[90%] h-[90%] flex items-center justify-center">
              <Check className="text-white" />
            </div>}
          </div>
          <span className="text-jet select-none">{label}</span>
        </div>

        <div className="text-jet select-none">{count}</div>

      </label>
    </div>
  );
}

export default function FilterMenu({ setFilterPrice, filterPriceRange }) {
  return (
    <>
      <div className="max-w-[25rem] w-full relative px-6">
        <div className="rounded-full flex bg-white">
          <div className="py-3 flex-[2] px-8">Cena</div>
          <div className="py-3 px-6 pr-8">+</div>
        </div>
        <div className="absolute w-full mt-2 px-6 py-6 bg-white">
          <div className="font-nadpis text-2xl">
            Filter
          </div>
          <div className="flex justify-center h-[2rem]">
            <MultiRangeSlider min={filterPriceRange[0]} max={filterPriceRange[1]} onChange={({ min, max }) => { const price = [min, max]; setFilterPrice(price); }} />
          </div>

        </div>
      </div>
    </>

  )
}