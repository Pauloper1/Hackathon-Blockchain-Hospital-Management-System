const PatientsCon = artifacts.require("./PatientsCon.sol");

module.exports = function (deployer) {
  deployer.deploy(PatientsCon);
};
