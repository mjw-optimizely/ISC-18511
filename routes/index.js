var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/validate", function (req, res, next) {
  var axios = require("axios").default;

  var options = {
    method: "POST",
    url: "https://uat.gw.fraud.eu.elavonaws.com/3ds2/validate",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Basic ZGQ4ODR0cHlqMzRieXB3YngyYmdqamZiY2hodzpza18yZDkzZ3E5NDlnNzM2YmJ5YjZ3Y2Njanh2M3h3",
    },
    data: {
      PaRes: req.body.PaRes,
      MD: req.body.MD,
    },
  };

  axios
    .request(options)
    .then(function (response) {
      // "authenticationValue":"yZm33IsHWcSd/7BE4U7681Jy2xc=","eci":"05","transStatus":"Y"
      console.log("auth: " + response.data.rReq.authenticationValue);
      console.log("trans: " + response.data.rReq.transStatus);
      console.log("eci: " + response.data.rReq.eci);
      res.render("validation_success", {
        response: JSON.stringify(response.data),
        authenticationValue: response.data.rReq.authenticationValue,
        transStatus: response.data.rReq.transStatus,
        eci: response.data.rReq.eci,
      });
    })
    .catch(function (error) {
      res.render("validation_error", {});
    });
});

module.exports = router;
