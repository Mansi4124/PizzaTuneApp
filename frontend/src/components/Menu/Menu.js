import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import Cart from "../Cart/Cart";
import cartGIF from "../../assets/icons8-cart.gif";
import vegIcon from "../../assets/veg_icon.svg";
import "./Menu.css";

const Menu = () => {
  // Refs for menu sections
  const pizzaRef = useRef(null);
  const garlicBreadRef = useRef(null);
  const packOf4Ref = useRef(null);
  const bevaragesRef = useRef(null);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [menuData, setMenuData] = useState({
    pizza: [],
    garlicBread: [],
    packOf4: [],
    bevarages: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get("http://localhost:8000/menu/");
        console.log(response.data);

        const items = response.data.items;

        const categorizedData = items.reduce((acc, item) => {
          const category = item.category.toLowerCase().replace(/\s+/g, "");
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(item);
          return acc;
        }, {});

        setMenuData({
          pizza: categorizedData.pizza || [],
          garlicBread: categorizedData.garlicbread || [],
          packOf4: categorizedData.packof4 || [],
          bevarages: categorizedData.bevarages || [],
        });
      } catch (err) {
        setError("Error fetching menu items");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  const addItemToCart = (item, category) => {
    const updatedMenu = menuData[category].map((menuItem) => {
      if (menuItem._id === item._id) {
        menuItem.qty = (menuItem.qty || 0) + 1;
      }
      return menuItem;
    });
    setMenuData({ ...menuData, [category]: updatedMenu });

    const cartItemIndex = cart.findIndex(
      (cartItem) => cartItem._id === item._id
    );
    if (cartItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[cartItemIndex].qty += 1;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  const removeItemFromCart = (item, category) => {
    const updatedMenu = menuData[category].map((menuItem) => {
      if (menuItem._id === item._id) {
        menuItem.qty = (menuItem.qty || 0) - 1;
      }
      return menuItem;
    });
    setMenuData({ ...menuData, [category]: updatedMenu });

    const cartItemIndex = cart.findIndex(
      (cartItem) => cartItem._id === item._id
    );
    if (cartItemIndex !== -1) {
      const updatedCart = [...cart];
      if (updatedCart[cartItemIndex].qty > 1) {
        updatedCart[cartItemIndex].qty -= 1;
      } else {
        updatedCart.splice(cartItemIndex, 1);
      }
      setCart(updatedCart);
    }
  };

  const updateCartItem = (item, quantity) => {
    setCart(
      cart.map((cartItem) =>
        cartItem._id === item._id ? { ...cartItem, qty: quantity } : cartItem
      )
    );
  };

  const removeItemFromCartCompletely = (item) => {
    setCart(cart.filter((cartItem) => cartItem._id !== item._id));
    const category = item.category.toLowerCase().replace(/\s+/g, "");
    const updatedMenu = menuData[category].map((menuItem) => {
      if (menuItem._id === item._id) {
        menuItem.qty = 0;
      }
      return menuItem;
    });
    setMenuData({ ...menuData, [category]: updatedMenu });
  };

  const updateMenuItemQuantity = (itemId, newQty) => {
    // Iterate over each category in menuData
    const updatedMenuData = Object.keys(menuData).reduce((acc, category) => {
      acc[category] = menuData[category].map((item) => {
        if (item._id === itemId) {
          return { ...item, qty: newQty };
        }
        return item;
      });
      return acc;
    }, {});
  
    setMenuData(updatedMenuData);
  };
  


  return (
    <>
      {isCartOpen && (
        <div className="cart-container">
          <Cart
            cartProps={cart}
            setIsCartOpen={setIsCartOpen}
            updateCartItem={updateCartItem}
            removeItemFromCartCompletely={removeItemFromCartCompletely}
            updateMenuItemQuantity={updateMenuItemQuantity} // Pass the function here
          />
        </div>
      )}
      {!isCartOpen && (
        <>
          <Navbar />
          <div className="Menu">
            <div className="Menu-Dist">
              <div className="d-flex flex-column">
                <div className="flex-title">Categories</div>
                <div
                  className="menu-dist-title"
                  onClick={() => scrollToSection(pizzaRef)}
                >
                  Pizza
                </div>
                <div
                  className="menu-dist-title"
                  onClick={() => scrollToSection(garlicBreadRef)}
                >
                  Garlic Bread
                </div>
                {/* <div
                  className="menu-dist-title"
                  onClick={() => scrollToSection(packOf4Ref)}
                >
                  Pack of 4
                </div> */}
                <div
                  className="menu-dist-title"
                  onClick={() => scrollToSection(bevaragesRef)}
                >
                  Bevarages
                </div>
              </div>
            </div>
            <div className="Menu-items">
              <div className="Menu-back"></div>
              <div className="expore-menu-container"></div>
              <div className="Menu-title">
                Explore menu
                {cart.length > 0 && (
                  <img
                    src={cartGIF}
                    alt="Cart"
                    className="cart-icon"
                    onClick={() => setIsCartOpen(true)}
                  />
                )}
              </div>
              <div className="pizza" ref={pizzaRef}>
                <div className="submenu-title">PIZZA</div>
                <div className="menu-items-container">
                  {Array.isArray(menuData.pizza) &&
                  menuData.pizza.length > 0 ? (
                    menuData.pizza.map((item) => (
                      <MenuCard
                        key={item._id}
                        item={item}
                        add={() => addItemToCart(item, "pizza")}
                        remove={() => removeItemFromCart(item, "pizza")}
                      />
                    ))
                  ) : (
                    <p>No pizza items available</p>
                  )}
                </div>
              </div>
              <div ref={garlicBreadRef}>
                <div className="submenu-title">GARLIC BREAD</div>
                <div className="menu-items-container">
                  {Array.isArray(menuData.garlicBread) &&
                  menuData.garlicBread.length > 0 ? (
                    menuData.garlicBread.map((item) => (
                      <MenuCard
                        key={item._id}
                        item={item}
                        add={() => addItemToCart(item, "garlicBread")}
                        remove={() => removeItemFromCart(item, "garlicBread")}
                      />
                    ))
                  ) : (
                    <p>No garlic bread items available</p>
                  )}
                </div>
              </div>
              {/* <div ref={packOf4Ref}>
                <div className="submenu-title">PACK OF 4 PIZZA</div>
                <div className="menu-items-container">
                  {Array.isArray(menuData.packOf4) &&
                  menuData.packOf4.length > 0 ? (
                    menuData.packOf4.map((item) => (
                      <MenuCard
                        key={item._id}
                        item={item}
                        add={() => addItemToCart(item, "packOf4")}
                        remove={() => removeItemFromCart(item, "packOf4")}
                      />
                    ))
                  ) : (
                    <p>No pack of 4 items available</p>
                  )}
                </div>
              </div> */}
              <div ref={bevaragesRef}>
                <div className="submenu-title">BEVERAGES</div>
                <div className="menu-items-container">
                  {Array.isArray(menuData.bevarages) &&
                  menuData.bevarages.length > 0 ? (
                    menuData.bevarages.map((item) => (
                      <MenuCard
                        key={item._id}
                        item={item}
                        add={() => addItemToCart(item, "bevarages")}
                        remove={() => removeItemFromCart(item, "bevarages")}
                      />
                    ))
                  ) : (
                    <p>No beverages items available</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

const MenuCard = ({ item, add, remove }) => {
  return (
    <div className="menu-item-card">
      <div className="left-card-item-container">
        <img
          src={item.isVeg ? vegIcon : vegIcon}
          className="veg-icon"
          alt="Icon"
        />
        <h5>{item.name}</h5>
        <div className="menu-description">{item.description}</div>
        <h6>Rs.{item.price}</h6>
      </div>
      <div className="right-card-item-container">
        <div className="img-item-menu-container">
          <img src={item.image_url} alt={item.name} className="img-item-menu" />
        </div>
        {item.qty > 0 ? (
          <div className="selected-qty-container">
            <div className="menu-minus-qty-button" onClick={remove}>
              <i className="fas fa-minus" style={{ marginRight: "10px" }}></i>
            </div>
            <div className="menu-qty">{item.qty}</div>
            <div className="menu-add-qty-button" onClick={add}>
              <i className="fas fa-plus"></i>
            </div>
          </div>
        ) : (
          <div className="menu-add-button" onClick={add}>
            Add+
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
