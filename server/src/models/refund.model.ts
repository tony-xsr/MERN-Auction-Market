import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { UserModel } from './user.model'; // Import the User model

class RefundTransaction {
  @prop({ required: true, ref: UserModel }) // Reference to the User model for the user receiving the refund
  public user!: Ref<typeof UserModel>;

  @prop({ required: true })
  public amount!: number; // The amount of the refund

  @prop({ required: true })
  public reason!: string; // The reason for the refund

  @prop({ default: Date.now })
  public timestamp?: Date; // Timestamp of the refund transaction
}

export const RefundTransactionModel = getModelForClass(RefundTransaction);
