import { HealthCheckRating } from "../types";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";

interface HeartProps {
  healthCheckRating: HealthCheckRating;
}

const heartColor = (heartNumber: string) => {
  switch (heartNumber) {
    case "0":
      return (
        <span style={{ color: "green" }}>
          <FavoriteIcon />
        </span>
      );
    case "1":
      return (
        <span style={{ color: "yellow" }}>
          <FavoriteIcon />
        </span>
      );
    case "2":
      return (
        <span style={{ color: "red" }}>
          <FavoriteIcon />
        </span>
      );
    case "3":
      return (
        <span style={{ color: "red" }}>
          <HeartBrokenIcon />
        </span>
      );

    default:
      return "";
  }
};

const HealthHeart = (props: HeartProps) => {
  return <p>{heartColor(props.healthCheckRating.toString())}</p>;
};

export default HealthHeart;
