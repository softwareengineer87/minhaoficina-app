'use client';

import { useState } from "react";
import Launch from "../models/Launch";
import Part from "../models/Part";

function useLaunch() {
    const dataStorage = JSON.parse(localStorage.getItem('launchs') || '[]');
    // const partsStorage = JSON.parse(localStorage.getItem('parts') || '[]');
    
    const [launch, setLaunch] = useState<Launch[]>(dataStorage);
    const [partsList, setPartsList] = useState<Part[]>([]);

    return {
        launch,
        setLaunch,
        partsList,
        setPartsList
    }
}

export default useLaunch;
