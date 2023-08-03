import { STRING, INTEGER } from "../constants/constants.js";
import { MOMO } from "../constants/constants.js";
import dateFormat from "dateformat";
import querystring from "qs";
import crypto from "crypto";
import https from "https";

export const test = async (req, res) => {
  try {
    //https://developers.momo.vn/#/docs/en/aiov2/?id=payment-method
    //parameters
    var partnerCode = MOMO.PARTNER_CODE;
    var accessKey = MOMO.ACCESS_KEY;
    var secretkey = MOMO.SECRET_KEY;
    var requestId = partnerCode + new Date().getTime();
    var orderId = requestId;
    var orderInfo = "Thanh toan don hang #1231233 tai TUANVU COTO HOTEL";
    var redirectUrl = "http://localhost:3001/test";
    var ipnUrl = "https://callback.url/notify";
    // var ipnUrl = redirectUrl = "https://webhook.site/454e7b77-f177-4ece-8236-ddf1c26ba7f8";
    var amount = "50000";
    var requestType = "captureWallet";
    var extraData = ""; //pass empty value if your merchant does not have stores

    //before sign HMAC SHA256 with format
    //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
    var rawSignature =
      "accessKey=" +
      accessKey +
      "&amount=" +
      amount +
      "&extraData=" +
      extraData +
      "&ipnUrl=" +
      ipnUrl +
      "&orderId=" +
      orderId +
      "&orderInfo=" +
      orderInfo +
      "&partnerCode=" +
      partnerCode +
      "&redirectUrl=" +
      redirectUrl +
      "&requestId=" +
      requestId +
      "&requestType=" +
      requestType;
    //puts raw signature
    console.log("--------------------RAW SIGNATURE----------------");
    console.log(rawSignature);
    //signature
    var signature = crypto
      .createHmac("sha256", secretkey)
      .update(rawSignature)
      .digest("hex");
    console.log("--------------------SIGNATURE----------------");
    console.log(signature);

    //json object send to MoMo endpoint
    const requestBody = JSON.stringify({
      partnerCode: partnerCode,
      accessKey: accessKey,
      requestId: requestId,
      amount: amount,
      orderId: orderId,
      orderInfo: orderInfo,
      redirectUrl: redirectUrl,
      ipnUrl: ipnUrl,
      extraData: extraData,
      requestType: requestType,
      signature: signature,
      lang: "en",
    });
    //Create the HTTPS objects
    const options = {
      hostname: "test-payment.momo.vn",
      port: 443,
      path: "/v2/gateway/api/create",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(requestBody),
      },
    };
    //Send the request and get the response
    const MOMO_REQ = https.request(options, (MOMO_RES) => {
      console.log("--------------------statusCode----------------");
      console.log(`Status: ${MOMO_RES.statusCode}`);
      console.log("--------------------Headers----------------");
      console.log(`Headers: ${JSON.stringify(MOMO_RES.headers)}`);
      MOMO_RES.setEncoding("utf8");
      MOMO_RES.on("data", (body) => {
        // console.log("Body: ");
        // console.log(body);
        // console.log("payUrl: ");
        console.log("--------------------URL----------------");
        console.log(JSON.parse(body).payUrl);
        console.log("--------------------END----------------");
        res.status(200).send(JSON.parse(body).payUrl);
      });
      MOMO_RES.on("end", () => {
        console.log("No more data in response.");
      });
    });

    MOMO_REQ.on("error", (e) => {
      console.log(`problem with request: ${e.message}`);
    });
    // write data to request body
    console.log("Sending....");
    MOMO_REQ.write(requestBody);
    MOMO_REQ.end();
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};

function sortObject(obj) {
  var sorted = {};
  var str = [];
  var key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}
