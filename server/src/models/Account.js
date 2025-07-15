const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const accountSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        }
    }
)

accountSchema.pre("save", async function() {
    try {
        this.password = await bcrypt.hash(this.password,15);
    } catch (error) {
        console.log("Error Hashing Password");
    }
});

const Account = mongoose.model('Account', accountSchema);
module.exports = Account;