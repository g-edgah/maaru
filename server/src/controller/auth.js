import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const register = async (req, res) => {
    try {
        const {
            firstName, 
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occcupation 

        } = req.body

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName, 
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occcupation,
            viewedProfile: Math.floor(Math.random()*10000), //dummy value
            impressions: Math.floor(Math.random()*10000), //dummy value
        });

        const savedUser = await newUser.save()

    } catch (error) {
        console.log("error in register function: "+error)
    }
}