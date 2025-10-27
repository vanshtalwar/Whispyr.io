import User from "../models/user.model.js";
import Message from '../models/message.model.js'

export const getUserForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUser = await User.find({_id: {$ne: loggedInUserId}}).select("-password")
        
        res.send(200).json(filteredUser)

    } catch (error) {
         console.log("error in getUserForSidebar", error)
        res.status(500).json({ message: "internal server error" })
    }
}

export const getMessages = async (req,res) => {
try {
    
    const { id:userToChatId } = req.params
    const myId = req.user._id
    const messages = await Message.find({
        $or:[
            {senderId:myId, receiverId: userToChatId},
            {senderId:userToChatId, receiverId:myId }
        ]
    })
    res.status(200).json(messages)

} catch (error) {
    console.log("error in getMessages", error)
        res.status(500).json({ message: "internal server error" })
}
}

export const sendMessage = async (req,res) => {
try {
    const {text, image} = req.body
    const {id:receiverId } = req.params
    const senderId = req.user._id

    let imageUrl;
    if (image) {
        const uploadResponse = await cloudinary.uploader.upload(image)
        imageUrl = uploadResponse.secure_url
    }
    const newMessage = new Message({
        senderId,
        receiverId,
        text,
        imageUrl,
    })

    await newMessage.save()

    //todo :add socket.io here
    res.status(201).json(newMessage)

} catch (error) {
    console.log("error in sendMessage", error)
        res.status(500).json({ message: "internal server error" })
}
}