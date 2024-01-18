const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");


//name, email, photo, password, passwordConfirmed
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please tell us your name"],
    },
    email: {
        type: String,
        required: [true, "Please provide your email"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email"],
    },
    photo: String,
    role: {
        type: String,
        enum: ["user", "creator","admin","guide"],
        default: "user",
    },

    password: {
        type: String,
        required: [true, "please provide a password"],
        minlength: 8,
        select: false,
    },
    passwordConfirm: {
        type: String,
        required: [true, "please confirm your password"],
        validate: {
            // This will only work on save not on find, findone
            validator: function (el) {
              return el === this.password //abc === abc true, abc ===acb false
            },
            message: "password is not the same",
        },            
    },
    passwordchangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
        type: Boolean,
        default: true,
        select: false,
    }
});

userSchema.pre("save", function(next) {
    if(!this.isModified("password") || this.isNew) return next();

    this.passwordchangedAt = Date.now() - 1000;
    next();
});

userSchema.pre(/^find/, function (next) {
    this.find({ active: { $ne: false} });
    next();
});
userSchema.pre("save", async function (next) {
    //PASSWORD MODEIFIED
    if (!this.isModified("password")) return next();
    //Rus this code
    //HASH PASSWPRD 12
    this.password = await bcrypt.hash(this.password, 12);
    //DELETE CONFIRM PASSWORD
    this.passwordConfirm = undefined;
    next();
});

userSchema.methods.correctPassword = async function (
    candidatepassword,
    userPassword
) {
    return await bcrypt.compare(candidatepassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
    if(this.passwordchangedAt) {
        const changedTimeStamp = parseInt(this.passwordchangedAt.getTime()/ 1000, 10);
        return JWTTimestamp < changedTimeStamp; // 300 < 200
        
        console.log(changedTimeStamp, JWTTimestamp);
    }

    return false;
};

userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString("hex");

    this.passwordResetToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

        console.log({ resetToken }, this.passwordResetToken);

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    return resetToken;
};
// BY DEFAULT WE WANT TO RETURN FALSE, MEANS NOT CHANGE
// const User = mongoose.model("User", userSchema);

// module.exports = User;
//mongoose.models = {}
export default mongoose.models.User || mongoose.model("User", userSchema);