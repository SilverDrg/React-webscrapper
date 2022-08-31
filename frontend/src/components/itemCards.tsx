import { Box, Container, Grid, Pagination } from '@mui/material'
import { LoadingButton } from '@mui/lab';
import { useState, useEffect } from 'react'
import Axios from 'axios'
import ItemCard from './itemCard'
import { ItemProps } from '../models/item.model'
 
const Comments = () => {
    const [items, setItems] = useState<Array<ItemProps[]>>();
    const [displayItems, setDisplayItems] = useState<ItemProps[]>();
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getContent();
    }, []);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        if (items) {
            setDisplayItems(items[value]);   
        }
    };

    const getContent = () => {
        Axios.get('http://localhost:8081/api/').then((response) => {
            console.log(response.data);
            let responseArray = response.data;
            let itemsArray: Array<ItemProps[]> = [];
            while(responseArray.length) {
                itemsArray.push(responseArray.splice(0, 20))
            }

            setItems(itemsArray);
            setDisplayItems(itemsArray[0]);
        })
    }

    const refreshContent = () => {
        setLoading(true);
        Axios.get('http://localhost:8081/api/refresh').then((response) => {
            window.location.reload();
            setLoading(false);
        })
    }

    return (
      <Container component="main" maxWidth="xl" sx={{ pl: 1, pr: 1, my: 2 }}>
        <Box 
            display="flex"
            justifyContent="flex-start"
        >
            <LoadingButton  onClick={refreshContent} loading={loading} variant="contained" sx={{ my: 2 }}>Refresh</LoadingButton>
        </Box>
        <Grid container spacing={1} justifyContent="space-between" alignItems="stretch" direction="row">
            {displayItems?.map((item: ItemProps) => (<ItemCard key={item.id} {...item}/>))}
        </Grid>
        <Box 
            display="flex"
        >
            <Pagination count={items?.length} page={page} onChange={handleChange} variant="outlined" size="large" sx={{ m: "auto" }} />
        </Box>
      </Container>
    )
  }
  
  export default Comments