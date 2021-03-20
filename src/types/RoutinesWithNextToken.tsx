import { Routine } from "../API"

type RoutinesWithNextToken = {
  moreRoutines: Routine[],
  token: string | null,
}

export default RoutinesWithNextToken