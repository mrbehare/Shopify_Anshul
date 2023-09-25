import React, { useEffect } from "react";
import { useState } from "react";
import styles from "../CustomCart/CustomCart.module.css";
import Chip from "@mui/material/Chip";
import { Button } from "@mui/material";
import { useSnackbar } from "notistack";

const CustomCart = ({ selectedItems, setSelectedItems }) => {

  //to keep price updated automatically//
  const [totalPrice, setTotalPrice] = useState(0);

  //to increase pack quantity and according to that change the total price//
  const [packQuantity, setPackQuantity] = useState(1);


  //remove chocolate from filtered data i.e. selectedItems//
  const removeItem = (item) => {
    const updatedItems = selectedItems.filter((i) => i.id !== item.id);
    setSelectedItems(updatedItems);
  };

  //Function to update total price based on selectedItems//
  const updateTotalPrice = (selectedItems) => {
    let newTotalPrice = 0;
    selectedItems.forEach((chocolate) => {
      newTotalPrice += chocolate.price;
    });
    setTotalPrice(newTotalPrice);
  };


  //function to increase pack quantity//
  const increment = () => {
    setPackQuantity(packQuantity + 1);
  };

   //function to increase pack quantity//
  const decrement = () => {
    setPackQuantity(packQuantity - 1);
  };

  //to get the current scroll opsition//
  const scrollPosition = window.scrollY;

  //to show checkout success message and reload the entire page after 2000ms//
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

 //whenever selectedItems got change or updated the total price should be updated //
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

        {/* mapping the filtered data so that we can saw it in cart */}
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
      
      {/* to show total price */}

      <div className={styles.totalPrice}>
        <h2>Total Price: ${totalPrice}</h2>
      </div>
      <hr style={{opacity:"0.3"}}/>

      {/* it will appear only when we will select 8 chocolates and then we can increase the pack quantity */}
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

            {/* it will showcase the final price of no of packs */}

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
      {/* we can only see checkout button if 8n chocolates are there in cart or pack quantity is more that 0 */}

      {selectedItems.length === 8 && packQuantity > 0 ? (<> 
        <Button variant="contained"  onClick={checkout} className={styles.checkout}>
          
          Checkout
        </Button>
        </>
      ) : ( 
        <> </>
      )}
    </div>
  );
};

export default CustomCart;
