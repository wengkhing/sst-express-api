import { create } from '@sst-api/core/activity';

export const handler = async (event: any) => {
  console.log('reading dn stream: activity created ===>', event.Records[0].dynamodb.NewImage);
  await create(event.Records[0].dynamodb.NewImage);
  return {};
}
