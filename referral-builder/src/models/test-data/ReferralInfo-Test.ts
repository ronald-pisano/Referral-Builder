import { Address } from "../Address";
import { ReferralInfo } from "../ReferralInfo";

const testReferralInfoData: ReferralInfo[] = [
  new ReferralInfo(
    1,
    "John",
    "Johnson",
    "jh@email121.com",
    "0453-283-283",
    undefined,
    new Address("12", "High Street", "Sydney", "NSW", "2000", "Australia")
  ),
  new ReferralInfo(
    2,
    "Matthew",
    "Lombard",
    "mat197501@gmail.com",
    "0453-283-283",
    undefined,
    new Address("45", "Main Road", "Melbourne", "VIC", "3000", "Australia")
  ),
  new ReferralInfo(
    3,
    "Joe",
    "Dickson",
    "joe@dickson.com",
    "0453-283-283",
    undefined,
    new Address("89", "Elm Street", "Brisbane", "QLD", "4000", "Australia")
  ),
  new ReferralInfo(
    4,
    "Scarlet",
    "Johnson",
    "scarlet@johnson.com",
    "0453-283-283",
    undefined,
    new Address("101", "King Street", "Adelaide", "SA", "5000", "Australia")
  ),
  new ReferralInfo(
    5,
    "Peter",
    "Rhonda",
    "peter101@yahoo.com",
    "0453-283-283",
    undefined,
    new Address("76", "Queen Street", "Perth", "WA", "6000", "Australia")
  ),
];

export default testReferralInfoData;
