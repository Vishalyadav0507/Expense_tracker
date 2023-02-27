// const Sib=require('sib-api-v3-sdk')
// require('dotenv').config()

// const client =Sib.ApiClient.instance
// const apiKey = client.authentications['api-key']
// // apiKey.apiKey=process.env.API_KEY
// apiKey.apiKey='xsmtpsib-091fdbc0e2943f33aad36be3ee17ac716cc3c205c57d01e519525ab8e0ad601e-W4cTJ8EGM1rgSIhU'

// const tranEmailApi=new Sib.TransactionalEmailsApi()

// const sender={
//     email:"vishal364364yadav@gmail.com"
// }
// const receivers=[{
//     email:"vishal7z86yadav@gmail.com"
// }]

// const forgotPassword=async(req,res,next)=>{
   
//     tranEmailApi.sendTransacEmail({
//         sender,
//         to:receivers,
//         subject:'forgot password',
//         textcontent:`
//         click link to forgot password`
//     }).then(console.log)
//     .catch(console.log)
// }

// module.exports={
//     forgotPassword
// }
