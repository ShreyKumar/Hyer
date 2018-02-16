# Hayer API

## Jobs

POST /job --> Add new job

PUT /job --> Update job

GET /job/search --> Search

GET /job/{job ID} --> Retrieve job with specific job ID

POST /job/{job ID} --> Update job with specific job ID

DELETE /job/{job ID} --> Delete job with specific job ID

#### Job
{

  id: integer
  
  name: string
  
  description: string
  
  coordinates: {X: float, Y: float}
  
  pay: {integer, string enum: [one-time, hourly]}
  
  duration: string
  
  photos: list of URLs
  
  tags: list of strings
  
  prerequisites: list of strings
  
  employer: integer (user ID)
  
  status: string enum: [hiring, in progress, closed]
  
}


## Users

POST /user --> Create user

GET /user/username --> Retriever user with specific username

PUT /user/username --> Update user with specific username

DELETE /user/username --> Delete user with specific username

### User
{

  id: integer
  
  username: string
  
  name: {firstName: string, lastName: string}
  
  email: string
  
  phone: string
  
  bio: string
  
  photos: list of URLs
  
  pastJobs: {asEmployer: list of ints (job IDs), asEmployee: list of ints (job IDs)}
  
  reviews: {asEmployer: list of review IDs, asEmployee: list of review IDs}
  
 }
