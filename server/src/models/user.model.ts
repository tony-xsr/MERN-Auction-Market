import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import bcrypt from 'bcrypt';
import { AuctionModel } from './auction.model';
import { RefundTransactionModel } from './refund.model';


export class User {
  @prop({ required: true, trim: true })
  public name!: string;

  @prop({ required: true, unique: true, match: /.+\@.+\..+/, trim: true })
  public email!: string;

  @prop({ required: true })
  public hashed_password!: string;

  @prop()
  public salt!: string;

  @prop({ default: Date.now })
  public created!: Date;

  @prop({ default: false })
  public seller!: boolean;

  @prop()
  public stripe_seller?: object;

  @prop()
  public stripe_customer?: object;

  // @prop({ default: 0 })
  // public walletBalance!: number;

  @prop({ ref: () => AuctionModel }) 
  public createdAuctions?: Ref<typeof AuctionModel>[];

  @prop({ default: 0 })
  public availableBalance!: number; // This field stores the balance available for bidding

  @prop({ default: 0 })
  public lockedBalance!: number; // This field stores the locked (in-use) balance

  // Function to lock a certain amount of balance for bidding
  public lockBalanceForBid(amount: number): void {
    if (this.availableBalance >= amount) {
      this.availableBalance -= amount;
      this.lockedBalance += amount;
    } else {
      throw new Error('Insufficient available balance');
    }
  }

  // Function to unlock the locked balance when an auction expires
  public unlockBalanceForAuction(amount: number): void {
    if (this.lockedBalance >= amount) {
      this.availableBalance += amount;
      this.lockedBalance -= amount;
    } else {
      throw new Error('Invalid attempt to unlock balance');
    }
  }


  @prop({ ref: RefundTransactionModel }) // Reference to the RefundTransaction model
  public refundTransactions?: Ref<typeof RefundTransactionModel>[];

  
  @prop({ default: null, ref: AuctionModel }) // Reference to the AuctionModel for the current bid
  public currentBid?: Ref<typeof AuctionModel>;
  // @prop({ ref: () => BidModel }) // Reference to the Bid model
  // public bids?: Ref<typeof BidModel>[];

  public authenticate(plainText: string): boolean {
    return bcrypt.compareSync(plainText, this.hashed_password);
  }
}

export const UserModel = getModelForClass(User);
