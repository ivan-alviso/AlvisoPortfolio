import { useEffect, useState } from "react";

export default function BarGraph() {
    const [value, setValue] = useState(0);

    return (
        <div className="hud-bar-wrapper">
            <div className="hud-bar-track">
                <div
                    className="hud-bar-fill"
                    style={{ width: `${value}%` }}
                />
            </div>
        </div>
    );
}