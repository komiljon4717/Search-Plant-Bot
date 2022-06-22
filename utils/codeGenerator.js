import otpGenerator from 'otp-generator'

function codeGenerator() {
    return otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
    
}

export {
    codeGenerator
}