const random = new (require("chance"))();
import bcrypt from "bcrypt";

const PASSWORD = "mypass123";

const mixins = {
  user: () => {
    const username =
      random.first() +
      random.last() +
      random.integer({ min: 100, max: 999 }).toString();
    const hash = bcrypt.hashSync(PASSWORD, 10);
    return {
      username,
      email: random.email(),
      password: hash,
    };
  },
};

random.mixin(mixins);

export default random;
