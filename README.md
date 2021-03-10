# AhmadMardianaBackEndTest
BackEnd Test

API : https://ahmad-mardiana.herokuapp.com <br>
MongoDB, using MongoDb Cloud : <br>
 Connect with mongo Compas : mongodb+srv://ahmadMardiana:Ku4u4qMEDSG64Tuh@cluster0.bkezq.gcp.mongodb.net/AhmadMardiana
<br>
Redis, using RedisLab Cloud : <br>
  endpoint : redis-12149.c246.us-east-1-4.ec2.cloud.redislabs.com:12149 <br>
  pass : dyhVbwu9YI3a7JoLggE1oPNMpp9S3yxe <br>
note : redis only as replicate mongoDb, not caching query
<br>
<br> =================================================================
<br> API Documentation : 
<br> GET /generate-token, for generating token
<br> GET /user , for getting all user
<br> POST /user , for creating new user
<br> GET /user/account-number/[Account Number] , for find user by Account Number
<br> GET /user/identity-number/[Idenntity Number], for find user by Identity Number
<br> PUT /user/[id] , for updating user data
<br> DELETE /user/[id], for deleting user
<br> ================================================================
