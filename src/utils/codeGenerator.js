import otpGenerator from 'otp-generator'

function codeGenerator() {
    try {
        return otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
    } catch (error) {
        console.log("codeGenerator");
        console.log(error.message);
    }
}

export {
    codeGenerator
}