import type mongoose from "mongoose";

type QueryObject = Record<string, unknown>;

class ApiFeatures<T extends mongoose.Document> {
  queryString: QueryObject;
  mongooseQuery: mongoose.Query<T[], T>;
  pagginationResult?: {
    currentPage: number;
    limit: number;
    numberOfPages: number;
  };

  constructor(mongooseQuery: mongoose.Query<T[], T>, queryString: QueryObject) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
  }

  filter(): this {
    const queryObj: QueryObject = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit", "fields", "search"];
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    excludedFields.forEach((field: string) => delete queryObj[field]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    void this.mongooseQuery.find(JSON.parse(queryStr) as QueryObject);
    return this;
  }

  search(): this {
    if (this.queryString.search) {
      const query = {
        $or: [
          { name: { $regex: this.queryString.search, $options: "i" } },
          { description: { $regex: this.queryString.search, $options: "i" } },
        ],
      };
      void this.mongooseQuery.find(query);
    }
    return this;
  }

  // fields
  fields(): this {
    if (this.queryString.fields) {
      const fields = (this.queryString.fields as string).split(",").join(" ");
      void this.mongooseQuery.select(fields);
    } else {
      void this.mongooseQuery.select("-__v");
    }
    return this;
  }

  paggination(countDocument: number): this {
    const page = (this.queryString.page as number) || 1;
    const limit = (this.queryString.limit as number) || 10;
    const skip = (page - 1) * limit;
    const paggination = {
      currentPage: page,
      limit,
      numberOfPages: Math.ceil(countDocument / limit),
    };

    this.pagginationResult = paggination;
    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);

    return this;
  }

  sort(): this {
    if (this.queryString.sort) {
      const sortBy = (this.queryString.sort as string).split(",").join(" ");
      void this.mongooseQuery.sort(sortBy);
    } else {
      void this.mongooseQuery.sort("-createdAt");
    }
    return this;
  }
}

export default ApiFeatures;
