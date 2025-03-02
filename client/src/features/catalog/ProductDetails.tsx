import { useParams } from "react-router-dom";
import {
  Button,
  Divider,
  Grid2,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useFetchProductsDetailsQuery } from "./catalogApi";

export default function ProductDetails() {
  const { id } = useParams();

  const { data, isLoading } = useFetchProductsDetailsQuery(id ? +id : 0);

  if (isLoading || !data) return <div>Loading...</div>;

  const productDetails = [
    { label: "Name", value: data?.name },
    { label: "Description", value: data?.description },
    { label: "Type", value: data?.type },
    { label: "Brand", value: data?.brand },
    { label: "Quantity in stock", value: data?.quantityInStock },
  ];

  return (
    <Grid2 container spacing={6} maxWidth={"lg"} sx={{ mx: "auto" }}>
      <Grid2 size={6}>
        <img
          src={data?.pictureUrl}
          alt={data?.name}
          style={{ width: "100%" }}
        />
      </Grid2>
      <Grid2 size={6}>
        <Typography variant="h3">{data?.name}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h4" color="secondary">
          ${(data?.price / 100).toFixed(2)}
        </Typography>
        <TableContainer>
          <Table
            sx={{
              "& td": { fontSize: "1.1rem" },
            }}
          >
            <TableBody>
              {productDetails.map((detail, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    {detail.label}
                  </TableCell>
                  <TableCell>{detail.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid2 container spacing={2} marginTop={3}>
          <Grid2 size={6}>
            <TextField
              variant="outlined"
              type="number"
              label="Quantity in basket"
              fullWidth
              defaultValue={1}
            />
          </Grid2>
          <Grid2 size={6}>
            <Button
              sx={{ height: "55px" }}
              variant="contained"
              color="primary"
              size="large"
              fullWidth
            >
              Add to basket
            </Button>
          </Grid2>
        </Grid2>
      </Grid2>
    </Grid2>
  );
}
