import { Factory } from "fishery";
import { AvailabilityV3 } from "../../src/core/fbs/model/availabilityV3";

export default Factory.define<AvailabilityV3>(() => ({
  // We have to provide default values for all required fields. Fishery does
  // not provide a way to force the caller to provide values.
  recordId: "123456",
  available: true,
  reservable: true,
  reservations: 0
}));
