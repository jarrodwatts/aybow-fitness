import { API, graphqlOperation } from "aws-amplify";

import { GetRoutineQuery, ListRoutinesQuery } from "../../API";
import { getRoutine, listRoutines } from "../../graphql/queries";
import config from '../../aws-exports'
import { GetStaticProps, GetStaticPaths } from "next";

API.configure(config);

const IndividualRoutine = (props: {
  routine: GetRoutineQuery["getRoutine"];
}) => {
  return (
    <div>
      <h2>Individual Routine {props.routine.id}</h2>
      <pre>{JSON.stringify(props.routine, null, 2)}</pre>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  let result = (await API.graphql(graphqlOperation(listRoutines))) as {
    data: ListRoutinesQuery;
    errors: any[];
  };

  console.log("result:", result);

  if (result.errors) {
    console.error("Failed to fetch routines paths.", result.errors);
    throw new Error(result.errors[0].message);
  }
  const paths = result.data.listRoutines.items.map(({ id }) => ({
    params: { id },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params: { id } }) => {
  const routine = (await API.graphql({
    ...graphqlOperation(getRoutine),
    variables: { id },
  })) as { data: GetRoutineQuery; errors: any[] };

  if (routine.errors) {
    console.error("Failed to fetch routine.", routine.errors);
    throw new Error(routine.errors[0].message);
  }

  return {
    props: {
      routine: routine.data.getRoutine,
    },
  };
};

export default IndividualRoutine;
