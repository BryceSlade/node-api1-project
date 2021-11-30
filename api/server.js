const express = require('express');
const User = require('./users/model');

const server = express();

server.use(express.json());

server.post("/api/users", async (req, res) => {
    try {
        const { name, bio } = req.body

        if(!name || !bio) {
            res.status(400).json( { message: "Please provide name and bio for the user" } )

        } else {
            const user = await User.insert( {name, bio } )
            res.status(201).json(user)
        }

    } catch(error) {
        res.status(500).json( { message: "The user with the specified ID does not exist" } )
    }
})

server.get("/api/users", async ( req, res ) => {
    try{
        const users = await User.find()
        res.status(200).json(users)

    } catch(error) {
        res.status(500).json( { message: "The user information could not be retrieved" } )
    }
})

server.get("/api/users/:id", async ( req, res ) => {
    try{
        const { id } = req.params
        const user = await User.findById(id)

        if(!user) {
            res.status(404).json( { message: "The user with the specified ID does not exist" } )

        } else {
            res.status(200).json(user)
        }

    } catch (error) {
        res.status(500).json( { message: "The user could not be removed" } )
    }
})

server.delete("/api/users/:id", ( req, res ) => {
    const { id } = req.params
    User.remove(id)
        .then(deleteUser => {
            if(!deleteUser) {
                res.status(404).json( { message: "The user with the specified ID does not exist" } )

            } else {
                res.status(200).json(deleteUser)
            }

        }).catch(error => {
            res.status(500).json( { message: "The user information could not be modified" } )
        })
})


server.put("/api/users/:id", async ( req, res ) => {
    try{
        const { id } = req.params
        const { name, bio } = req.body
        
        if(!name || !bio) {
            res.status(400).json( { message: "Please provide name and bio for the user" } )

        } else {
            const updateUser = await User.update(id, { name, bio })

            if(updateUser) {
                res.status(200).json(updateUser)

            } else {
                res.status(404).json( { message: "The user with the specified ID does not exist" } )
            }
        }
    } catch (error) {
        res.status(500).json( { message: "The user information could not be modified" } )
    }
})

module.exports = server;