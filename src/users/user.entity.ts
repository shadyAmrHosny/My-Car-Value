import { AfterInsert, AfterRemove, AfterUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Report } from "../reports/report.entity";
// import { Exclude } from "class-transformer";
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  // @Exclude()
  password: string;

  @Column({default: true})
  admin: boolean;

  // the goal of the first arg to tell typeOrm the type of the record user is going to be associated with
  @OneToMany(()=>Report,(report) => report.user) //--> we have to provide some diff args to the decorator to customize how this behaves
  reports: Report[]; // add new property that's going to tell typeOrm that we are forming a relationship


  @AfterInsert()
  logInsert(){
    console.log('Inserted User with id',this.id);
  }

  @AfterUpdate()
  logUpdate(){
    console.log('Updated User with id',this.id);
  }
  @AfterRemove()
  logRemove(){
    console.log('Removed User with id',this.id);
  }


}