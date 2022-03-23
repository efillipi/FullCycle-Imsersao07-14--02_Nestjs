import { PartialType } from "@nestjs/mapped-types";
import { TweetUser } from "../schemas/tweet.schema";

export class CreateTweetDto extends PartialType(TweetUser) {
}
