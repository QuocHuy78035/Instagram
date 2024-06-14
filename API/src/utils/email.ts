import nodemailer from "nodemailer";

const type = {
  OTP: "OTP",
  LINK: "LINK",
};

export class Email {
  email: string;
  content: string;
  type: string;
  constructor(type: string, email: string, content: string) {
    this.email = email;
    this.content = content;
    this.type = type;
  }

  async sendEmail() {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS,
      },
    });

    return await transporter.sendMail({
      from: process.env.AUTH_EMAIL, // sender address
      to: this.email, // list of receivers
      subject:
        this.type === type.OTP ? "Verify OTP ✅" : "Verification Link ✅", // Subject line
      html:
        this.type === type.OTP
          ? `
            <h3>Verify OTP ✅</h3>
            <p>Welcome!</p>
            <p>Here is your verification code: ${this.content} </p>
            <p>Please use this code to complete the authentication process.</p>`
          : `<h3>Verification Link ✅</h3>
            <p>Welcome!</p>
            <p>Here is your verification link: ${this.content} </p>
            <p>Please use this link to complete the authentication process.</p>`, // html body
    });
  }
}
