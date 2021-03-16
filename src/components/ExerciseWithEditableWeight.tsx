// import { Paper, Grid, Typography, TextField } from "@material-ui/core";
// import React from "react";
// import { Exercise } from "../API";

// const ExerciseWithEditableWeight = (
//   ex: Exercise,
//   setWeightMap: React.Dispatch<any>,
//   exKey: number,
//   weightMap: any,
//   paperStyle: any
// ): any => {
//   const handleWeightChange = (name: string, weight: string) => {
//     setWeightMap({ ...weightMap, [name]: weight });
//   };

//   console.log(ex);

//   return (
//     <Paper className={paperStyle}>
//       <Grid container alignItems="center">
//         <Grid item xs={6}>
//           <Typography>
//             <b>Exercise {exKey + 1}</b>
//           </Typography>
//           <Typography>{ex.name}</Typography>
//         </Grid>
//         <Grid item xs={2}>
//           <Typography>
//             <b>Sets</b>
//           </Typography>
//           <Typography>{ex.reps}</Typography>
//         </Grid>
//         <Grid item xs={2}>
//           <Typography>
//             <b>Reps</b>
//           </Typography>
//           <Typography>{ex.sets}</Typography>
//         </Grid>
//         <Grid item xs={2}>
//           <Typography>
//             <b>Weight</b>
//           </Typography>
//           <TextField
//             variant="outlined"
//             value={weightMap[ex.name]}
//             onChange={(e) => handleWeightChange(ex.name, e.target.value)}
//           />
//         </Grid>
//       </Grid>
//     </Paper>
//   );
// };

// export default ExerciseWithEditableWeight;
