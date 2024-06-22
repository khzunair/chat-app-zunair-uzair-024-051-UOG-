const express = require("express");
const router = express.Router();
const User = require("../../models/user");


// @route       POST api/search-user-by-email
// @description Search for a user by email
// access       Public
router.post('/search-user', async (req, res) => {
    try {
        const { email, userID } = req.body;

        // Check if the email and userID are provided in the request body
        if (!email || !userID) {
            return res.status(400).json({ msg: 'Email and userID are required' });
        }

        // Search for the user by email
        const user = await User.findOne({ email });

        // Check if the user is found
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Check if the searched email matches the userID
        if (user._id.toString() === userID) {
            return res.status(400).json({ msg: 'You cannot search yourself, go to the profile section' });
        }

        // Return the user's information without the password
        const { _id, name, avatar } = user;
        const userData = {
            _id,
            name,
            email,
            avatar
        };

        res.json(userData);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
});


router.post('/send-friend-request/:userId', async (req, res) => {
    try {
        // Add the user id in request body
        const { user } = req.body;

        //   Error Check if no user is selected
        if (!user) {
            return res.status(401).json({ msg: 'Please Select Sender' });
        }
        //   Select user from database by finding by id
        const UserSender = await User.findById(user);

        if (!UserSender) {
            return res.status(401).json({ msg: 'No user with the body id found' });
        }

        const receivingUserId = req.params.userId;

        // Check if the receiving user exists
        const receivingUser = await User.findById(receivingUserId);
        //   console.log(receivingUser)

        if (!receivingUser) {
            return res.status(404).json({ msg: 'User to sent not found' });
        }

        const areFriends = UserSender.friends.some(friend => friend.user.toString() === receivingUserId);

        if (areFriends) {
            return res.status(400).json({ msg: 'Users are already friends' });
        }
        // Check if a friend request already exists
        const check = UserSender.friendRequestsSent;




        if (check.length > 0) {
            const existingRequest = UserSender.friendRequestsSent.find(
                (request) => request.user.toString() === receivingUserId
            );

            if (existingRequest) {
                return res.status(400).json({ msg: 'Friend request already sent to this user' });
            }
        }

        // Add a new friend request
        UserSender.friendRequestsSent.push({
            user: receivingUserId,
            status: 'pending',
        });

        //   Add in the recieved request to the reciever
        receivingUser.friendRequestsReceived.push({
            user: user,
            status: 'pending',
        });

        await UserSender.save();
        await receivingUser.save();

        return res.json({ msg: 'Friend request sent' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


router.post('/respond-to-friend-request/:requestId', async (req, res) => {
    try {
        const { userID } = req.body; // Assuming you have authentication middleware
        const requestId = req.params.requestId;
        const { action } = req.body; // 'accept' or 'reject'
        const receivingUser = await User.findById(userID);
        console.log(receivingUser)
        const request = receivingUser.friendRequestsReceived.find(
            (request) => request._id.toString() === requestId
        );

        if (!request) {
            return res.status(404).json({ msg: 'Friend request not found' });
        }

        const requestingUser = await User.findById(request.user);

        if (action === 'accept') {
            // Add the user to the friends list for both users
            receivingUser.friends.push({
                user: request.user,
                name: requestingUser.name, // Add the name of the requesting user
                avatar: requestingUser.avatar, // Add the avatar of the requesting user
            });

            requestingUser.friends.push({
                user: receivingUser._id,
                name: receivingUser.name, // Add the name of the receiving user
                avatar: receivingUser.avatar, // Add the avatar of the receiving user
            });

            // Update the status of the friend request
            request.status = 'accepted';

            // Remove the friend request from both lists
            receivingUser.friendRequestsReceived = receivingUser.friendRequestsReceived.filter(
                (req) => req._id.toString() !== requestId
            );
            requestingUser.friendRequestsSent = requestingUser.friendRequestsSent.filter(
                (req) => req.user.toString() !== receivingUser._id.toString()
            );

            await receivingUser.save();
            await requestingUser.save();

            return res.json({ msg: 'Friend request accepted' });
        } else if (action === 'reject') {
            // Update the status of the friend request to 'rejected'
            request.status = 'rejected';

            // Remove the friend request from the receiving user's list
            receivingUser.friendRequestsReceived = receivingUser.friendRequestsReceived.filter(
                (req) => req._id.toString() !== requestId
            );
            requestingUser.friendRequestsSent = requestingUser.friendRequestsSent.filter(
                (req) => req._id.toString() !== requestId
            );

            await receivingUser.save();
            await requestingUser.save();

            return res.json({ msg: 'Friend request rejected' });
        } else {
            return res.status(400).json({ msg: 'Invalid action' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });;
    }
});


// @route       POST api/remove-friend/:remove_friend_ID
// @description Remove a friend by ID
// access       Private (assuming you have authentication middleware)

router.post('/remove-friend/:remove_friend_ID', async (req, res) => {
    try {
        const { userID } = req.body; // Assuming you have authentication middleware
        const { remove_friend_ID } = req.params; // Get the friend's ID from URL parameters

        // Find the current user by their ID
        const currentUser = await User.findById(userID);

        // Find the friend to remove by their ID
        const removeFriend = await User.findById(remove_friend_ID);

        // Check if the friend to remove exists
        if (!removeFriend) {
            return res.status(404).json({ msg: 'Friend not found' });
        }

        // Check if the friend to remove is in the current user's friend list
        const isFriend = currentUser.friends.some(friend => friend.user.toString() === remove_friend_ID);

        if (!isFriend) {
            return res.status(400).json({ msg: 'User is not in your friend list' });
        }

        // Remove the friend from the current user's friend list
        currentUser.friends = currentUser.friends.filter(friend => friend.user.toString() !== remove_friend_ID);

        // Remove the current user from the friend's friend list
        removeFriend.friends = removeFriend.friends.filter(friend => friend.user.toString() !== userID);

        // Save the changes to both users in the database
        await currentUser.save();
        await removeFriend.save();

        return res.json({ msg: 'Friend removed successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
});



module.exports = router;