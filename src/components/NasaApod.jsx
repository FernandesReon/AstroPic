import { useState, useEffect } from "react";
import "../css/global.css";
import "../css/NasaApod.css";

export default function NasaApod() {
    const [apodData, setApodData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const NASA_API = import.meta.env.VITE_NASA_API_KEY;

    useEffect(() => {
        const fetchApod = async () => {

            const today = new Date().toISOString().split("T")[0];

            const cachedData = localStorage.getItem("apodData");
            if (cachedData) {
                const parsedData = JSON.parse(cachedData);
                if (parsedData.date === today) {
                    setApodData(parsedData);
                    setLoading(false);
                    console.log("Fetched APOD data from localStorage");
                    return;
                }
            }

            try {
                const response = await fetch(
                    `https://api.nasa.gov/planetary/apod?api_key=${NASA_API}`
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch APOD data");
                }
                const data = await response.json();

                if (data.media_type !== "image") {
                    throw new Error("Today's APOD is not an image");
                }

                localStorage.setItem("apodData", JSON.stringify(data));
                setApodData(data);
                setLoading(false);
                console.log("Fetched APOD data from NASA API");
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchApod();
    }, [NASA_API]);

    if (loading) {
        return (
            <div className="container loading">
                Loading today&apos;s astronomy picture...
            </div>
        );
    }

    if (error) {
        return <div className="container error">Error: {error}</div>;
    }

    return (
        <div className="container">
            <div className="apod-outer-container">
                <h2 className="project-title">
                    APOD (<span>AstroPic</span>)
                </h2>
                <p>Here is the Astronomy Picture of the Day (APOD) from NASA.</p>
            </div>

            <div className="apod-container">
                <div className="apod-image-container">
                    <img
                        src={apodData.url}
                        alt={apodData.title}
                        className="apod-image"
                    />
                </div>
                <div className="apod-info-container">
                    <h3 className="apod-title">{apodData.title}</h3>
                    <span className="apod-date">{apodData.date}</span>
                    <p className="apod-description">{apodData.explanation}</p>
                    {apodData.copyright && (
                        <p className="apod-copyright">
                            Credit: {apodData.copyright}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}