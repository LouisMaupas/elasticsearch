import * as ElasticAppSearch from "@elastic/app-search-javascript";
import { NextResponse } from "next/server";

export async function GET(request) {
  const client = ElasticAppSearch.createClient({
    engineName: "5aea6d431cbe",
    endpointBase: "http://localhost:9200/",
  });
  // client
  //   .search("lion", options) // TODO
  //   .then((resultList) => {
  //     resultList.results.forEach((result) => {
  //       console.log(
  //         `id: ${result.getRaw("id")} raw: ${result.getRaw("title")}`
  //       );
  //     });
  //   })
  //   .catch((error) => {
  //     console.log(`error: ${error}`);
  //   });
  return NextResponse.json({ message: "GET" });
}

export async function POST(request) {
  const client = ElasticAppSearch.createClient({
    // searchKey: process.env.SEARCHKEY,
    endpointBase: "http://localhost:9200/",
    // engineName: process.env.ENGINENAME,
  });

  const options = {
    search_fields: { title: {} },
    result_fields: { id: { raw: {} }, title: { raw: {} } },
  };

  client
    .search("lion", options) // TODO
    .then((resultList) => {
      resultList.results.forEach((result) => {
        console.log(
          `id: ${result.getRaw("id")} raw: ${result.getRaw("title")}`
        );
      });
    })
    .catch((error) => {
      console.log(`error: ${error}`);
    });
}
