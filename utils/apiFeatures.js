class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    // Loc cac tham so dac biet
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // Truy van > < >= <=
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    // Thuc hien truy van
    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  filterFacets() {
    const queryObj = { ...this.queryString };
    // Loc cac tham so dac biet
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // Truy van > < >= <=
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    queryStr = JSON.parse(queryStr);
    if (!Array.isArray(queryStr.p)) {
      if (queryStr.p) {
        queryStr.filters = new RegExp(`${queryStr.p}`);
        delete queryStr.p;
      }

      this.query = this.query.find(queryStr);
      return this;
    }

    const temp = queryStr.p.sort();
    let qr = {};

    qr = [[temp[0]]];
    let count = 0;
    for (let i = 1; i < temp.length; i++) {
      if (temp[i].slice(0, 3) !== temp[i - 1].slice(0, 3)) {
        qr.push([]);
        count++;
      }
      qr[count].push(temp[i]);
    }

    qr = qr.map((o) => {
      return {
        $or: o.map((id) => {
          return {
            'facets._id': id,
          };
        }),
      };
    });

    qr = {
      $and: qr,
    };

    // Thuc hien truy van
    this.query = this.query.find(qr);

    return this;
  }

  // sort = a,b,c => Sort theo a b va c
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.replace(/,/g, ' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  // Loc ra 1 so truong nhat dinh
  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.replace(/,/g, ' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  // Phan trang page = number. VD page =  1
  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}
module.exports = APIFeatures;
