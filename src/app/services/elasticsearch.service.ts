import { Client } from "elasticsearch";
import {Injectable} from "@angular/core";

@Injectable()
export class ElasticSearchService {

  private _client: Client;
  private elasticSearchBaseUrl: string = 'https://86.50.169.29/es';

  // private indexName: string = 'concepts';
  // private typeName: string = 'concept';

  constructor() {
    if (!this._client) {
      this._connect();
    }
  }

  private _connect() {
    this._client = new Client({
      host: this.elasticSearchBaseUrl,
      log: 'trace'
    });
  }

  frontPageSearch(indexName: string, typeName: string, queryObj: Object, resultAmt: number): any {
    if (indexName && typeName && queryObj) {
      return this._client.search({
        index: indexName,
        type: typeName,
        body: {
          query: queryObj,
          sort: [ "_score" ],
          from : 0,
          size : resultAmt,
          _source: [
            "id",
            "type.graph.id",
          //   "properties.prefLabel.lang",
          //   "properties.prefLabel.value",
          //   "references.prefLabelXl.properties.prefLabel.lang",
          //   "references.prefLabelXl.properties.prefLabel.value"
          ]
        }
      });
    } else {
      return Promise.resolve({});
    }
  }
}