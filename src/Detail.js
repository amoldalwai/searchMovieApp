import React, { useState } from "react";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

import Chip from "@material-ui/core/Chip";

const Detail = (props) => {
  const [open, setOpen] = React.useState(true);
  const [poster, setposter] = useState();
  const [year, setyear] = useState();
  const [genre, setgenre] = useState();
  const [plot, setplot] = useState();
  const [title, settitle] = useState();
  const [imdbrate, setimdbrate] = useState();
 

  axios
    .get(`https://www.omdbapi.com/?apikey=4eb65943&i=${props.imval}`)
    .then((res) => {
      setposter(res.data.Poster);
      setyear("(" + res.data.Year + ")");
      setgenre(res.data.Genre);
      setplot(res.data.Plot);
      settitle(res.data.Title);
      setimdbrate("Imdb: " + res.data.imdbRating);
      
    });

  const handleClose = () => {
    setOpen(false);
    props.funsetdetailbool();
  };

  return (
    <>
      <Dialog
        fullWidth="true"
        maxWidth="sm"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="moviePosterDialog"
      >
        <img
          src={poster}
          maxWidth="sm"
          className="moviePosterDetail"
          alt="Poster"
        />
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <span style={{ fontSize: "12px" }}>
              {genre} <b>{year}</b>
            </span>
           
            <Chip label={imdbrate} color="primary" style={{ float: "right" }} />
            <hr />
            <span>{plot}</span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default Detail;
