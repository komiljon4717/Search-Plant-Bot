import otpGenerator from 'otp-generator'
import { writeLogFile } from "../controllers/functions.js"

function codeGenerator() {
    try {
        return otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
    } catch (error) {
        writeLogFile(error.message)
        console.log("codeGenerator");
        console.log(error.message);
    }
}

export {
    codeGenerator
}