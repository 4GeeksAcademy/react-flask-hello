import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { SparklineChart } from "../pages/sparklineChart";
import { LineChart, Line, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

export const Favorites = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="row" id="favoriteScreen">
            {store.favorites.map((favorite, index) => {
                return (
                    <div className="favCardOut card col-4" >  {/* style={{ width: "20vw"}} */}
                        <div className="favCardIn">
                            <div className="favCardTop card-img-top">
                                {/* <SparklineChart data={favorite.sparkline_in_7d.price} width={300} height={150} /> */}
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={favorite.sparkline_in_7d.price.map((price, index) => ({ index, price }))}>
                                        <YAxis type="number" domain={['dataMin', 'dataMax']} width={0} />
                                        <Line type="monotone" dataKey="price" stroke="#39ff14" strokeWidth={2} dot={false} />
                                        <Tooltip />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="favCardBody card-body">
                                <h5 className="card-title">{favorite.name}</h5>
                                <p className="card-text">{favorite.symbol}</p>
                                <p className="card-text"><strong>Current Price:</strong> ${favorite.current_price}</p>
                                <Link to={"/moreInfo" }>
								<span className="favMoreInfoButton btn">More Information</span>
							   </Link>
                            
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}