import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { request } from "http";

//Creates customer decorator
export const CurrentUser = createParamDecorator(
    //context is a wrapper around the incoming request
    //data is data or args we provide when we make use of it in the req handler
    (data: never, context: ExecutionContext) => {
        // give us the underlying requst coming into out application
        const req = context.switchToHttp().getRequest();
        // looks at the userId on the current session
        return req.currentUser;
    }
)