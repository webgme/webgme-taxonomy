/*
 * Save PDP tokens to be used by the dashboard when fetching data, etc.
 */
import { MongoClient } from "mongodb";

class Tokens {
  private _mongoClient: MongoClient;
  private _collection: any;

  constructor(mongoClient: MongoClient, name = "") {
    this._mongoClient = mongoClient;
    const db = this._mongoClient.db();

    if (name) {
      name = "_" + name;
    }
    this._collection = db.collection(`taxonomy_dashboard_tokens${name}`);
  }

  async update(projectId: string, token: string) {
    const query = { projectId };
    const update = {
      $set: { token },
    };
    const options = { upsert: true };
    await this._collection.updateOne(query, update, options);
  }
  async get(projectId: string) {
    const query = { projectId };
    const doc = await this._collection.findOne(query);
    if (doc) {
      return doc.token;
    }
  }

  /**
   * Helper method for testing
   */
  async destroy() {
    await this._collection.drop();
  }
}

export default async function withTokens<T>(
  gmeConfig: GmeConfig.GmeConfig,
  task: (t: Tokens) => Promise<T>,
  name = "",
): Promise<T> {
  const mongoUri = gmeConfig.mongo.uri;
  const mongoClient = new MongoClient(mongoUri);

  const tokens = new Tokens(mongoClient, name);
  const result: T = await task(tokens);

  mongoClient.close();

  return result;
}
