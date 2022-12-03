import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { map, Observable } from "rxjs";

// This is the interface that enforces you must use a class
interface ClassConstructor {
    new(...args: any[]): {}
}

export function Serialize(dto: ClassConstructor) {
    return UseInterceptors(new SerializeInterceptor(dto))
}

export class SerializeInterceptor implements NestInterceptor {
    // Enables serializer to take in whate dto needed
    constructor(private dto: any) { }
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        // Run something before a request is handled by the request handler
        return next.handle().pipe(
            map((data: any) => {
                return plainToClass(this.dto, data, {
                    // This is the magic that works with the Expose decorator in the DTO
                    // Ensures only exposes values in the DTO specified
                    excludeExtraneousValues: true
                })
            })
        )
    }
}