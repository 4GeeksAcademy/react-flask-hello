import React from "react";

export const ButtonView = () => {
    return (
        <div className="container w-50">
            <h1 className="mt-5">Buttons</h1>
            <p className="fs-5 mt-2 mb-3">The <span style={{"color":"#FD5812"}}>c-btn component</span> replaces the standard html button with a material design theme and a multitude of options. Any color helper class can be used to alter the background or text color.</p>
            <div className="container border border-secondary-subtle px-4 py-4 rounded shadow p-3 mb-5 bg-body-tertiary rounded">
                <button type="button" class="c-btn c-btn-dark">Dark</button>
                <button type="button" class="c-btn c-btn-slate">Slate</button>
                <button type="button" class="c-btn c-btn-gloomy">Gloomy</button>
                <button type="button" class="c-btn c-btn-silver">Silver</button>
                <button type="button" class="c-btn c-btn-risk">Risk</button>
                <button type="button" class="c-btn c-btn-caution">Caution</button>
                <button type="button" class="c-btn c-btn-gold">Gold</button>
                <button type="button" class="c-btn c-btn-lime">Lime</button>
                <button type="button" class="c-btn c-btn-mint">Mint</button>
                <button type="button" class="c-btn c-btn-win">Win</button>
                <button type="button" class="c-btn c-btn-azure">Azure</button>
                <button type="button" class="c-btn c-btn-aqua">Aqua</button>
                <button type="button" class="c-btn c-btn-lavender">Lavender</button>
                <button type="button" class="c-btn c-btn-purple">Purple</button>
                <button type="button" class="c-btn c-btn-lollypop">Lollypop</button>
                <button type="button" class="c-btn c-btn-fog">Fog</button>
                <button type="button" class="c-btn c-btn-componentify">Componentify</button>
                <button type="button" class="c-btn c-btn-mocca">Mocca</button>
            </div>
            <h4 className="mt-3 mb-3">Hovered Buttons</h4>
            <p className="fs-5 mt-2 mb-3">Hover over the buttons below to see the <span style={{"color":"#FD5812"}}>colors</span> change.</p>
            <div className="container border border-secondary-subtle px-4 py-4 rounded shadow p-3 mb-5 bg-body-tertiary rounded">
                <button type="button" class="c-btn c-btn-dark c-btn-dark-hover">Dark</button>
                <button type="button" class="c-btn c-btn-slate c-btn-slate-hover">Slate</button>
                <button type="button" class="c-btn c-btn-gloomy c-btn-gloomy-hover">Gloomy</button>
                <button type="button" class="c-btn c-btn-silver c-btn-silver-hover">Silver</button>
                <button type="button" class="c-btn c-btn-risk c-btn-risk-hover">Risk</button>
                <button type="button" class="c-btn c-btn-caution c-btn-caution-hover">Caution</button>
                <button type="button" class="c-btn c-btn-gold c-btn-gold-hover">Gold</button>
                <button type="button" class="c-btn c-btn-lime c-btn-lime-hover">Lime</button>
                <button type="button" class="c-btn c-btn-mint c-btn-mint-hover">Mint</button>
                <button type="button" class="c-btn c-btn-win c-btn-win-hover">Win</button>
                <button type="button" class="c-btn c-btn-azure c-btn-azure-hover">Azure</button>
                <button type="button" class="c-btn c-btn-aqua c-btn-aqua-hover">Aqua</button>
                <button type="button" class="c-btn c-btn-lavender c-btn-lavender-hover">Lavender</button>
                <button type="button" class="c-btn c-btn-purple c-btn-purple-hover">Purple</button>
                <button type="button" class="c-btn c-btn-lollypop c-btn-lollypop-hover">Lollypop</button>
                <button type="button" class="c-btn c-btn-fog c-btn-fog-hover">Fog</button>
                <button type="button" class="c-btn c-btn-componentify c-btn-componentify-hover">Componentify</button>
                <button type="button" class="c-btn c-btn-mocca c-btn-mocca-hover">Mocca</button>
            </div>
        </div>
    )
}