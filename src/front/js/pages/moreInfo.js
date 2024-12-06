import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { LineChart, Line, YAxis, Tooltip, XAxis, ResponsiveContainer } from 'recharts';
import { TradeModal } from "../component/tradeModal";

export const MoreInfo = (coin) => {
    const { store, actions } = useContext(Context);
    ///const coin = coin
    const [timeFrame, setTimeFrame] = React.useState('left');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCoin, setSelectedCoin] = useState(null);
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleChange = (event, newAlignment) => {
        setTimeFrame(newAlignment);
    };

    // Fetch price data on component mount
    useEffect((coin) => {
        actions.setCurrentCoinId("coin.id");
        actions.setCurrency("USD");
        actions.setTimeFrame("7");
        actions.getPriceData();
    }, []);

    // Fetch news data from The Guardian API
    useEffect(() => {
        const fetchNews = async () => {
            try {
                console.log("Fetching news from The Guardian...");
                const response = await fetch(
                    "https://content.guardianapis.com/search?api-key=611e5bde-dc1e-455b-9137-5f6caf90eda7&q=bitcoin"
                );
                console.log("Response status:", response.status);

                if (response.ok) {
                    const data = await response.json();
                    console.log("Fetched articles:", data.response.results);
                    if (data.response && data.response.results) {
                        setNews(data.response.results); // Populate the news state
                    } else {
                        console.warn("No articles found in the response.");
                    }
                } else {
                    console.error("Error fetching news:", response.statusText);
                }
            } catch (error) {
                console.error("Network or server error:", error);
            } finally {
                setLoading(false); // Stop the loading spinner
            }
        };

        fetchNews();
    }, []);

    useEffect(() => {
        actions.getPriceData();
    }, [store.timeFrame]);

    useEffect(() => {
        actions.getPriceData();
    }, [store.currency]);

    // Function to open the modal
    const handleTrade = () => {
        setIsModalOpen(true);
    };

    return (
        <div className="moreInfo">
            {/* Back to List Button */}
            <div className="backToList">
                <button
                    type="submit"
                    id="submitBtn"
                    style={{
                        backgroundColor: "#39ff14",
                        borderRadius: "5px",
                        height: "50px",
                        width: "90px",
                        border: "1px solid black",
                    }}
                >
                    Back to list
                </button>
            </div>

            {/* Main Info Section */}
            <div className="mainInfo">
                {/* Coin Name */}
                <div className="coinName" style={{ fontSize: "25px", marginLeft: "80px", color: "white" }}>
                    Coin Name
                </div>

                {/* Graph Box */}
                <div className="graphBox">
                    <div className="graphButtonsBox">
                        <div className="timeFrame" role="group" >
                            <button className="graphButtons" onClick={() => actions.setTimeFrame("1")}>1D</button>
                            <button className="graphButtons" onClick={() => actions.setTimeFrame("7")}>7D</button>
                            <button className="graphButtons" onClick={() => actions.setTimeFrame("30")}>30D</button>
                            <button className="graphButtons" onClick={() => actions.setTimeFrame("365")}>1Y</button>
                        </div>
                        {/* <ToggleButtonGroup
                            color="primary"
                            value={timeFrame}
                            exclusive
                            onChange={handleChange}
                            aria-label="text alignment"
                        >
                            <ToggleButton className="graphButtons" value="left" aria-label="left aligned">
                                1D
                            </ToggleButton>
                            <ToggleButton className="graphButtons" value="center" aria-label="centered">
                                7D
                            </ToggleButton>
                            <ToggleButton className="graphButtons" value="right" aria-label="right aligned">
                                30D
                            </ToggleButton>
                            <ToggleButton className="graphButtons" value="year" aria-label="justified">
                                1Y
                            </ToggleButton>
                        </ToggleButtonGroup> */}
                        {/* <div className="timeFrame btn-group" role="group">
                            <input type='radio' id='p1' name='primary' className="graphButtons btn-check" onClick={() => actions.setTimeFrame("1")} />
                            <label className="graphButtons btn" for='p1'>1D</label>
                            <input type='radio' id='p2' name='primary' className="graphButtons btn-check" onClick={() => actions.setTimeFrame("7")} />
                            <label className="graphButtons btn" for='p2'>7D</label>
                            <input type='radio' id='p3' name='primary' className="graphButtons btn-check" onClick={() => actions.setTimeFrame("30")} />
                            <label className="graphButtons btn" for='p3'>30D</label>
                            <input type='radio' id='p4' name='primary' className="graphButtons btn-check" onClick={() => actions.setTimeFrame("365")} />
                            <label className="graphButtons btn" for='p4'>1Y</label>
                        </div> */}
                        <div className="currency" role="group" >
                            <button className="graphButtons2" onClick={() => actions.setCurrency("USD")}>USD</button>
                            <button className="graphButtons2" onClick={() => actions.setCurrency("CAD")}>CAD</button>
                            <button className="graphButtons2" onClick={() => actions.setCurrency("EUR")}>EUR</button>
                            <button className="graphButtons2" onClick={() => actions.setCurrency("GBP")}>GBP</button>
                            <button className="graphButtons2" onClick={() => actions.setCurrency("JPY")}>JPY</button>
                        </div>
                    </div>
                    <div>
                        <div className="bigGraph">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={store.currentCoinPriceData}>
                                    <YAxis type="number" domain={['dataMin', 'dataMax']} width={0} />
                                    <Line type="monotone" dataKey="price" stroke="#39ff14" strokeWidth={2} dot={false} />
                                    <XAxis dataKey="date" tick={null} />
                                    <Tooltip />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        <div style={{ display: "flex", justifyContent: "end" }}>  
                        <button type="submit" id="submitBtn" style={{ backgroundColor: "#39ff14", borderRadius: "5px", height: "38px", width: "90px", border: "1px solid black" }}>Trade</button>   
                        {isModalOpen && selectedCoin && (
                            <TradeModal
                                isOpen={isModalOpen}
                                onClose={() => setIsModalOpen(false)}
                                onTrade={handleTrade}
                                coinName={selectedCoin.name}
                            />
                        )}
                        </div>
                    </div>
                </div>
                {/* News Feed Section */}
                <div className="news">
                    <h1>News feed for this crypto</h1>
                    {loading ? (
                        <p>Loading news...</p>
                    ) : news.length > 0 ? (
                        <ul style={{ listStyle: "none", padding: 0 }}>
                            {news.map((article, index) => (
                                <li key={index} style={{ marginBottom: "20px" }}>
                                    <a
                                        href={article.webUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ color: "#39ff14", textDecoration: "none" }}
                                    >
                                        <h2>{article.webTitle}</h2>
                                    </a>
                                    <p>Published: {new Date(article.webPublicationDate).toLocaleString()}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No news articles found for Bitcoin.</p>
                    )}
                </div>
            </div>
        </div>
    );
};





