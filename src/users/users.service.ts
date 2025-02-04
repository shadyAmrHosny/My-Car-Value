import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";


@Injectable()
export class UsersService {

  constructor( @InjectRepository(User) private repo: Repository<User> ) {}

  create(email: string, password: string){
    const user = this.repo.create({email, password});


    //this.save{email,password} ---> remember hooks not executed with this way
    return this.repo.save(user);
  }

  async findOne(id: number) {
    //this.repo.findOneById()
    if (!id){return null;}
   // return this.repo.findOneBy({ id });
    const user = await this.repo.findOne({
      where: { id },
      relations: ['reports'],
    });
    console.log(user)
    return user
  }

  find(email: string) {
    return this.repo.find({ where: { email } });
  }

  async update(id: number, attrs: Partial<User>){
    const user = await this.findOne(id);
    if (!user){
      throw new NotFoundException('user not found');
    }
    Object.assign(user, attrs);

    return this.repo.save(user);

  }

  async remove(id: number){
    const user = await this.findOne(id);
    if (!user){
      throw new NotFoundException('user not found');
    }
    return this.repo.remove(user);
  }

}
