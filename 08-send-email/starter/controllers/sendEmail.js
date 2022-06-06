const nodemailer = require('nodemailer')

const sendEmail = async (req, res) => {
    let testAccount = await nodemailer.createTestAccount()

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'levi.douglas16@ethereal.email',
            pass: 'qwEc9DTd1jsfv98qsm'
        }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '" Hassan Bulega" <hassanbulega@hasgotech.com>', // sender address
        to: "hassanbulega@gmail.com, info@quranuganda.com", // list of receivers
        subject: "Hello ✔", // Subject line
        // text: "Hello world?", // plain text body
        html: "<b>Sending emails with Nodejs</b>", // html body
    });



    res.json(info)
}

module.exports = sendEmail