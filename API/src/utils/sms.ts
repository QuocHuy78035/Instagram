import https from "https";
import { InternalServerError } from "../core/error.response";

const type = {
  OTP: "OTP",
  LINK: "LINK",
};

export class SMS {
  phone: string;
  content: string;
  type: string;
  constructor(type: string, phone: string, content: string) {
    this.phone = phone;
    this.content = content;
    this.type = type;
  }

  async sendSMS() {
    var url = "api.speedsms.vn";
    var params = JSON.stringify({
      to: [this.phone],
      content: `Your ${
        this.type === type.OTP ? "OTP" : "verification link"
      } is ${this.content}. Don't share it!`,
      sms_type: 2,
      sender: process.env.SENDER_SMS,
    });

    var buf = new Buffer(process.env.ACCESS_TOKEN_SMS + ":x");
    var auth = "Basic " + buf.toString("base64");
    const options = {
      hostname: url,
      port: 443,
      path: "/index.php/sms/send",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth,
      },
    };

    const req = https.request(options, function (res) {
      res.setEncoding("utf8");
      var body = "";
      res.on("data", function (d) {
        body += d;
      });
      res.on("end", function () {
        var json = JSON.parse(body);
        if (json.status == "success") {
          console.log("send sms success");
        } else {
          throw new InternalServerError("");
        }
      });
    });

    req.on("error", function (e) {
      console.log("send sms failed: " + e);
    });

    req.write(params);
    req.end();
  }
}
