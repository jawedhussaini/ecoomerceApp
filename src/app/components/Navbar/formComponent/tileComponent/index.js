"use client"

import { useState } from "react";

export default function TileComponent({ data, selected = [], onClick,clicked }) {

  return data && data.length ?  (
    <div className="mt-3 flex flex-wrap items-center gap-1">
      {data.map((element) => {
      
        return(
        <>
        <p hidden></p>
        <label onClick={()=>onClick(element)} className={`cursor-pointer`} key={element.id}>
          <span className={`rounded-lg border border-black px-6 py-2 font-bold ${selected.map((item)=>item.id).indexOf(element.id)!==-1? 'bg-black text-white':'bg-white text-black'}`}>
            {element.label}
          </span>
        </label>
         </>)
})}
     
    </div>
  ) : null;
}
