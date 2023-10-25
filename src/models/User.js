const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required!'],
        minLength: 10,
    },
    username: {
        type: String,
        required: [true, 'Username is required!'],
        minLength: 3,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        minLength: 4,
    },
});

userSchema.virtual('repeatPassword')
    .set(function (value) {
        if (this.password !== value) {
            throw new Error('Passwords do not match!');
        }
    })

userSchema.pre('save', async function() {
    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
})

const User = mongoose.model('User', userSchema);

module.exports = User;