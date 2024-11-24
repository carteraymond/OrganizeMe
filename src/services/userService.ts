import User from '../models/user';


const createNewUser = async (
    email: string, 
    password: string, 
    firstName: string, 
    lastName: string
    ) =>  {
    
    // Create new User Model 
    const newUser = new User({
        email: email,
        passwordHash: password,
        firstName: firstName,
        lastName: lastName,
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    // Save new User Model
    let isSaved = false;
    await newUser.save()
    .then(user => {
        console.log('User created:', user);
        isSaved = true;
    })
    .catch(err => console.error(err));
    
    if (isSaved) return newUser;
    else return undefined;
};

const updateUser = async (
    id: string,
    firstName?: string, 
    lastName?: string
) =>  {
    // Construct the update object dynamically
    let updateFields: { [key: string]: string | undefined } = {};
    if (firstName) updateFields.firstName = firstName;
    if (lastName) updateFields.lastName = lastName;

    // Save new User Model
    let isSaved = false;
    let updatedUser = await User.updateOne({ _id: id }, { $set: updateFields }) // This
    .then(user => {
        console.log('User updated:', user);
        isSaved = true;
    })
    .catch(err => console.error(err));
    
    if (isSaved) return updatedUser;
    else return undefined;
};

const deleteUser = async (id: string) => {
    let isDeleted = false;
    let deletedUser = await User.deleteOne({ _id: id })
    .then(result => {
        if (result.deletedCount > 0) {
            console.log('User deleted:', result);
            isDeleted = true;
        } else {
            console.log('No user found with the given ID.');
        }
    })
    .catch(err => console.error(err));
    
    if (isDeleted) return deletedUser;
    else return undefined;
};

const getUserById = async (id: string) => {
    try {
        const user = await User.findById(id);
        if (user) {
            console.log('User found:', user);
            return user;
        } else {
            console.log('No user found with the given ID.');
            return undefined;
        }
    } catch (err) {
        console.error(err);
        return undefined;
    }
};

const getAllUsers = async () => {
    try {
        const users = await User.find({});
        if (users.length > 0) {
            console.log('Users found:', users);
            return users;
        } else {
            console.log('No users found.');
            return [];
        }
    } catch (err) {
        console.error(err);
        return [];
    }
};


export {
    createNewUser,
    updateUser,
    deleteUser,
    getUserById,
    getAllUsers
}