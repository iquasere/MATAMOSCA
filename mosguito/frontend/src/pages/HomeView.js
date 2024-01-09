import { useEffect, useState } from "react";
import Constants from "../Constants";
import axios from "axios";
import React from "react";
import HomeLevels from "../components/home/HomeLevels";
import HomeHow from "../components/home/HomeHow";

function HomeView() {
    
    return (
        <>
        <HomeLevels />
        <HomeHow />
        </>
  );
}
    

export default HomeView;