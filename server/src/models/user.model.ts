import { prop, getModelForClass, pre, modelOptions } from '@typegoose/typegoose';
import bcrypt from 'bcryptjs';
const saltRounds = 12; 

@pre<User>('save', async function () {
  // Hash password if the password is new or was updated
  if (!this.isModified('password')) return;

  // Hash password with costFactor of 12
  this.password = await bcrypt.hash(this.password, saltRounds);
})

@modelOptions({ schemaOptions: { collection: 'users' } })
export class User {
  @prop({ required: true, trim: true })
  public name!: string;

  @prop({ required: true, unique: true, match: /.+\@.+\..+/, trim: true })
  public email!: string;

  @prop({ required: true })
  public password!: string;

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

  @prop()
  public refreshToken?: string | null; 

  // @prop({ ref: () => Auction, default: [] }) 
  // public createdAuctions?: Ref<Auction>[];

  //Should define User Model by this ways
  //Currently i got problem with compile TypeScript
  //And Mongoose 
  // @prop({ ref: () => AuctionModel, foreignField: 'seller' }) 
  // public createdAuctions?: Ref<typeof AuctionModel>[];

  // @prop({ ref: () => AuctionModel, foreignField: 'currentBid' })
  // public currentBid?: Ref<typeof AuctionModel>[];

  @prop()
  public createdAuctions?: string[]; // Array of auction IDs

  @prop()
  public currentBid?: string[]; // Array of auction IDs

  // @prop({ ref: Auction, default: null }) // Reference to the AuctionModel for the current bid
  // public currentBid?: Ref<Auction>;


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
  public async authenticate(plainText: string) {
    return await bcrypt.compare(plainText, this.password);
  }
  // @prop({ ref: RefundTransaction, default: [] }) // Reference to the RefundTransaction model
  // public refundTransactions?: Ref<RefundTransaction>[];

 
}

const UserModel = getModelForClass(User);
export default UserModel;
