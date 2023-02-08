import User from "../models/User.js";
import bcrypt from 'bcrypt';

export const index = async(req,res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'name', 'email']
        });
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}

export const store = async(req,res) => {
    const { name, email, password, confPassword } = req.body;
    if (password !== confPassword) return res.status(400).json({msg:"Password dan Confirm Password tidak cocok"})
    const salt = await bcrypt.genSalt()
    const hashPassword = await bcrypt.hash(password, salt)
    try {
        const user = await User.create({
            name: name,
            email: email,
            password: hashPassword
        })
        res.status(200).json({msg:"User berhasil ditambahkan"})
    } catch (error) {
        console.log(error);
    }
}

export const show = async(req,res) => {
    const id = req.params.id;
    try {
        const user = await User.findByPk(id, {
            attributes: ['id', 'name', 'email']
        });
        if (!user) return res.status(400).json({msg:"User tidak ditemukan"})
        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
    }   
}

export const update = async(req,res) => {
    const id = req.params.id;
    const { name, email } = req.body;
    try {
        const user = await User.findByPk(id);
        if (!user) return res.status(400).json({msg:"User tidak ditemukan"})
        await User.update({
            name: name,
            email:email
        }, {
            where: {
            id: user.id
        }})
        return res.status(200).json({msg:"User berhasil diupdate"});
    } catch (error) {
        console.log(error);
    }   
}

export const destroy = async(req,res) => {
    const id = req.params.id;
    try {
        const user = await User.findByPk(id);
        if (!user) return res.status(400).json({msg:"User tidak ditemukan"})
        await User.destroy({
            where: {
                id: user.id
            }
        })
        return res.status(200).json({msg:"User berhasil dihapus"});
    } catch (error) {
        console.log(error);
    }   
}


