import { Card, CardMedia, CardContent, Typography } from '@mui/material'
import { ItemProps } from '../models/item.model'

const ItemCard = (props?: ItemProps) => {
  const item = props;
  return (
    <Card sx={{ my: 2, maxWidth: 320, border: 1, borderColor: 'primary.light' }}>
        <CardMedia
            component="img"
            image={item?.image}
            alt="Apartment"
        />
        <CardContent>
            <Typography variant="h6">{item?.title}</Typography>
        </CardContent>
    </Card>
  )
}

export default ItemCard