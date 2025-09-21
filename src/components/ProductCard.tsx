import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import type { ProductType } from '../types/Type'

interface ProductCardProps{
    product:ProductType
}

export default function ProductCard({product}:ProductCardProps) { // props : :ProductCardProps diyip destructing kısmında props.product diyebiliriz.

    const {id,title,price,description,category,image,rating} = product;

  return (
     <Card sx={{ cursor:'pointer' ,boxShadow:"1px 2px 3px lightgrey" , width:"330px",height:"550px",display:"flex",flexDirection:"column",alignItems:"center",
        justifyContent:"center",margin:"40px 10px"
       }}>
      <img  src={image} style={{width:"230px",height:"230px"}} />
      <CardContent sx={{height:"150px"}}>
        <Typography gutterBottom variant="h5" component="div">
         {title.substring(0,20)}...
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {description.substring(0,150)}...
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant='outlined'>Detay</Button>
      
      </CardActions>
    </Card>
  )
}
