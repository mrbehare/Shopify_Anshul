import React from "react";
import styles from "../Chocolates/Chocolates.module.css";
import data from "../../ChocolateData/ChocolateData.json";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useSnackbar } from "notistack";

const Chocolates = ({ selectedItems, setSelectedItems }) => {
  
  //using useSnackbar to show the warning and success messages

  const { enqueueSnackbar } = useSnackbar();

  const selectChocolate = (chocolate) => {
    if (selectedItems.length > 7) {
      enqueueSnackbar("You can select only 8 Chocolates per Pack", {
        variant: "warning",
      });
    } else {
      setSelectedItems((prevState) => {
        return [...prevState, chocolate];
      });
    }
  };

  //function  to remove the chocolate from selectedItems 
  const removeChocolate = (selectedItem) => {
    let filterData = selectedItems.filter(
      (item) => item.id !== selectedItem.id
    );
    setSelectedItems(filterData);
  };



  const img =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTlCnozm26NmMV1wCJJdWJ65IXif7pYzL5fQ&usqp=CAU";

  return (
    <div className={styles.wrapper}>
      <h2 >Please Select the Chocolates</h2>
      <div className={styles.cardWrapper}>
        <Grid container spacing={2}>

        {/* maping the data into card */}

          {data.map((ele) => {
            return (
              <Grid item md={4}>
                <Card sx={{ maxWidth: 250 }} key={ele.id}>
                  <CardMedia
                    component="img"
                    alt="green iguana"
                    height="90%"
                    image={img}
                  />
                  <CardContent className={styles.CardContent}>
                    <Typography gutterBottom variant="h5" className={styles.Typography} >
                      {ele.name}
                    </Typography>
                    <Typography variant="h5" className={styles.Typography} >
                      ${ele.price} 
                    </Typography>
                  </CardContent>
                  <CardActions>

                  
                    {!selectedItems.includes(ele) ? (
                      <Button
                        variant="contained"
                        onClick={() => selectChocolate(ele)}
                      >
                        Add
                      </Button>
                    ) :  
                     
                    //  this button will only appears when we add the chocolate to selectedItems//
                      (
                       <Button
                        variant="contained"
                        onClick={() => removeChocolate(ele)}
                      >
                        Remove
                      </Button>
                    )}
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </div>
          
    </div>
  );
};

export default Chocolates;
