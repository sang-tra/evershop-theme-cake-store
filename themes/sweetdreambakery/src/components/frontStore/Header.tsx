import Area from "@components/common/Area.js";
import React from "react";

export function Header() {
  return (
    <header className="header bg-white shadow-sm border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Area id="headerTop" className="header__top" />
        <div className="header__middle grid grid-cols-3 h-16">
          <Area
            id="headerMiddleLeft"
            className="header__middle__left flex justify-start items-center"
          />
          <Area
            id="headerMiddleCenter"
            className="header__middle__center flex justify-center items-center"
          />
          <Area
            id="headerMiddleRight"
            className="header__middle__right flex justify-end items-center gap-3"
          />
        </div>
        <Area id="headerBottom" className="header__bottom" />
      </div>
    </header>
  );
}
