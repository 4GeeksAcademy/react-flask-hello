import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { SparklineChart } from "../pages/sparklineChart";
import { TradeModal } from "./tradeModal";
import { LineChart, Line, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

export const Wallet = () => {
    const { store, actions } = useContext(Context);
    const [wallet, setWallet] = useState([]); // State to store wallet coins
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCoin, setSelectedCoin] = useState(null);

    useEffect(() => {
        // Fetch wallet data from localStorage
        const walletData = JSON.parse(localStorage.getItem('wallet')) || [];
        setWallet(walletData); // Update local state with wallet data
    }, []);

    const handleOpenModal = (coin) => {
        setSelectedCoin(coin);
        setIsModalOpen(true);
    };

    const handleTrade = (type, quantity) => {
        console.log(`${type.toUpperCase()} ${quantity} of ${selectedCoin.name}`);
        actions.tradeCoin(selectedCoin.id, type, quantity);
        setIsModalOpen(false);
    };

    if (!Array.isArray(wallet) || wallet.length === 0) {
        return <p>Loading wallet data...</p>;
    }

    return (
        <div className="wallet-page">
            <h2>Your Wallet</h2>
            <table className="wallet-table" style={{ width: "90vw" }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Current Price</th>
                        <th>Quantity Owned</th>
                        <th>Total Spent</th>
                        <th>Graph (7d)</th>
                        <th>Quick Actions</th>
                        <th>Market Details</th>
                    </tr>
                </thead>
                <tbody>
                    {wallet.map((walletCoin) => (
                        <tr key={walletCoin.id}>
                            <td>
                                <div className="wallet-info">
                                    <h5 className="wallet-name">{walletCoin.name}</h5>
                                    <div className="wallet-symbol">{walletCoin.symbol.toUpperCase()}</div>
                                    <img
                                        src={walletCoin.image}
                                        alt={walletCoin.name}
                                        className="wallet-image"
                                    />
                                </div>
                            </td>
                            <td>${walletCoin.current_price.toLocaleString()}</td>
                            <td>{walletCoin.quantity_owned || 0}</td>
                            <td>${(walletCoin.quantity_owned * walletCoin.purchase_price || 0).toLocaleString()}</td>
                            <td>
                                <SparklineChart
                                    data={walletCoin.sparkline_in_7d?.price || []}
                                    width={150}
                                    height={50}
                                />
                            </td>
                            <td>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => handleOpenModal(walletCoin)}
                                >
                                    Trade
                                </button>
                            </td>
                            <td>
                                <Link to={`/coin/${walletCoin.id}`} className="btn btn-secondary">
                                    More Information
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isModalOpen && selectedCoin && (
                <TradeModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onTrade={handleTrade}
                    coinName={selectedCoin.name}
                />
            )}
        </div>
    );
};
