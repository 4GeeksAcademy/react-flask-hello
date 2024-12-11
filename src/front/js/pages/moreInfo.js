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
    const [whitepaper, setWhitepaper] = useState("");
    const [loadingNews, setLoadingNews] = useState(true);
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
                const response = await fetch(
                    `https://content.guardianapis.com/search?api-key=611e5bde-dc1e-455b-9137-5f6caf90eda7&q=${params.id}`
                );
                if (response.ok) {
                    const data = await response.json();
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
                setLoadingNews(false); // Stop the loading spinner
            }
        };
        

        fetchNews();
    }, []);

    // Fetch whitepaper from CoinGecko API
    useEffect(() => {
        const fetchWhitepaper = async () => {
            try {
                const response = await fetch("https://api.coingecko.com/api/v3/coins/bitcoin");
                if (response.ok) {
                    const data = await response.json();
                    if (data.links && data.links.blockchain_site && data.links.blockchain_site.length > 0) {
                        const whitepaperUrl = data.links.blockchain_site.find((url) =>
                            url.toLowerCase().includes("bitcoin.pdf")
                        );
                        setWhitepaper(whitepaperUrl || null); // Set whitepaper URL or null if not found
                    } else {
                        console.warn("Whitepaper URL not found in the response.");
                        setWhitepaper(null); // No whitepaper available
                    }
                } else {
                    console.error("Error fetching whitepaper:", response.statusText);
                    setWhitepaper(null);
                }
            } catch (error) {
                console.error("Network or server error while fetching whitepaper:", error);
                setWhitepaper(null);
            }
        };
        fetchWhitepaper();
    }, []);

   

    // Update price data based on timeframe or currency changes
    useEffect(() => {
        actions.getCurrentCoinPriceData();
    }, [store.currency]);

    useEffect(() => {
        document.getElementById("gb2").style.backgroundColor= "black";
        document.getElementById("gb2").style.color= "#39ff14";
        document.getElementById("gb11").style.backgroundColor= "black";
        document.getElementById("gb11").style.color= "#39ff14";
    }, []);
    
    const handleTrade = () => {
        setIsModalOpen(true);
    };

    const graphOptions = (id) => {
        document.querySelectorAll('.graphButtons').forEach((button) => {
            button.style.backgroundColor = '#39ff14';
            button.style.color = 'black';
        });
        const pressedButton = document.getElementById(id);
        if (pressedButton) {
            pressedButton.style.backgroundColor = "black";
            pressedButton.style.color = "#39ff14";
        }
    };

    const graphOptions2 = (id) => {
        document.querySelectorAll('.graphButtons2').forEach((button) => {
            button.style.backgroundColor = '#39ff14';
            button.style.color = 'black';
        });
        const pressedButton = document.getElementById(id);
        if (pressedButton) {
            pressedButton.style.backgroundColor = "black";
            pressedButton.style.color = "#39ff14";
        }
    };

    return (
        <div className="moreInfo">
            {/* Back to List Button */}
            <div className="backToList">
                <button
                    type="button"
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
                                <button id="gb1" className="graphButtons" onClick={() => {actions.setTimeFrame("1"); graphOptions("gb1")}}>1D</button>
                                <button id="gb2" className="graphButtons" onClick={() => {actions.setTimeFrame("7"); graphOptions("gb2")}}>7D</button>
                                <button id="gb3" className="graphButtons" onClick={() => {actions.setTimeFrame("30"); graphOptions("gb3")}}>30D</button>
                                <button id="gb4" className="graphButtons" onClick={() => {actions.setTimeFrame("365"); graphOptions("gb4")}}>1Y</button>
                            </div>
                            <div className="currency" role="group" >
                                <button id="gb11" className="graphButtons2" onClick={() => {actions.setCurrency("usd"); graphOptions2("gb11")}}>USD</button>
                                <button id="gb12" className="graphButtons2" onClick={() => {actions.setCurrency("cad"); graphOptions2("gb12")}}>CAD</button>
                                <button id="gb13" className="graphButtons2" onClick={() => {actions.setCurrency("eur"); graphOptions2("gb13")}}>EUR</button>
                                <button id="gb14" className="graphButtons2" onClick={() => {actions.setCurrency("gbp"); graphOptions2("gb14")}}>GBP</button>
                                <button id="gb15" className="graphButtons2" onClick={() => {actions.setCurrency("jpy"); graphOptions2("gb15")}}>JPY</button>
                            </div>
                        </div>
                        <div className="bigGraph">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={store.currentCoinPriceData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                                    <YAxis type="number" domain={['dataMin', 'dataMax']} width={0} />
                                    <Line type="monotone" dataKey="price" stroke="#39ff14" strokeWidth={2} dot={false} />
                                    <XAxis dataKey="date" height={0} />
                                    <Tooltip />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>                        
                    </div>
                    <div id="marketData">
                        <h4>Current Price: {store.currency.toUpperCase()} {store.currentCoinData.market_data ? store.currentCoinData.market_data.current_price[store.currency].toLocaleString() : null}</h4>
                        <h4>24H High: {store.currency.toUpperCase()} {store.currentCoinData.market_data ? store.currentCoinData.market_data.high_24h[store.currency].toLocaleString() : null}</h4>
                        <h4>24H Low: {store.currency.toUpperCase()} {store.currentCoinData.market_data ? store.currentCoinData.market_data.low_24h[store.currency].toLocaleString() : null}</h4>
                        <h4 style={{ display: "flex" }}>24H Change: <div style={{
                            marginLeft: '8px',
                            color: store.currentCoinData.market_data?.price_change_percentage_24h < 0 ? 'red' : 'green',
                        }}> {store.currentCoinData.market_data ? store.currentCoinData.market_data.price_change_percentage_24h.toFixed(2) : null}%</div></h4>
                        <h4 style={{ display: "flex" }}>30D Change: <div style={{
                            marginLeft: '8px',
                            color: store.currentCoinData.market_data?.price_change_percentage_30d < 0 ? 'red' : '#39ff14',
                        }}> {store.currentCoinData.market_data ? store.currentCoinData.market_data.price_change_percentage_30d.toFixed(2) : null}%</div></h4>
                        <h4 style={{ display: "flex" }}>1Y Change: <div style={{
                            marginLeft: '8px',
                            color: store.currentCoinData.market_data?.price_change_percentage_1y < 0 ? 'red' : '#39ff14',
                        }}> {store.currentCoinData.market_data ? store.currentCoinData.market_data.price_change_percentage_1y.toFixed(2) : null}%</div></h4>
                        <h4>Market Cap rank: {store.currentCoinData.market_data ? store.currentCoinData.market_data.market_cap_rank : null}</h4>
                        <button type="submit" id="submitBtn" onClick={() => actions.setShowTradeModal(store.currentCoinData)} style={{ backgroundColor: "#39ff14", borderRadius: "5px", height: "38px", width: "90px", border: "1px solid black" }}>Trade</button>
                            
                    </div>
                </div>

                {/* News Feed Section */}
                <div className="news">
                    <h1>News feed for {store.currentCoinData.name}</h1>
                    {loadingNews ? (
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

                {/* Whitepaper Section */}
                <div className="description">
                    <h2>Whitepaper</h2>
                    {whitepaper ? (
                        <a
                            href={whitepaper}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "#39ff14", textDecoration: "none" }}
                        >
                            View the Bitcoin Whitepaper
                        </a>
                    ) : (
                        <p style={{ color: "white" }}>Whitepaper not available.</p>
                    )}
                </div>

            </div>
        </div>
    );
};





