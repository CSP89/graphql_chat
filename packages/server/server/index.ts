import "./common/env";
import Server from "./common/server";

import apolloServer from "./graphql";

const port = parseInt(process.env.PORT);

export default new Server(apolloServer).listen(port);
