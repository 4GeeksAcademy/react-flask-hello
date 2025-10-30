import React from "react";
import "./Features1.css";

export const Features1 = () => {
  return (
    <section className="features1">
      <div className="features1-container">
        <div className="features1-images">
          <img src="https://cdn-icons-png.flaticon.com/512/3594/3594363.png" alt="Shopping icon 1" />
          <img src="https://cdn-icons-png.flaticon.com/512/8118/8118910.png" alt="Shopping icon 2" />
          <img src="https://images.emojiterra.com/google/noto-emoji/unicode-16.0/color/1024px/1f6cd.png" alt="Shopping icon 3" />
          <img src="https://img.freepik.com/vector-premium/muestra-abierta-plantilla-icono-tienda_917138-797.jpg?semt=ais_hybrid&w=740&q=80" alt="Shopping list concept" />
        </div>

        <div className="features1-content">
          <h2>Your Complete Shopping Experience</h2>
          <p>
            From browsing to checkout, we’ve streamlined every step of your shopping journey to make it effortless and enjoyable.
          </p>

          <ul>
            <li>
              <span className="number">1</span>
              <div>
                <h4>Browse Products</h4>
                <p>Explore our curated collection and find exactly what you need.</p>
              </div>
            </li>

            <li>
              <span className="number">2</span>
              <div>
                <h4>Add to Cart</h4>
                <p>Easily manage your selections with our smart shopping cart.</p>
              </div>
            </li>

            <li>
              <span className="number">3</span>
              <div>
                <h4>Secure Checkout</h4>
                <p>Complete your purchase with confidence using our secure system.</p>
              </div>
            </li>
          </ul>

          <button className="features1-button">Start Shopping Now</button>
        </div>
      </div>
    </section>
  );
};
