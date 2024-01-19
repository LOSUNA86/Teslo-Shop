import { EntitySubscriberInterface, EventSubscriber, InsertEvent, TransactionCommitEvent } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {

 async afterInsert(event: InsertEvent<User>) {
   console.log(event.entity);
 }

}