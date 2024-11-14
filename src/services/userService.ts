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

export {
    createNewUser
}