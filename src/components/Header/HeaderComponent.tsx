import { makeStyles } from "@material-ui/core";
import Logo from "../../assets/app-logo.svg";

const useStyles = makeStyles(() => ({
  header: {
    display: "flex",
    height: "5vh",
    alignItems: "center",
  },
  label: {
    color: "#7a8488",
    font: "Roboto",
    fontSize: "20px",
    verticalAlign: "middle",
  },
  logo: {
    marginRight: "20px",
  },
}));

export function Header(): JSX.Element {
  const classes = useStyles();

  return (
    <div className={classes.header}>
      <img src={Logo} className={classes.logo} alt="logo" />
      <div className={classes.label}>Monte Carlo How-To</div>
    </div>
  );
}
