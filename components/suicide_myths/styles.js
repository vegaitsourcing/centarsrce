import { normalize } from "../../helpers/sizes";

export default {
  container: {
    flex: 1,
    justifyContent: "space-between"
  },
  body: {
    fontSize: normalize(14),
    //paddingHorizontal: normalize(24),
    paddingVertical: normalize(12)
  },
  scrollView: {
    paddingHorizontal: normalize(24)
  }
};
