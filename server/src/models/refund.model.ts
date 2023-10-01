import { prop, getModelForClass, Ref, modelOptions } from '@typegoose/typegoose';
import {User} from './user.model'; // Import the User model

@modelOptions({ schemaOptions: { collection: 'refunds' } })
export class RefundTransaction {
  @prop({ required: true, ref: User }) // Reference to the User model for the user receiving the refund
  public user!: Ref<User>;

  @prop({ required: true })
  public amount!: number; // The amount of the refund

  @prop({ required: true })
  public reason!: string; // The reason for the refund

  @prop({ default: Date.now })
  public timestamp?: Date; // Timestamp of the refund transaction
}
const RefundTransactionModel = getModelForClass(RefundTransaction);
export default RefundTransactionModel;