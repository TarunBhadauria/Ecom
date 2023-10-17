const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const otpTemplate = require("../mail/templates/emailVerification");

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 60 * 2
    }
});

async function sendVerificationMail(email, otp) {
    try {
        const emailResponse = await mailSender(email, "Verification Email", otpTemplate(otp));
        console.log("email sent successfully", emailResponse);
    } catch (error) {
        console.log("Error occurred while sending email: ", error);
        throw error;
    }
}

otpSchema.pre("save",async (next)=>{
            if(this.isNew){
                await sendVerificationMail(this.email,this.otp);
            }
            next();
})

module.exports = mongoose.model("Otp", otpSchema);