import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import RootRef from "@material-ui/core/RootRef";
import { Button, Grid, makeStyles, Paper } from "@material-ui/core";
import theme from "../theme";
import { useEffect } from "react";

const useStyles = makeStyles({
  dropzone: {
    minHeight: "96px",
    borderRadius: 2,
    border: "3px solid #eaeaea",
    borderStyle: "dashed",
    padding: "8px",
    textAlign: "center",
    color: theme.palette.text.secondary,
    backgroundColor: "#fafafa",
  },
});

function ImageDropZone({ setRoutineImage }): JSX.Element {
  const classes = useStyles();
  const [files, setFiles] = useState([]);

  useEffect(() => {
    // set the upstream routine image state when this one's changes.
    setRoutineImage(files[0]);
  }, [files]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });
  const { ref, ...rootProps } = getRootProps();

  if (files.length === 0) {
    return (
      <RootRef rootRef={ref}>
        <Paper className={classes.dropzone} {...rootProps}>
          {/* If there is no image yet, show the option to drag one in */}
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the image here 💪</p>
          ) : (
            <p>Upload an Image here for your new Routine 🏋️</p>
          )}
        </Paper>
      </RootRef>
    );
  } else {
    return (
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        spacing={1}
      >
        <Grid item>
          <img
            style={{ height: "128px", width: "100%", objectFit: "contain" }}
            src={`${files[0].preview}`}
          />
        </Grid>
        <Grid item>
          <Button variant="text" color="secondary" onClick={() => setFiles([])}>
            Change Image
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default ImageDropZone;
