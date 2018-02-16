# Hayer API

## Jobs

POST /job --> Add new job

PUT /job --> Update job

GET /job/search --> Search

GET /job/{job ID} --> Retrieve job with specific job ID

POST /job/{job ID} --> Update job with specific job ID

DELETE /job/{job ID} --> Delete job with specific job ID

---

#### Job 
{
  id: integer
  name: string
  description: string
  photos: list of URLs
  tags: list of strings
  employer: integer (user ID)
  status: string enum: [hiring, in progress, closed]
}

## Users

POST /user --> Create user

GET /user/username --> Retriever user with specific username

PUT /user/username --> Update user with specific username

DELETE /user/username --> Delete user with specific username

---

### User
{
  id: integer
  username: string
  name: {firstName: string, lastName: string}
  email: string
  phone: string
  pastJobs: list of ints
  ** have to go to washroom: reminder: leave space for reviews **
  
  
  
# ** TO BE CONTINUED **
