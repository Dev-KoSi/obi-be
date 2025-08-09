const Message = require("../model/message");
const User = require('../model/user');

const sendMessage = async (req, res) => {
    try {
        const {username, message} = req.body;

        const user = await User.findOne({username});

        const receiverId = user ? user._id : null;

        if(!receiverId) return;

        const newMessage = await Message.create({
            message : message,
            sentTo : receiverId
        });

        if(newMessage) {
            return res.status(200).json({
                success : true,
                prompt : `Message is sent successfully.`,
                message : newMessage
            });
        } else {
            return res.status(401).json({
                success : false,
                prompt : `Failed to send message.`
            });
        }   
    } catch (error) {
        res.status(500).json({
            success : false,
            prompt : `Something went wrong, please try again.`,
            error : error
        })
    }
}

const getMessages = async (req, res) => {
    try {
        const {userId} = req.body;

        const getMessages = await Message.find({sentTo : userId});

        if(getMessages) {
            res.status(200).json({
                success : true,
                prompt : `Lists of messages`,
                message : getMessages
            });
        } else {
            res.status(401).json({
                success : false,
                prompt : `Something went wrong, please try again.`,
                error : error
            })
        }
    } catch (error) {
        res.status(500).json({
            success : false,
            prompt : `Something went wrong, please try again.`,
            error : error
        })
    }
};

module.exports = {getMessages, sendMessage};