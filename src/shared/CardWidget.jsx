import { Card, CardContent, CardActions, Button } from "@mui/material";

const CardWidget = ({
  height,
  title,
  children,
  onNext,
  onPrevious,
  showPrevious = false,
  showNext = true,
  isLastStep,
  nextDisabled,
}) => (
  <Card sx={{ padding: 2 }}>
    <CardContent sx={{ height: height }}>{children}</CardContent>
    <CardActions
      sx={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {showPrevious ? (
        <Button variant="contained" onClick={onPrevious}>
          Previous
        </Button>
      ) : (
        <span />
      )}
      {showNext && (
        <Button variant="contained" onClick={onNext} disabled={nextDisabled}>
          Save & Next
        </Button>
      )}
      {isLastStep && (
        <Button type="submit" variant="contained">
          Submit Application
        </Button>
      )}
    </CardActions>
  </Card>
);

export default CardWidget;
