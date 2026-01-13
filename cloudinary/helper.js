const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: 'dfiznktuu',
    api_key: '434648319642415',
    api_secret: 'yH91jW6Qf7GfXSwMxhdUZ8fRS0g' // Click 'View API Keys' above to copy your API secret
});


const uploadFiles=(files)=>{
    const uploadResult =  files.map((file)=>{
        return cloudinary.uploader.upload(file.path,{folder:'products'})
    })

    return Promise.all(uploadResult)
}

module.exports=uploadFiles