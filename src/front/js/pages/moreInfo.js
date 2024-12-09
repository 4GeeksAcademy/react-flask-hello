import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { LineChart, Line, YAxis, Tooltip, XAxis, ResponsiveContainer } from 'recharts';
import { TradeModal } from "../component/tradeModal";
import { useParams } from "react-router-dom";

export const MoreInfo = (coin) => {
    const { store, actions } = useContext(Context);
    ///const coin = coin
    const [timeFrame, setTimeFrame] = React.useState('left');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCoin, setSelectedCoin] = useState(null);
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const params = useParams();

    const handleChange = (event, newAlignment) => {
        setTimeFrame(newAlignment);
    };

    // Fetch price data on component mount
    useEffect((coin) => {
        actions.setCurrentCoinId(params.id);
        actions.setCurrency("usd");
        actions.setTimeFrame("7");
        actions.getCurrentCoinPriceData();
        actions.getCurrentCoinData();
    }, []);

    // Fetch news data from The Guardian API
    useEffect(() => {
        const fetchNews = async () => {
            try {
                console.log("Fetching news from The Guardian...");
                const response = await fetch(
                    `https://content.guardianapis.com/search?api-key=611e5bde-dc1e-455b-9137-5f6caf90eda7&q=${params.id}`
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
        actions.getCurrentCoinPriceData();
    }, [store.timeFrame]);

    useEffect(() => {
        actions.getCurrentCoinPriceData();
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
                    {store.currentCoinData.name}
                </div>

                {/* Graph Box */}
                <div className="topHalf">
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
                                <button className="graphButtons2" onClick={() => actions.setCurrency("usd")}>USD</button>
                                <button className="graphButtons2" onClick={() => actions.setCurrency("cad")}>CAD</button>
                                <button className="graphButtons2" onClick={() => actions.setCurrency("eur")}>EUR</button>
                                <button className="graphButtons2" onClick={() => actions.setCurrency("gbp")}>GBP</button>
                                <button className="graphButtons2" onClick={() => actions.setCurrency("jpy")}>JPY</button>
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
                    <div id="marketData">
                        <h4>Current Price: {store.currency.toUpperCase()} {store.currentCoinData.market_data ? store.currentCoinData.market_data.current_price[store.currency].toLocaleString() : null}</h4>
                        <h4>24H High: {store.currency.toUpperCase()} {store.currentCoinData.market_data ? store.currentCoinData.market_data.high_24h[store.currency].toLocaleString() : null}</h4>
                        <h4>24H Low: {store.currency.toUpperCase()} {store.currentCoinData.market_data ? store.currentCoinData.market_data.low_24h[store.currency].toLocaleString() : null}</h4>
                        <h4 style={{ display: "flex" }}>24H Change: <div style={{ marginLeft: '8px',
                            color: store.currentCoinData.market_data?.price_change_percentage_24h < 0 ? 'red' : 'green',
                        }}> {store.currentCoinData.market_data ? store.currentCoinData.market_data.price_change_percentage_24h.toFixed(2) : null}%</div></h4>
                        <h4 style={{ display: "flex" }}>30D Change: <div style={{ marginLeft: '8px',
                            color: store.currentCoinData.market_data?.price_change_percentage_30d < 0 ? 'red' : '#39ff14',
                        }}> {store.currentCoinData.market_data ? store.currentCoinData.market_data.price_change_percentage_30d.toFixed(2) : null}%</div></h4>
                        <h4 style={{ display: "flex" }}>1Y Change: <div style={{ marginLeft: '8px',
                            color: store.currentCoinData.market_data?.price_change_percentage_1y < 0 ? 'red' : '#39ff14',
                        }}> {store.currentCoinData.market_data ? store.currentCoinData.market_data.price_change_percentage_1y.toFixed(2) : null}%</div></h4>
                        <h4>Market Cap rank: {store.currentCoinData.market_data ? store.currentCoinData.market_data.market_cap_rank : null}</h4>
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





