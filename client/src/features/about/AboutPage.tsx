import {
  Alert,
  AlertTitle,
  Button,
  ButtonGroup,
  Container,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import {
  useLazyGet400ErrorQuery,
  useLazyGet401ErrorQuery,
  useLazyGet404ErrorQuery,
  useLazyGet500ErrorQuery,
  useLazyGetValidationErrorQuery,
} from "./errorApi";
import { useState } from "react";

export default function AboutPage() {
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const [trigger400Error] = useLazyGet400ErrorQuery();
  const [trigger401Error] = useLazyGet401ErrorQuery();
  const [trigger404Error] = useLazyGet404ErrorQuery();
  const [trigger500Error] = useLazyGet500ErrorQuery();
  const [triggerValidationError] = useLazyGetValidationErrorQuery();

  const getValidationError = async () => {
    try {
      await triggerValidationError().unwrap();
    } catch (err: unknown) {
      if (
        err &&
        typeof err === "object" &&
        "message" in err &&
        typeof (err as { message: unknown }).message === "string"
      ) {
        const errorArray = (err as { message: string }).message.split(", ");
        setValidationErrors(errorArray);
      }
    }
  };
  return (
    <Container maxWidth="lg">
      <Typography variant="h3" gutterBottom>
        Error for testing
      </Typography>
      <ButtonGroup>
        <Button
          onClick={() => trigger400Error().catch((err) => console.log(err))}
          variant="contained"
          color="primary"
        >
          Test 400 Error
        </Button>
        <Button
          onClick={() => trigger401Error().catch((err) => console.log(err))}
          variant="contained"
          color="primary"
        >
          Test 401 Error
        </Button>
        <Button
          onClick={() => trigger404Error().catch((err) => console.log(err))}
          variant="contained"
          color="primary"
        >
          Test 404 Error
        </Button>
        <Button
          onClick={() => trigger500Error().catch((err) => console.log(err))}
          variant="contained"
          color="primary"
        >
          Test 500 Error
        </Button>
        <Button
          onClick={getValidationError}
          variant="contained"
          color="primary"
        >
          Test Validation Error
        </Button>
      </ButtonGroup>
      {validationErrors.length > 0 && (
        <Alert severity="error">
          <AlertTitle>Validation Error</AlertTitle>
          <List>
            {validationErrors.map((err) => (
              <ListItem key={err}>{err}</ListItem>
            ))}
          </List>
        </Alert>
      )}
    </Container>
  );
}
