interface apiTypes {
  avatar: string,
  listPlans: string,
  listWorkout: string,
  listExercise: string,
  login: string,
  modifyPassword: string,
  plans: string,
  signUp: string,
  upload: string,
  user: string,
  workout: string,
  exercise: string
}

const domainAddress: string = 'http://localhost:3000'

const api: apiTypes = {
  avatar: '/api/avatar/',
  listPlans: '/api/list_plans',
  listWorkout: '/api/list_workout',
  listExercise: '/api/list_exercise',
  login: '/api/login',
  modifyPassword: '/api/modify_password/',
  plans: '/api/plans/',
  signUp: '/api/sign_up',
  upload: '/api/upload',
  user: '/api/user/',
  workout: '/api/workout_day/',
  exercise: '/api/exercise/'
}

export default { api, domainAddress }
