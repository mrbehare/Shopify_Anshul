
import { useState } from 'react';
import './App.css';
import Chocolates from './Components/Chocolates/Chocolates';
import Grid from '@mui/material/Grid';
import CustomCart from './Components/CustomCart/CustomCart';

function App() {

  const [selectedItems,setSelectedItems]=useState([]);

  return (

<div>
<Grid container spacing={2}>
<Grid item xs={8}>
<Chocolates selectedItems={selectedItems} setSelectedItems={setSelectedItems}/>
</Grid>
<Grid item xs={4}>
<CustomCart selectedItems={selectedItems} setSelectedItems={setSelectedItems}/>
</Grid>

</Grid>
</div>
  );
}

export default App;
