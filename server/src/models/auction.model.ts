import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { UserModel } from './user.model'; // Import the User model

class Bid {
    @prop({ ref: UserModel }) // Reference to the User model
    bidder!: Ref<typeof UserModel>;
  
    @prop()
    bid!: number;
  
    @prop()
    time!: Date;
  }

class Auction {
  @prop({ required: true, trim: true })
  public itemName!: string;

  @prop({ trim: true })
  public description?: string;

  @prop()
  public image?: {
    data: Buffer;
    contentType: string;
  };

  @prop({ default: Date.now })
  public created?: Date;

  @prop({ default: Date.now })
  public bidStart?: Date;

  @prop({ required: true })
  public bidEnd!: Date;

  @prop({ ref: UserModel }) // Reference to the User model
  public seller!: Ref<typeof UserModel>;

  @prop({ default: 0 })
  public startingBid?: number;

  @prop({ enum: ['draft', 'published', 'active', 'completed', 'failed'], default: 'draft' }) // Define possible statuses and default to 'draft'
  status?: string;

  @prop({ type: () => [Bid] }) // Store bid records as an array of Bid objects
  bids?: Bid[];
  
//   @prop({ _id: false }) // To indicate that this field doesn't have its own ObjectId
//   public bids?: {
//     bidder: Ref<typeof UserModel>;
//     bid: number;
//     time: Date;
//   }[];
}

export const AuctionModel = getModelForClass(Auction);
