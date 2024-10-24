import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map}  from 'rxjs/operators'
import { plainToClass } from "class-transformer";
import { UserDto } from "../users/dtos/user.dto";

//interface to enforce class as an argument
interface ClassConstructor{
  new (...args: any[]):{}
}
export function Serialize(dto: ClassConstructor){
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor{
  constructor(private dto: any) {}
intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
  //run something before a request is handled
  //by the request handler
  //console.log('Im running before the handler',context);

  return next.handle().pipe(
    map((data: any)=>{ // this data argument is the data we are going to send back in the res
      //run something before a response is sent out
      //console.log('Im running before response is sent out', data);

      return plainToClass(this.dto, data,{
        excludeExtraneousValues: true,
      })
    })
  )

}


}