import React, { useEffect } from "react";
import { useState } from "react";
import styles from "../CustomCart/CustomCart.module.css";
import Chip from "@mui/material/Chip";
import { Button } from "@mui/material";
import { useSnackbar } from "notistack";

const CustomCart = ({ selectedItems, setSelectedItems }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [packQuantity, setPackQuantity] = useState(1);

  const removeItem = (item) => {
    const updatedItems = selectedItems.filter((i) => i.id !== item.id);
    setSelectedItems(updatedItems);
  };

  const updateTotalPrice = (selectedItems) => {
    let newTotalPrice = 0;
    selectedItems.forEach((chocolate) => {
      newTotalPrice += chocolate.price;
    });
    setTotalPrice(newTotalPrice);
  };

  const increment = () => {
    setPackQuantity(packQuantity + 1);
  };

  const decrement = () => {
    setPackQuantity(packQuantity - 1);
  };

  const scrollPosition = window.scrollY;

  const { enqueueSnackbar } = useSnackbar();
  const checkout = () => {
    enqueueSnackbar("You Order is placed successfully", {
      variant: "success",
    });
    setTimeout(function () {
      window.location.reload();
      window.scrollTo(0, scrollPosition);
    }, 2000);
  };

  useEffect(() => {
    updateTotalPrice(selectedItems);
  }, [selectedItems]);

  return (
    <div className={styles.cartWrapper}>
      <h2 >Custom Chocolate Pack</h2>
     <hr style={{opacity:"0.3"}}/>
      <h2 className={styles.cartItems}>Selected Items:</h2>
      <hr style={{opacity:"0.3"}}/>
      <ul className={styles.ul}>
        {selectedItems.map((item) => (
          <li className={styles.cartItemLi} key={item.id}>
            <Chip
              color="primary"
              label={item.name}
              onDelete={() => removeItem(item)}
            />
          </li>
        ))}
      </ul>
      {selectedItems.length>0 ?<hr style={{opacity:"0.3"}}/> : <></> }
      
      <div className={styles.totalPrice}>
        <h2>Total Price: ${totalPrice}</h2>
      </div>
      <hr style={{opacity:"0.3"}}/>
      <div className={styles.packQuantity}>
        {selectedItems.length === 8 ? (
          <>
            <div className={styles.packs}>
              {packQuantity === 0 ? (
                <></>
              ) : (
                <Button variant="contained" onClick={decrement}>
                  -
                </Button>
              )}

              <h2> {packQuantity}</h2>

              <Button variant="contained" onClick={increment}>
                +
              </Button>
            </div>
            <div className={styles.packPrice}>
              {packQuantity > 0 ? (
                <h2>
                  Price of {packQuantity} Packs : ${packQuantity * totalPrice}
                </h2>
              ) : (
                <></>
              )}
            </div>
            <hr style={{opacity:"0.3"}}/>
          </>
        ) : (
          <div></div>
        )}
      </div>
      {selectedItems.length === 8 && packQuantity > 0 ? (<> 
        <Button variant="contained"  onClick={checkout}>
          
          Checkout
        </Button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CustomCart;
