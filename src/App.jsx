import React, { useState } from "react";
import { MainContent } from "./components/MainContent";
import { SideBar } from "./components/SideBar";
import { WeatherDataProvider } from "./WeatherContext";

export default function App() {
  return (
    <WeatherDataProvider>
      <div className="bg-[#100E1D] flex flex-col lg:flex-row">
        <SideBar />
        <MainContent />
      </div>
    </WeatherDataProvider>
  );
}
